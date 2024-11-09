import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

interface Props {
  onTakePhoto: () => void;
  isCameraReady?: boolean;
}

export default function BottomCameraButton({ onTakePhoto, isCameraReady = true }: Props) {
  const navigation = useNavigation();
  const route = useRoute();

  const handlePress = () => {
    // If we're not on the main camera screen (index), navigate to it
    if (route.name !== 'index') {
      navigation.navigate('index' as never);
    } else {
      // Otherwise, take a photo
      onTakePhoto();
    }
  };

  return (
    <View style={styles.bottomContainer}>
      <Image 
        source={require('../assets/images/bottom1.png')} 
        style={styles.bottomImage}
        resizeMode="stretch"
      />
      <TouchableOpacity 
        style={styles.cameraButton}
        onPress={handlePress}
        disabled={route.name === 'index' && !isCameraReady}
      >
        <Image 
          source={require('../assets/images/camera.png')} 
          style={styles.cameraIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 100,
    alignItems: 'center',
  },
  bottomImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  cameraIcon: {
    width: 60,
    height: 60,
  },
});
