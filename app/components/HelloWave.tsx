import React from "react";
import { Text, StyleSheet } from "react-native";

export default function HelloWave() {
  return <Text style={styles.text}>👋</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    marginLeft: 8,
  },
});
