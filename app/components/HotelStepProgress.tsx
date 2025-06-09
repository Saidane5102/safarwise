import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface HotelStepProgressProps {
  step: 'mekkah' | 'medina';
}

export default function HotelStepProgress({ step }: HotelStepProgressProps) {
  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={[styles.step, styles.activeStep]}>
          <View style={styles.circle}>
            <Text style={styles.stepNumber}>1</Text>
          </View>
          <Text style={[styles.stepText, styles.activeText]}>Mekkah Hotel</Text>
        </View>
        
        <View style={[styles.line, step === 'medina' && styles.activeLine]} />
        
        <View style={[styles.step, step === 'medina' && styles.activeStep]}>
          <View style={[styles.circle, step === 'medina' && styles.activeCircle]}>
            <Text style={[styles.stepNumber, step === 'medina' && styles.activeStepNumber]}>2</Text>
          </View>
          <Text style={[styles.stepText, step === 'medina' && styles.activeText]}>Medina Hotel</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  step: {
    alignItems: 'center',
    opacity: 0.5,
  },
  activeStep: {
    opacity: 1,
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E4E4E7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  activeCircle: {
    backgroundColor: '#0891B2',
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#71717A',
  },
  activeStepNumber: {
    color: '#fff',
  },
  stepText: {
    fontSize: 14,
    color: '#71717A',
    fontWeight: '500',
  },
  activeText: {
    color: '#09090B',
  },
  line: {
    height: 2,
    width: 80,
    backgroundColor: '#E4E4E7',
    marginHorizontal: 12,
  },
  activeLine: {
    backgroundColor: '#0891B2',
  },
});