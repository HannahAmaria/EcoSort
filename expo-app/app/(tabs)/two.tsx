import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useRoute, RouteProp } from '@react-navigation/native';

type RouteParams = {
  detectedLabels?: { name: string; metadata: { confidence: number } }[];
};

export default function TabTwoScreen() {
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const { detectedLabels = [] } = route.params || {};

  const renderLabel = ({ item }: { item: { name: string; metadata: { confidence: number } } }) => (
    <View style={styles.labelItem}>
      <Text style={styles.labelName}>{item.name}</Text>
      <Text style={styles.labelConfidence}>Confidence: {(item.metadata.confidence * 100).toFixed(2)}%</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detected Labels</Text>
      <FlatList
        data={detectedLabels}
        renderItem={renderLabel}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text>No labels detected</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  labelItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '100%',
  },
  labelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green'
  },
  labelConfidence: {
    fontSize: 14,
    color: '#666',
  },
});
