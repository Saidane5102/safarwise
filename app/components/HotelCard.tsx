import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface HotelCardProps {
  hotel: {
    id: string;
    name: string;
    location: string;
    price: string;
    rating: string;
    image: string;
    badge?: string;
    premium?: boolean;
  };
  selected?: boolean;
  onSeeDetails: () => void;
}

export default function HotelCard({ hotel, selected, onSeeDetails }: HotelCardProps) {
  return (
    <View style={[styles.card, selected && styles.selectedCard]}>
      <Image source={{ uri: hotel.image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{hotel.name}</Text>
          {hotel.badge && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{hotel.badge}</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.location}>{hotel.location}</Text>
        
        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{hotel.price}</Text>
            <Text style={styles.perNight}>per night</Text>
          </View>
          
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FDB022" />
            <Text style={styles.rating}>{hotel.rating}</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.button} 
          onPress={onSeeDetails}
          accessibilityLabel={`See details for ${hotel.name}`}
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>See the hotel</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#0891B2',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#09090B',
    flex: 1,
  },
  badgeContainer: {
    backgroundColor: '#ECFEFF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  badgeText: {
    color: '#0891B2',
    fontSize: 12,
    fontWeight: '500',
  },
  location: {
    color: '#71717A',
    fontSize: 14,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    color: '#09090B',
  },
  perNight: {
    fontSize: 14,
    color: '#71717A',
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '500',
    color: '#09090B',
  },
  button: {
    backgroundColor: '#0891B2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});