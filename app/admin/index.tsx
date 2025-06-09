import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const ADMIN_SECTIONS = [
  {
    id: 'flights',
    title: 'Flights',
    icon: 'airplane',
    description: 'Manage flights and schedules',
  },
  {
    id: 'hotels',
    title: 'Hotels',
    icon: 'business',
    description: 'Manage hotels and rooms',
  },
  {
    id: 'umrah',
    title: 'Umrah Packages',
    icon: 'map',
    description: 'Manage Umrah packages',
  },
  {
    id: 'bookings',
    title: 'Bookings',
    icon: 'calendar',
    description: 'View and manage bookings',
  },
  {
    id: 'users',
    title: 'Users',
    icon: 'people',
    description: 'Manage user accounts',
  },
];

export default function AdminDashboard() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
      </View>

      <View style={styles.grid}>
        {ADMIN_SECTIONS.map((section) => (
          <Link key={section.id} href={`/admin/${section.id}`} asChild>
            <TouchableOpacity style={styles.card}>
              <Ionicons name={section.icon as any} size={24} color="#FF5D0A" />
              <Text style={styles.cardTitle}>{section.title}</Text>
              <Text style={styles.cardSubtitle}>{section.description}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#09090B',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  card: {
    width: '47%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E4E4E7',
    alignItems: 'flex-start',
    gap: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#09090B',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#71717A',
  },
});