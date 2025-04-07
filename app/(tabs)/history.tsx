import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

export default function HistoryScreen() {
  const { newEntry } = useLocalSearchParams<{ newEntry?: string }>();
  const [history, setHistory] = useState<string[]>([]);

  // Update history when new entry comes
  useState(() => {
    if (newEntry) {
      setHistory(prev => [newEntry, ...prev]);
    }
  }, [newEntry]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversion History</Text>
      
      {history.length === 0 ? (
        <Text style={styles.emptyText}>No conversions saved yet</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <Text style={styles.historyText}>{item}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white'
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#AAA',
    fontSize: 16
  },
  historyItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333'
  },
  historyText: {
    fontSize: 16,
    color: 'white'
  }
});