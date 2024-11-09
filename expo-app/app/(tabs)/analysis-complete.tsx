import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import BottomCameraButton from '../../components/BottomCameraButton';

// Define types for route parameters
type RouteParams = {
  detectedLabels: Array<{
    name: string;
    boundingBoxes: {
      image: string;
      // ... other properties
    };
    recyclingInfo: {
      category: string;
      instructions: string;
    };
  }>;
};

/**
 * AnalysisCompleteScreen - Intermediate screen shown after image analysis
 * Displays a success message and allows navigation to detailed results
 */
export default function AnalysisCompleteScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>(); // TODO: Add proper type definition
  const { detectedLabels } = route.params as RouteParams;

  // Hide tab bar and header on mount
  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: 'none' },
      headerShown: false,
    });
  }, [navigation]);

  /**
   * Navigate to results screen with detected labels
   */
  const handleViewResults = () => {
    navigation.navigate('two', { 
      detectedLabels,
      hideTabBar: true
    });
  };

  return (
    <View style={styles.container}>
      {/* Main content container */}
      <View style={styles.content}>
        {/* Success checkmark icon */}
        <View style={styles.iconContainer}>
          <Ionicons 
            name="checkmark" 
            size={60} 
            color="white" 
            accessibilityLabel="Success checkmark"
          />
        </View>

        {/* Success message */}
        <Text style={styles.text}>
          Analysis complete!
        </Text>

        {/* View results button */}
        <TouchableOpacity 
          style={styles.button}
          onPress={handleViewResults}
          accessibilityLabel="View results button"
          accessibilityHint="Navigate to see detailed recycling results"
        >
          <Text style={styles.buttonText}>
            View
          </Text>
        </TouchableOpacity>
      </View>

      {/* Camera button (disabled in this view) */}
      <BottomCameraButton onTakePhoto={() => {}} />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#49a010', // Primary green color
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#49a010', // Primary green color
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
}); 