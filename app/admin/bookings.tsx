import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AdminBookings() {
  const bookings = []; // Will be populated with booking data

  return (
    <View style={styles.container}>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookingCard}>
            <View style={styles.bookingInfo}>
              <Text style={styles.bookingId}>Booking #{item.id}</Text>
              <Text style={styles.customerName}>{item.customerName}</Text>
              <Text style={styles.bookingDetails}>
                {item.packageName} - {item.date}
              </Text>
              <View style={[styles.statusBadge, 
                { backgroundColor: item.status === 'Confirmed' ? '#DCFCE7' : '#FEF3C7' }]}>
                <Text style={[styles.statusText, 
                  { color: item.status === 'Confirmed' ? '#166534' : '#92400E' }]}>
                  {item.status}
                </Text>
              </View>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="create-outline" size={20} color="#FF5D0A" />
              </TouchableOpacity>
            </View>
          </View>
        )}
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
  bookingCard: {
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
  bookingInfo: {
    flex: 1,
  },
  bookingId: {
    fontSize: 14,
    color: '#71717A',
    marginBottom: 4,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#09090B',
    marginBottom: 4,
  },
  bookingDetails: {
    fontSize: 14,
    color: '#71717A',
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
});