import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import OneButton from '../components/OneButton';

export default function AdminHotels() {
  const hotels = []; // Will be populated with hotel data

  return (
    <View style={styles.container}>
      <FlatList
        data={hotels}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.hotelCard}>
            <View style={styles.hotelInfo}>
              <Text style={styles.hotelName}>{item.name}</Text>
              <Text style={styles.hotelLocation}>{item.location}</Text>
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
        title="Add New Hotel"
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
  hotelCard: {
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
  hotelInfo: {
    flex: 1,
  },
  hotelName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#09090B',
    marginBottom: 4,
  },
  hotelLocation: {
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