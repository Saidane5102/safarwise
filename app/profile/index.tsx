import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Profile() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.userSection}>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john.doe@example.com</Text>
        </View>
      </View>

      <View style={styles.menuSection}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="person-outline" size={24} color="#09090B" />
          <Text style={styles.menuItemText}>Personal Information</Text>
          <Ionicons name="chevron-forward" size={24} color="#71717A" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="calendar-outline" size={24} color="#09090B" />
          <Text style={styles.menuItemText}>My Bookings</Text>
          <Ionicons name="chevron-forward" size={24} color="#71717A" />
        </TouchableOpacity>

        <Link href="/admin" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="settings-outline" size={24} color="#09090B" />
            <Text style={styles.menuItemText}>Admin Panel</Text>
            <Ionicons name="chevron-forward" size={24} color="#71717A" />
          </TouchableOpacity>
        </Link>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={24} color="#DC2626" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  userSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E7',
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#09090B',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#71717A',
  },
  menuSection: {
    paddingTop: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E7',
  },
  menuItemText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#09090B',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginTop: 24,
  },
  logoutText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#DC2626',
  },
});