import React, { useState, useRef, useLayoutEffect } from 'react';
import 'react-native-get-random-values';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import { Amplify, Predictions } from 'aws-amplify';
import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getRecyclingInfo } from '../../utils/recyclingMap';
import BottomCameraButton from '../../components/BottomCameraButton';
import { Ionicons } from '@expo/vector-icons';
import awsmobile from '../../aws-exports';
import { ReadableStream } from 'web-streams-polyfill';

// Configure ReadableStream polyfill
(global as any).ReadableStream = ReadableStream;

// AWS Amplify Configuration
Amplify.configure({
  ...awsmobile,
  Storage: {
    AWSS3: {
      bucket: 'recyapps3bucketf5878-dev',
      region: 'us-east-1',
    }
  },
  Auth: {
    storage: AsyncStorage,
  },
  Predictions: {
    region: 'us-east-1',
  },
});

// Initialize AWS Predictions
Predictions.addPluggable(new AmazonAIPredictionsProvider());

// Types
type DetectedLabel = {
  name: string;
  boundingBoxes: any;
  metadata?: Object;
};

/**
 * Stores detected labels with recycling information in AsyncStorage
 */
const storeLabels = async (labels: DetectedLabel[]) => {
  try {
    const existingLabelsString = await AsyncStorage.getItem('detectedLabels');
    const existingLabels = existingLabelsString ? JSON.parse(existingLabelsString) : [];
    
    const labelsWithRecycling = labels.map(label => ({
      ...label,
      recyclingInfo: getRecyclingInfo(label.name)
    }));
    
    const labelEntry = {
      timestamp: new Date().toISOString(),
      labels: labelsWithRecycling
    };
    
    await AsyncStorage.setItem('detectedLabels', 
      JSON.stringify([...existingLabels, labelEntry])
    );
  } catch (error) {
    console.error('Error storing labels:', error);
  }
};

/**
 * Detects labels in an image using AWS Predictions
 */
const detectLabels = async (imageBytes: ArrayBuffer) => {
  try {
    const result = await Predictions.identify({
      labels: {
        source: { bytes: imageBytes },
        type: "LABELS"
      }
    });

    if (result?.labels) {
      result.labels.forEach(({ name, boundingBoxes }) => {
        console.log(`Label: ${name}, Bounding Boxes:`, boundingBoxes);
      });
    }

    return result;
  } catch (error) {
    console.error("Error detecting labels:", error);
    throw error;
  }
};

/**
 * Resizes image to optimize for AWS Predictions
 */
const resizeImage = async (uri: string): Promise<string> => {
  const result = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 200, height: 200 } }],
    { compress: 1, format: ImageManipulator.SaveFormat.PNG }
  );
  return result.uri;
};

/**
 * Main Camera Screen Component
 */
export default function CameraScreen() {
  // State
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  // Refs
  const cameraRef = useRef<CameraView | null>(null);
  const navigation = useNavigation();

  // Hide tab bar and header
  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: 'none' },
      headerShown: false,
    });
  }, [navigation]);

  // Permission handling
  if (!permission) return <View />;
  
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Camera permission required</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.text}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  /**
   * Camera control functions
   */
  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      if (photo) setImageUri(photo.uri);
    }
  };

  /**
   * Image analysis handler
   */
  const analyseImage = async () => {
    if (!imageUri) return;

    try {
      // Prepare image for analysis
      const resizedImageUri = await resizeImage(imageUri);
      const imageBase64 = await FileSystem.readAsStringAsync(resizedImageUri, { 
        encoding: 'base64' 
      });

      // Convert to ArrayBuffer
      const binaryString = atob(imageBase64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Detect and process labels
      const labels = await detectLabels(bytes.buffer);
      await storeLabels(labels.labels || []);

      // Navigate to results with the image URI
      navigation.navigate('analysis-complete', { 
        detectedLabels: labels.labels?.map(label => ({
          ...label,
          boundingBoxes: {
            ...label.boundingBoxes,
            image: imageUri
          },
          recyclingInfo: getRecyclingInfo(label.name)
        })) || []
      });

    } catch (error) {
      console.error("Error analyzing image:", error);
      alert(error instanceof Error && error.name === 'AccessDeniedException'
        ? "Access denied. Check AWS permissions."
        : "Analysis failed. Please try again.");
    }
  };

  /**
   * Render functions
   */
  const renderPreview = () => {
    if (imageUri) {
      return (
        <View style={styles.previewContainer}>
          <Text style={styles.headerText}>Scan</Text>
          <Image source={{ uri: imageUri }} style={styles.previewImage} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={() => setImageUri(null)}
            >
              <Text style={styles.buttonText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={analyseImage}
            >
              <Text style={styles.buttonText}>Analyze</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <CameraView
          style={styles.camera}
          facing={facing}
          ref={cameraRef}
          onCameraReady={() => setIsCameraReady(true)}
        >
          <TouchableOpacity 
            style={styles.flipButton}
            onPress={toggleCameraFacing}
          >
            <Ionicons name="camera-reverse" size={50} color="#4CAF50" />
          </TouchableOpacity>
        </CameraView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderPreview()}
      <BottomCameraButton 
        onTakePhoto={takePicture}
        isCameraReady={isCameraReady}
      />
    </View>
  );
}

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    marginBottom: 100, // Add bottom margin to prevent content from being hidden
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 25,
  },
  flipButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    // backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  flipIcon: {
    width: 84,
    height: 84,
    // tintColor: 'white',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#000',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  fullImage: {
    width: '90%',
    height: '80%',
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    // backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#49a010'
  },
  analyseButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    // backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#49a010'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    // backgroundColor: '#2196F3',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    height: 50,
    backgroundColor: '#49a010'
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginTop: 60,
    marginBottom: 20,
  },
  previewImage: {
    flex: 1,
    width: '100%',
    height: undefined,
    backgroundColor: '#f0f0f0',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    paddingHorizontal: 40,
    width: '100%',
  },
  actionButton: {
    backgroundColor: '#49a010', // Green color
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  previewContainer: {
    flex: 1,
    backgroundColor: '#49a010',
  },
  previewImage: {
    flex: 1,
    width: '100%',
    height: undefined,
    backgroundColor: '#f0f0f0',
    marginBottom: 20, // Add margin to create space for buttons
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 120, // Add margin to avoid overlap with bottom camera button
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  actionButton: {
    backgroundColor: '#49a010',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    marginBottom: 100, // Add space for the bottom bar
  },
});
