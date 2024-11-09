import React, { useLayoutEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Share } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RecyclingCategory } from '../../utils/recyclingMap';
import BottomCameraButton from '../../components/BottomCameraButton';

// Define types for route parameters
type RouteParams = {
  detectedLabels: Array<{
    name: string;
    boundingBoxes: {
      image: string;
      // ... other boundingBox properties
    };
    recyclingInfo: RecyclingCategory;
  }>;
};

/**
 * RecyclingResultsScreen - Displays the results of recycling analysis
 * Shows detected items and their recycling information in a scrollable list
 */
export default function RecyclingResultsScreen() {
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const { detectedLabels } = route.params;
  const navigation = useNavigation();

  // Sort labels by recycling category priority
  const sortedLabels = [...detectedLabels].sort((a, b) => {
    const categoryPriority = {
      'Recyclable': 0,     // Highest priority
      'Compost': 1,
      'Special Disposal': 2,
      'Unknown': 3         // Lowest priority
    };
    
    const categoryA = a.recyclingInfo?.category || 'Unknown';
    const categoryB = b.recyclingInfo?.category || 'Unknown';
    
    return (categoryPriority[categoryA] ?? 3) - (categoryPriority[categoryB] ?? 3);
  });

  // Hide tab bar and header
  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: 'none' },
      headerShown: false,
    });
  }, [navigation]);

  // Navigation handlers
  const handleBack = () => navigation.navigate('index');

  const handleShareResults = async (item: typeof detectedLabels[0]) => {
    if (!item.recyclingInfo) return;

    try {
      const message = `
Item: ${item.name}
Category: ${item.recyclingInfo.category}
Instructions: ${item.recyclingInfo.instructions}
${item.recyclingInfo.additionalInfo ? `\nAdditional Info: ${item.recyclingInfo.additionalInfo}` : ''}
${item.recyclingInfo.preparation ? `\nPreparation Steps:\n${item.recyclingInfo.preparation.join('\n')}` : ''}
`;

      await Share.share({
        message,
        title: `Recycling Info for ${item.name}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Recycling Results</Text>
          <View style={styles.backButton} />
        </View>

        {sortedLabels.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="scan-outline" size={48} color="#49a010" />
            <Text style={styles.emptyStateTitle}>No Items Detected</Text>
            <Text style={styles.emptyStateText}>
              Try taking another photo or adjusting the camera angle
            </Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {sortedLabels.map((label, index) => (
              <View key={index} style={styles.itemContainer}>
                {/* Add image thumbnail if available */}
                {label.boundingBoxes?.image && (
                  <Image 
                    source={{ uri: label.boundingBoxes.image }} 
                    style={styles.thumbnailImage}
                    resizeMode="cover"
                    onLoadStart={() => console.log('Image loading started:', label.boundingBoxes.image)}
                    onLoad={() => console.log('Image loaded successfully')}
                    onError={(error) => console.log('Image loading error:', error.nativeEvent.error)}
                  />
                )}
                {/* Item header with name and category */}
                <View style={styles.headerContainer}>
                  <Text style={styles.itemName}>{label.name}</Text>
                  {label.recyclingInfo && (
                    <View style={[
                      styles.categoryBadge,
                      getCategoryColor(label.recyclingInfo.category)
                    ]}>
                      <Text style={styles.categoryText}>
                        {label.recyclingInfo.category}
                      </Text>
                    </View>
                  )}
                </View>

                {/* Basic instructions */}
                {label.recyclingInfo?.instructions && (
                  <View style={styles.infoSection}>
                    <Text style={styles.sectionTitle}>Instructions:</Text>
                    <Text style={styles.instructions}>
                      {label.recyclingInfo.instructions}
                    </Text>
                  </View>
                )}

                {/* Additional information (if available) */}
                {label.recyclingInfo?.additionalInfo && (
                  <View style={styles.infoSection}>
                    <Text style={styles.sectionTitle}>Additional Information:</Text>
                    <Text style={styles.instructions}>
                      {label.recyclingInfo.additionalInfo}
                    </Text>
                  </View>
                )}

                {/* Preparation steps (if available) */}
                {label.recyclingInfo?.preparation && (
                  <View style={styles.infoSection}>
                    <Text style={styles.sectionTitle}>Preparation Steps:</Text>
                    {label.recyclingInfo.preparation.map((step, stepIndex) => (
                      <Text key={stepIndex} style={styles.listItem}>
                        • {step}
                      </Text>
                    ))}
                  </View>
                )}

                {/* Common mistakes (if available) */}
                {label.recyclingInfo?.commonMistakes && (
                  <View style={styles.infoSection}>
                    <Text style={styles.sectionTitle}>Common Mistakes:</Text>
                    {label.recyclingInfo.commonMistakes.map((mistake, mistakeIndex) => (
                      <Text key={mistakeIndex} style={styles.listItem}>
                        • {mistake}
                      </Text>
                    ))}
                  </View>
                )}

                {/* Share button */}
                {label.recyclingInfo && (
                  <View style={styles.actionButtons}>
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => handleShareResults(label)}
                    >
                      <Ionicons name="share-outline" size={20} color="#49a010" />
                      <Text style={styles.actionButtonText}>Share</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        )}
      </View>
      <BottomCameraButton onTakePhoto={() => {}} />
    </View>
  );
}

/**
 * Helper function to get the style for each recycling category
 */
function getCategoryColor(category: RecyclingCategory['category']) {
  const categoryColors = {
    'Recyclable': styles.recyclableCategory,
    'Compost': styles.compostCategory,
    'Landfill': styles.landfillCategory,
    'Special Disposal': styles.specialCategory,
    'Unknown': styles.unknownCategory
  };
  return categoryColors[category] || styles.unknownCategory;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    marginBottom: 100, // Space for bottom camera button
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 60,
    backgroundColor: '#49a010',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 8,
  },
  categoryText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  infoSection: {
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#424242',
  },
  instructions: {
    fontSize: 15,
    color: '#616161',
    lineHeight: 22,
  },
  listItem: {
    fontSize: 15,
    color: '#616161',
    lineHeight: 22,
    marginLeft: 8,
    marginTop: 4,
  },
  recyclableCategory: {
    backgroundColor: '#4CAF50',
  },
  compostCategory: {
    backgroundColor: '#8BC34A',
  },
  landfillCategory: {
    backgroundColor: '#FF5722',
  },
  specialCategory: {
    backgroundColor: '#FFC107',
  },
  unknownCategory: {
    backgroundColor: '#9E9E9E',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  thumbnailImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#f0f0f0',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionButtonText: {
    marginLeft: 4,
    color: '#49a010',
    fontSize: 14,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
