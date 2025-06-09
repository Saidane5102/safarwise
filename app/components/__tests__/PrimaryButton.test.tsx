import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import PrimaryButton from '../PrimaryButton';

describe('PrimaryButton', () => {
  it('renders correctly with title', () => {
    const { getByText } = render(
      <PrimaryButton title="Test Button" onPress={() => {}} />
    );
    
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <PrimaryButton title="Test Button" onPress={onPressMock} />
    );
    
    fireEvent.press(getByText('Test Button'));
    expect(onPressMock).toHaveBeenCalled();
  });

  it('respects disabled prop', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <PrimaryButton title="Test Button" onPress={onPressMock} disabled={true} />
    );
    
    fireEvent.press(getByText('Test Button'));
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
