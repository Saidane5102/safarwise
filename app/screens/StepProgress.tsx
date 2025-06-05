import React from "react";
import { StyleSheet, View } from "react-native";

interface StepProgressProps {
  currentStep: number; // 1-based index
  totalSteps?: number;
}

export default function StepProgress({ currentStep, totalSteps = 6 }: StepProgressProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps * 2 - 1 }).map((_, idx) => {
        // Odd indices are lines, even are circles
        if (idx % 2 === 0) {
          const stepIdx = idx / 2;
          const isActive = stepIdx < currentStep;
          return (
            <View
              key={`circle-${stepIdx}`}
              style={[styles.circle, isActive ? styles.circleActive : styles.circleInactive]}
            />
          );
        } else {
          const lineIdx = (idx - 1) / 2;
          const isActive = lineIdx < currentStep - 1;
          return (
            <View
              key={`line-${lineIdx}`}
              style={[styles.line, isActive ? styles.lineActive : styles.lineInactive]}
            />
          );
        }
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
  },
  circle: {
    width: 15.33,
    height: 16,
    borderRadius: 9999,
  },
  circleActive: {
    backgroundColor: '#FF5D0A', // Updated to Button/Primary/Default/Background
  },
  circleInactive: {
    backgroundColor: '#D9D9D9',
  },
  line: {
    flex: 1,
    height: 3.91,
    marginHorizontal: 2,
    borderRadius: 2,
  },
  lineActive: {
    backgroundColor: '#FF5D0A', // Updated to Button/Primary/Default/Background
  },
  lineInactive: {
    backgroundColor: '#D9D9D9',
  },
});
