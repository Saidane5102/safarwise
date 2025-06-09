import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useBooking } from './BookingContext';

export default function FlightCard({
  badge = 'Best',
  segments = [
    {
      logo: require('../../assets/images/Saudi.png'),
      times: ['12:00', '20:30'],
      codes: ['LHR', '6h 15min', 'JED'],
    },
    {
      logo: require('../../assets/images/Saudi.png'),
      times: ['08:30', '12:40'],
      codes: ['JED', '6h 30min', 'LHR'],
    },
  ],
  airline = 'Saudi',
  price = '$700',
  onSelect,
  selected = false,
  extras = null,
  status = '',
}: {
  badge?: string;
  segments?: Array<{ logo: any; times: [string, string]; codes: [string, string, string]; }>;
  airline?: string;
  price?: string;
  onSelect?: () => void;
  selected?: boolean;
  extras?: any;
  status?: string;
}) {
  const router = useRouter();
  const { setSelectedFlight } = useBooking();

  // Show a different visual if selected (e.g., after coming back from extras)
  return (
    <View style={[styles.card, selected && status === 'confirmed' && { borderColor: '#FF5D0A', backgroundColor: '#FFF5EC' }]}> 
      {/* Header with badge */}
      <View style={styles.header}>
        {badge && (
          <View style={styles.bestBadge}>
            <Text style={styles.bestBadgeText}>{badge}</Text>
          </View>
        )}
      </View>
      {/* Segments */}
      <View style={styles.segments}>
        {segments.map((seg, idx) => (
          <View style={styles.segmentRow} key={idx}>
            <View style={styles.airlineLogoWrap}>
              <Image style={styles.airlineLogo} source={seg.logo} />
            </View>
            <View style={styles.segmentDetails}>
              <View style={styles.segmentTimesRow}>
                <Text style={styles.segmentTime}>{seg.times[0]}</Text>
                <View style={styles.timeLine} />
                <Text style={styles.segmentTime}>{seg.times[1]}</Text>
              </View>
              <View style={styles.segmentCodesRow}>
                <Text style={styles.segmentCode}>{seg.codes[0]}</Text>
                <Text style={styles.segmentDuration}>{seg.codes[1]}</Text>
                <Text style={styles.segmentCode}>{seg.codes[2]}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
      {/* Airline and Price in a single row */}
      <View style={styles.footerRow}>
        <Text style={styles.airlineName}>{airline}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>
      {/* Select or Selected Button with top border */}
      <View style={styles.selectBtnContainer}>
        {selected ? (
          <View style={{width: '100%', justifyContent: 'space-between', alignItems: 'center', display: 'flex', flexDirection: 'row', gap: 12, paddingTop: 12, paddingBottom: 12}}>
            {/* Left circle badge as cancel (cross) button */}
            <TouchableOpacity
              onPress={() => setSelectedFlight(null)}
              style={{padding: 8, backgroundColor: '#FFE9D3', borderRadius: 9999, borderWidth: 1, borderColor: '#FFE9D3', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
              <Ionicons name="close" size={20} color="#FF5D0A" />
            </TouchableOpacity>
            {/* Right pill button with check icon */}
            <View style={{paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, backgroundColor: '#FF5D0A', borderRadius: 9999, borderWidth: 1, borderColor: '#FF5D0A', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 6, display: 'flex'}}>
              <Ionicons name="checkmark" size={18} color="#FFF5EC" style={{marginRight: 4}} />
              <Text style={{color: '#FFF5EC', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', lineHeight: 20}}>Selected</Text>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.selectBtn}
            onPress={() => {
              setSelectedFlight({ id: 'flight1', status: '', extras: null });
              if (onSelect) onSelect();
            }}
          >
            <Text style={styles.selectBtnText}>Select</Text>
            <Ionicons name="chevron-forward" size={16} color="#09090B" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    paddingTop: 12,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D4D4D4',
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12, // reduced from 16
    marginBottom: 8, // reduced from 24
  },
  header: {
    alignSelf: 'stretch',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D4D4D4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  bestBadge: {
    height: 24,
    paddingHorizontal: 8,
    backgroundColor: '#FF5D0A',
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bestBadgeText: {
    color: '#FFF5EC',
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '500',
    lineHeight: 20,
  },
  segments: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 16,
    marginTop: 16,
  },
  segmentRow: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 6,
  },
  airlineLogoWrap: {
    padding: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
    borderWidth: 1,   // changed from 2 to 1
    borderColor: '#D4D4D4', 
  },
  airlineLogo: {
    width: 50, // increased from 30 to 50
    height: 50, // increased from 30 to 50
    borderRadius: 12, // slightly more rounded for larger image
    backgroundColor: '#eee',
  },
  segmentDetails: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  segmentTimesRow: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 4,
  },
  timeLine: {
    height: 1.5,
    backgroundColor: '#D4D4D4',
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 1,
  },
  segmentCodesRow: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  segmentCode: {
    color: '#09090B',
    fontSize: 14,
    fontFamily: 'IBM Plex Sans Arabic',
    fontWeight: '500',
    letterSpacing: 0.7,
  },
  segmentDuration: {
    color: '#09090B',
    fontSize: 11,
    fontFamily: 'IBM Plex Sans Arabic',
    fontWeight: '400',
    letterSpacing: 0.55,
    marginHorizontal: 8,
  },
  segmentTime: {
    color: '#09090B',
    fontSize: 14,
    fontFamily: 'IBM Plex Sans Arabic',
    fontWeight: '500',
    letterSpacing: 0.7,
    marginRight: 8,
  },
  footerRow: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 0,
    gap: 8,
    paddingHorizontal: 2,
  },
  selectBtnContainer: {
    width: '100%',
    paddingTop: 12, // set to 12 as requested
    paddingBottom: 12, // set to 12 as requested
    borderTopWidth: 1,
    borderTopColor: '#D4D4D4',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
    opacity: 0.99,
  },
  selectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 6,
    paddingBottom: 6,
    backgroundColor: '#fff',
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#D4D4D4',
    marginTop: 0,
    marginBottom: 0,
    gap: 6,
  },
  airlineName: {
    color: '#222',
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '500',
    lineHeight: 20,
  },
  price: {
    color: '#222',
    fontSize: 20,
    fontFamily: 'SF Pro',
    fontWeight: '700',
  },
  selectBtnText: {
    color: '#09090B',
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '500',
    lineHeight: 20,
    marginRight: 4,
  },
  topBarContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#fff',
    gap: 4,
    justifyContent: 'center', // Center children horizontally
  },
  pageTitle: {
    flex: 0,
    color: '#09090B',
    fontSize: 24,
    fontFamily: 'Inter',
    fontWeight: '700',
    lineHeight: 32,
    textAlign: 'center',
    alignSelf: 'center',
  },
});
