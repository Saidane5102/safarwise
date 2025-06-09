import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get('window');

const LOADING_MESSAGES = [
  'Laying the Foundation for Your Trip...'
  // Add more messages here if you want to animate between them
];

export default function PlanUmrahLoading() {
  // Hide the Expo Router top bar
  // @ts-ignore
  PlanUmrahLoading.options = { headerShown: false };

  const router = useRouter();
  // Animated progress bar
  const progress = useRef(new Animated.Value(0)).current;
  const [messageIdx, setMessageIdx] = useState(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: false,
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }),
      ])
    ).start();
    // If you want to animate messages, uncomment below:
    // const interval = setInterval(() => {
    //   setMessageIdx(idx => (idx + 1) % LOADING_MESSAGES.length);
    // }, 3000);
    // return () => clearInterval(interval);

    // Auto-navigate to BookingFlights after loading
    const timeout = setTimeout(() => {
      router.push('/screens/BookingFlights');
    }, 2200);
    return () => clearTimeout(timeout);
  }, [progress, router]);

  const barWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 272],
  });

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.mainText}>
        A solo Umrah is a special kind of journey.{"\n"}Quiet. Intentional. Yours alone — but we’re here to support you throughout.
      </Text>
      {/* Centered loading bar and subtitle */}
      <View style={styles.centerSection}>
        <View style={styles.progressBarWrap}>
          <View style={styles.progressBarBg}>
            <Animated.View style={[styles.progressBarFill, { width: barWidth }]} />
            <View style={styles.progressBarDot} />
          </View>
        </View>
        <Text style={styles.loadingText}>{LOADING_MESSAGES[messageIdx]}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#FF5D0A',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mainText: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'IBM Plex Sans Arabic',
    fontWeight: '700',
    lineHeight: 32,
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 48,
    width: 322.55,
  },
  centerSection: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBarWrap: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  progressBarBg: {
    width: 272,
    height: 4,
    backgroundColor: 'rgba(120, 120, 128, 0.16)',
    borderRadius: 100,
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBarFill: {
    height: 4,
    backgroundColor: 'white',
    borderRadius: 100,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  progressBarDot: {
    width: 4,
    height: 4,
    backgroundColor: 'white',
    borderRadius: 100,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'IBM Plex Sans Arabic',
    fontWeight: '400',
    lineHeight: 28,
    textAlign: 'center',
    width: 304,
  },
});
