import React, { useState, useRef, useCallback } from 'react';
import 'react-native-get-random-values';

import { View, Image, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

import { Amplify, Storage, Predictions } from 'aws-amplify';
import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';

import awsmobile from '../../aws-exports';

import AsyncStorage from '@react-native-async-storage/async-storage';

// Amplify.configure(awsmobile);

// Configure Amplify with AWS settings
Amplify.configure({
  ...awsmobile,
  Storage: {
    AWSS3: {
      bucket: 'recyapps3bucketf5878-dev',
      region: 'us-east-1',
    },
    // If needed, add other storage configurations here
  },
  Auth: {
    // Other Auth configurations
    storage: AsyncStorage,
  },
  Predictions: {
    region: 'us-east-1', // Make sure this matches your AWS region
  },
});

// Add polyfill for ReadableStream to ensure compatibility
import { ReadableStream } from 'web-streams-polyfill';
(global as any).ReadableStream = ReadableStream;

// Configure the Predictions provider
Predictions.addPluggable(new AmazonAIPredictionsProvider());

// Define your RootStackParamList
type RootStackParamList = {
  two: { detectedLabels: Array<{ name: string; boundingBoxes: any; metadata?: Object }> };
  // Add other screen names and their params here
};

/**
 * Function to detect labels in an image using AWS Predictions.
 * @param imageBytes The image data as an ArrayBuffer.
 * @returns The result of the label detection.
 */
const detectLabels = async (imageBytes: ArrayBuffer) => {
  try {
    const result = await Predictions.identify({
      labels: {
        source: {
          bytes: imageBytes
        },
        type: "LABELS"
      }
    });

    console.log("Detected labels:", result);

    if (result && result.labels) {
      result.labels.forEach((object: { name: string; boundingBoxes: any }) => {
        const { name, boundingBoxes } = object;
        // You can add further processing here if needed
        console.log(`Label: ${name}, Bounding Boxes:`, boundingBoxes);
      });
    } else {
      console.log("No labels detected");
    }

    return result;
  } catch (error) {
    console.error("Error detecting labels:", error);
    throw error;
  }
};

/**
 * Function to resize an image using Expo ImageManipulator.
 * @param uri The URI of the image to resize.
 * @returns The URI of the resized image.
 * This is necessary to reduce the size of the image before sending it to AWS Predictions otherwise it will fail.
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
 * Main component for the camera screen.
 */
export default function ACameraScreenpp() {
  // State variables
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [detectedLabels, setDetectedLabels] = useState<Array<{ name: string; boundingBoxes: any; metadata?: Object }>>([]);

  // Refs for camera and container
  const cameraContainerRef = useRef<View>(null);
  const cameraRef = useRef<CameraView | null>(null);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Check if camera permissions are loaded
  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  // Check if camera permissions are granted
  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.text}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  /**
 * Function to toggle the camera facing.
 */
  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  /**
 * Function to take a picture using the camera.
 */
  async function takePicture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      if (photo) {
        setImageUri(photo.uri);
      }
    }
  }

  /**
 * Function to analyze the captured image.
 */
  async function analyseImage() {
    if (imageUri) {
      console.log("Image URI:", imageUri);

      try {
        const resizedImageUri = await resizeImage(imageUri);

        // Read the resized image as a base64 string
        const imageBase64 = await FileSystem.readAsStringAsync(resizedImageUri, { encoding: 'base64' });

        // Log the length of the base64 string to understand its size
        console.log("Base64 Length:", imageBase64.length);

        // Convert the base64 string to an ArrayBuffer
        const binaryString = atob(imageBase64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const imageBytes = bytes.buffer;

        console.log("ArrayBuffer Length:", imageBytes.byteLength);

        const labels = await detectLabels(imageBytes);
        console.log("Analysis complete:", labels);

        // Show success message to the user
        alert("Image analysis complete!");
        
        // Navigate to the TabTwoScreen with the detected labels
        navigation.navigate('two', { detectedLabels: labels.labels || [] });

      } catch (error) {
        console.error("Error analyzing image:", error);
        
        // Show error message to the user
        if (error instanceof Error && error.name === 'AccessDeniedException') {
          alert("Access denied. Please check your AWS permissions.");
        } else {
          alert("An error occurred while analyzing the image. Please try again.");
        }
      }
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={styles.camera}
        facing={facing}
        ref={cameraRef}
        onCameraReady={() => setIsCameraReady(true)}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={takePicture} style={styles.button} disabled={!isCameraReady}>
          <Text style={styles.text}>Take Picture</Text>
        </TouchableOpacity>
      </View>
      {imageUri && (
        <>
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />
          </TouchableOpacity>
          <Modal
            visible={isModalVisible}
            transparent={true}
            onRequestClose={() => setIsModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <Image source={{ uri: imageUri }} style={styles.fullImage} />
              <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.text}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={analyseImage} style={styles.analyseButton}>
                <Text style={styles.text}>Analyse</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    height: 600, // Set the desired height in pixels
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    // margin: 64,
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
    backgroundColor: 'green'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
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
    backgroundColor: 'green'
  },
  analyseButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    // backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'green'
  },
});
