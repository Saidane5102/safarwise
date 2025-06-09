import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const steps = [
  { key: 'flights', label: 'Flights', icon: <Ionicons name="airplane" size={16} color="#fff" /> },
  { key: 'hotel', label: 'Hotel', icon: <MaterialIcons name="hotel" size={16} color="#FF5D0A" /> },
  { key: 'extra', label: 'Extra', icon: <MaterialCommunityIcons name="diamond-stone" size={16} color="#FF5D0A" /> },
];

export default function BookingStepProgress({ activeStep }: { activeStep: number }) {
  return (
    <View style={styles.progressBarContainer}>
      {steps.map((step, idx) => (
        <React.Fragment key={step.key}>
          <View style={styles.stepContainer}>
            <View style={[styles.iconCircle, idx === activeStep ? styles.activeCircle : styles.inactiveCircle]}>
              {React.cloneElement(step.icon, { color: idx === activeStep ? '#fff' : '#FF5D0A' })}
            </View>
            <Text style={[styles.stepLabel, idx === activeStep ? styles.activeLabel : styles.inactiveLabel]}>{step.label}</Text>
          </View>
          {idx < steps.length - 1 && <View style={styles.connector} />}
        </React.Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 8,
    marginBottom: 16,
    position: 'relative',
  },
  stepContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 60,
  },
  iconCircle: {
    padding: 4,
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  activeCircle: {
    backgroundColor: '#FF5D0A',
  },
  inactiveCircle: {
    backgroundColor: '#FFE9D3',
  },
  stepLabel: {
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '500',
    textAlign: 'center',
  },
  activeLabel: {
    color: '#09090B',
    fontWeight: '600',
  },
  inactiveLabel: {
    color: '#525252',
  },
  connector: {
    width: 40,
    height: 2.5,
    backgroundColor: '#D9D9D9',
    alignSelf: 'center',
    marginHorizontal: 2,
  },
});
