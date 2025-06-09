import React from 'react';
import { GestureResponderEvent } from 'react-native';
import OneButton from './OneButton';

interface PrimaryButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: any;
  testID?: string;
  disabled?: boolean;
  loading?: boolean;
}

export default function PrimaryButton(props: PrimaryButtonProps) {
  return <OneButton {...props} />;
}
