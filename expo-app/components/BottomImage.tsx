import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

export default function BottomImage() {
  return (
    <View style={styles.bottomContainer}>
      <Image 
              source={require('../assets/images/bottom1.png')} 
        style={styles.bottomImage}
        resizeMode="stretch"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 100, // Adjust this height as needed
  },
  bottomImage: {
    width: '100%',
    height: '100%',
  },
});
