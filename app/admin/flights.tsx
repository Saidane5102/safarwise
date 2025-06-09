import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import OneButton from '../components/OneButton';

export default function AdminFlights() {
  const flights = []; // We'll add flight data later

  return (
    <View style={styles.container}>
      <FlatList
        data={flights}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.flightCard}>
            <View style={styles.flightInfo}>
              <Text style={styles.flightTitle}>{item.airline}</Text>
              <Text style={styles.flightDetails}>
                {item.departure} → {item.arrival}
              </Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="create-outline" size={20} color="#FF5D0A" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="trash-outline" size={20} color="#DC2626" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <OneButton 
        title="Add New Flight"
        onPress={() => {}}
        style={styles.addButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  flightCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E4E4E7',
    marginBottom: 12,
  },
  flightInfo: {
    flex: 1,
  },
  flightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#09090B',
    marginBottom: 4,
  },
  flightDetails: {
    fontSize: 14,
    color: '#71717A',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  addButton: {
    position: 'absolute',
    bottom: 32,
    left: 20,
    right: 20,
  },
});