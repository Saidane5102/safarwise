import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useBooking } from '../components/BookingContext';
import OneButton from '../components/OneButton';

export default function FlightExtras(props: any) {
  const router = useRouter();
  const { selectedFlight, setSelectedFlight } = useBooking();
  // Interactive state for extras
  const [cabinBag, setCabinBag] = useState(false);
  const [checkedBag, setCheckedBag] = useState(false);
  const [ticketType, setTicketType] = useState('standard');

  useEffect(() => {
    // When user confirms, go back to BookingFlights to show updated card
    if (selectedFlight && selectedFlight.status === 'confirmed') {
      router.replace('/screens/BookingFlights');
    }
  }, [selectedFlight]);

  return (
    <View style={styles.container}>
      {/* Top bar with only title */}
      <View style={styles.topBarContainer}>
        <Text style={styles.pageTitle}>Extras</Text>
      </View>
      {/* Step Progress Bar */}
      <View style={styles.progressBarWrap}>
        <View style={styles.progressBarRow}>
          <View style={styles.progressDotInactive} />
          <View style={styles.progressLine} />
          <View style={styles.progressDotActive} />
        </View>
        <View style={styles.progressLabelsRow}>
          <Text style={styles.progressLabelInactive}>Flight infos</Text>
          <Text style={styles.progressLabelActive}>Extra</Text>
        </View>
      </View>
      {/* Baggage options */}
      <Text style={styles.sectionTitleBlack}>Baggage</Text>
      <View style={styles.extraRowUnselectable}>
        <Ionicons name="bag-outline" size={20} color="#FF5D0A" />
        <View style={styles.extraCol}>
          <Text style={styles.extraLabel}>Personal item</Text>
          <Text style={styles.extraDesc}>1 included (fits under seat)</Text>
        </View>
        <Text style={styles.extraPrice}>Free</Text>
      </View>
      <TouchableOpacity style={[styles.extraRow, !cabinBag ? styles.unselected : styles.selected]} onPress={() => setCabinBag(!cabinBag)}>
        <Ionicons name="briefcase-outline" size={20} color="#FF5D0A" />
        <View style={styles.extraCol}>
          <Text style={styles.extraLabel}>Cabin bag</Text>
          <Text style={styles.extraDesc}>Add 1 (max 8kg, 55x40x23cm)</Text>
        </View>
        <Text style={styles.extraPrice}>+ $35</Text>
        {cabinBag && <Ionicons name="checkmark-circle" size={20} color="#FF5D0A" style={{ marginLeft: 8 }} />}
      </TouchableOpacity>
      <TouchableOpacity style={[styles.extraRow, !checkedBag ? styles.unselected : styles.selected]} onPress={() => setCheckedBag(!checkedBag)}>
        <Ionicons name="cube-outline" size={20} color="#FF5D0A" />
        <View style={styles.extraCol}>
          <Text style={styles.extraLabel}>Checked bag</Text>
          <Text style={styles.extraDesc}>Add 1 (max 23kg, 158cm total)</Text>
        </View>
        <Text style={styles.extraPrice}>+ $60</Text>
        {checkedBag && <Ionicons name="checkmark-circle" size={20} color="#FF5D0A" style={{ marginLeft: 8 }} />}
      </TouchableOpacity>
      {/* Ticket type */}
      <Text style={styles.sectionTitleBlack}>Ticket type</Text>
      <View style={styles.ticketTypeRow}>
        <TouchableOpacity style={[styles.ticketTypeCol, ticketType !== 'standard' ? styles.unselected : styles.selected]} onPress={() => setTicketType('standard')}>
          <Text style={styles.ticketTypeLabel}>Standard</Text>
          <Text style={styles.ticketTypePrice}>$700</Text>
          <Text style={styles.ticketTypeDesc}>Cheapest price and no flexibility - you're sure of your plans</Text>
          {ticketType === 'standard' && <Ionicons name="checkmark-circle" size={20} color="#FF5D0A" style={{ marginTop: 6 }} />}
        </TouchableOpacity>
        <TouchableOpacity style={[styles.ticketTypeCol, ticketType !== 'flexible' ? styles.unselected : styles.selected]} onPress={() => setTicketType('flexible')}>
          <Text style={styles.ticketTypeLabel}>Flexible</Text>
          <Text style={styles.ticketTypePrice}>$850</Text>
          <Text style={styles.ticketTypeDesc}>Change your flight time or date once, up to 24 hours before departure. No change fees – pay only the fare difference, if any.</Text>
          {ticketType === 'flexible' && <Ionicons name="checkmark-circle" size={20} color="#FF5D0A" style={{ marginTop: 6 }} />}
        </TouchableOpacity>
      </View>
      {/* Confirm button */}
      <OneButton
        title="Confirm"
        onPress={() => {
          if (selectedFlight) {
            setSelectedFlight({ ...selectedFlight, status: 'confirmed', extras: 'Baggage, Flexible ticket' });
          }
        }}
        // Always enabled if a flight is selected
        disabled={!selectedFlight}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 48,
    alignItems: 'center',
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
  backIconButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
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
  progressBarWrap: {
    width: '100%',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  progressBarRow: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  progressDotActive: {
    width: 10,
    height: 10,
    backgroundColor: '#FF5D0A',
    borderRadius: 9999,
  },
  progressLine: {
    flex: 1,
    height: 4,
    backgroundColor: '#FF5D0A',
    borderRadius: 2,
    marginHorizontal: 4,
  },
  progressDotInactive: {
    width: 10,
    height: 10,
    backgroundColor: '#A3A3A3',
    borderRadius: 9999,
  },
  progressLabelsRow: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  progressLabelActive: {
    color: '#FF5D0A',
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  progressLabelInactive: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.10,
  },
  sectionTitleBlack: {
    color: '#09090B',
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '700',
    marginTop: 18,
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: '4%',
  },
  extraRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    width: '92%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#D4D4D4',
  },
  extraRowUnselectable: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    width: '92%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#D4D4D4',
  },
  unselected: {
    backgroundColor: '#fff',
    borderColor: '#D4D4D4',
    borderWidth: 1,
  },
  selected: {
    borderWidth: 2,
    borderColor: '#FF5D0A',
    backgroundColor: '#FFE3C7',
  },
  extraCol: {
    flex: 1,
    marginLeft: 10,
  },
  extraLabel: {
    color: '#222',
    fontSize: 15,
    fontFamily: 'Inter',
    fontWeight: '600',
  },
  extraDesc: {
    color: '#A3A3A3',
    fontSize: 13,
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  extraPrice: {
    color: '#FF5D0A',
    fontSize: 15,
    fontFamily: 'Inter',
    fontWeight: '700',
    marginLeft: 8,
  },
  ticketTypeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    width: '92%',
    alignSelf: 'center',
    marginTop: 8,
  },
  ticketTypeCol: {
    flex: 1,
    backgroundColor: '#FFF5EC',
    borderRadius: 8,
    padding: 12,
    marginRight: 6,
  },
  ticketTypeLabel: {
    color: '#222',
    fontSize: 15,
    fontFamily: 'Inter',
    fontWeight: '700',
    marginBottom: 2,
  },
  ticketTypePrice: {
    color: '#FF5D0A',
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '700',
    marginBottom: 2,
  },
  ticketTypeDesc: {
    color: '#A3A3A3',
    fontSize: 13,
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  confirmBtn: {
    marginTop: 24,
    backgroundColor: '#FF5D0A',
    borderRadius: 9999,
    paddingVertical: 14,
    width: '92%',
    alignSelf: 'center',
  },
  confirmBtnText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '700',
  },
  continueBtn: {
    marginTop: 16,
    backgroundColor: '#FF5D0A',
    borderRadius: 9999,
    paddingVertical: 14,
    width: '92%',
    alignSelf: 'center',
  },
  continueBtnText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '700',
  },
});
