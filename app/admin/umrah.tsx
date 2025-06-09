import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import OneButton from '../components/OneButton';

export default function AdminUmrah() {
  const packages = []; // Will be populated with Umrah package data

  return (
    <View style={styles.container}>
      <FlatList
        data={packages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.packageCard}>
            <View style={styles.packageInfo}>
              <Text style={styles.packageName}>{item.name}</Text>
              <Text style={styles.packageDuration}>{item.duration} Days</Text>
              <Text style={styles.packagePrice}>{item.price}</Text>
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
        title="Add New Package"
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
  packageCard: {
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
  packageInfo: {
    flex: 1,
  },
  packageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#09090B',
    marginBottom: 4,
  },
  packageDuration: {
    fontSize: 14,
    color: '#71717A',
    marginBottom: 2,
  },
  packagePrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FF5D0A',
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