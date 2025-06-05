import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function MyTripsPage() {
  // Hide the Expo Router top bar
  // @ts-ignore
  MyTripsPage.options = { headerShown: false };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Here are your trips.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 22,
    fontWeight: '600',
    color: '#222',
  },
});
