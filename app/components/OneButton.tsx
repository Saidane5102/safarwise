import React from 'react';
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function OneButton({
  title,
  onPress,
  style,
  testID,
  disabled = false,
  loading = false,
}: {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: any;
  testID?: string;
  disabled?: boolean;
  loading?: boolean;
}) {
  return (
    <View style={styles.fixedWrapper} pointerEvents="box-none">
      <TouchableOpacity
        style={[styles.button, style, disabled && { opacity: 0.5 }]}
        onPress={onPress}
        activeOpacity={0.85}
        testID={testID}
        disabled={disabled || loading}
      >
        <Text style={styles.buttonText}>{loading ? '...' : title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  fixedWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 32, // 32px away from the bottom
    alignItems: 'center',
    zIndex: 100,
  },
  button: {
    width: '90%',
    alignSelf: 'center',
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#FF5D0A',
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#FF5D0A',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
  },
  buttonText: {
    color: '#FFF5EC',
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
    lineHeight: 24,
  },
});
