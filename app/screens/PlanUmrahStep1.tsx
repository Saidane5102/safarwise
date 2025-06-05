import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from "react";
import { FlatList, Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import StepProgress from "./StepProgress";

const AIRPORTS = [
  "London Heathrow (LHR)",
  "Jeddah King Abdulaziz (JED)",
  "Medina Prince Mohammad bin Abdulaziz (MED)",
  "Istanbul Airport (IST)",
  "Dubai International (DXB)",
  "Cairo International (CAI)",
  "Paris Charles de Gaulle (CDG)",
  "New York JFK (JFK)",
  "Kuala Lumpur (KUL)",
  "Doha Hamad (DOH)"
];

export default function PlanUmrahStep1() {
  // Hide the Expo Router top bar
  // @ts-ignore
  PlanUmrahStep1.options = { headerShown: false };

  const router = useRouter();
  const [airport, setAirport] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Filter airports by input
  const filteredAirports = AIRPORTS.filter(a =>
    airport.length > 0 && a.toLowerCase().includes(airport.toLowerCase())
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          {/* Top bar with back icon */}
          <View style={styles.topBarContainer}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backIconButton} accessibilityLabel="Go back" accessibilityRole="button">
              <Ionicons name="arrow-back" size={28} color="#09090B" />
            </TouchableOpacity>
          </View>

          {/* Step Progress */}
          <StepProgress currentStep={1} />

          {/* Main content */}
          <View style={{ flex: 1, width: '100%' }}>
            <View style={styles.contentBox}>
              <View style={styles.contentTitleBox}>
                <Text style={styles.contentTitle}>Where will your Umrah journey begin?</Text>
              </View>
              <View style={styles.contentInputBox}>
                <Text style={styles.inputLabel}>Choose your departure airport.</Text>
                <View style={[styles.inputFieldWrap, isFocused && styles.inputFieldWrapFocused]}>  
                  <TextInput
                    style={styles.inputField}
                    placeholder="e.g. London Heathrow (LHR)"
                    placeholderTextColor="#A3A3A3"
                    value={airport}
                    onChangeText={text => {
                      setAirport(text);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => {
                      setIsFocused(true);
                      setShowSuggestions(true);
                    }}
                    onBlur={() => {
                      setIsFocused(false);
                      setTimeout(() => setShowSuggestions(false), 150); // Delay to allow tap
                    }}
                    accessibilityLabel="Departure airport"
                    accessibilityHint="Enter your departure airport, for example London Heathrow (LHR)"
                    returnKeyType="done"
                    autoCapitalize="words"
                    autoCorrect={false}
                    importantForAutofill="yes"
                    accessible
                  />
                  <View style={styles.inputIconWrap}>
                    <Ionicons name="airplane-outline" size={20} color="#A3A3A3" accessibilityElementsHidden accessibilityIgnoresInvertColors />
                  </View>
                  {/* Floating label */}
                  {isFocused || airport ? (
                    <View style={styles.inputFloatingLabelWrap} pointerEvents="none">
                      <View style={styles.inputFloatingLabelLine} />
                      <Text style={styles.inputFloatingLabelText}>Airport</Text>
                    </View>
                  ) : null}
                </View>
                {/* Suggestions dropdown */}
                {showSuggestions && filteredAirports.length > 0 && (
                  <View style={styles.suggestionsBox}>
                    <FlatList
                      data={filteredAirports}
                      keyExtractor={item => item}
                      renderItem={({ item }) => (
                        <Pressable
                          style={styles.suggestionItem}
                          onPress={() => {
                            setAirport(item);
                            setShowSuggestions(false);
                            Keyboard.dismiss();
                          }}
                          accessibilityRole="button"
                        >
                          <Text style={styles.suggestionText}>{item}</Text>
                        </Pressable>
                      )}
                      keyboardShouldPersistTaps="handled"
                      style={{ maxHeight: 180 }}
                    />
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* Continue Button (fixed at bottom) */}
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={[styles.continueButton, airport ? styles.continueButtonEnabled : null]}
              disabled={!airport}
              accessibilityLabel="Continue"
              accessibilityRole="button"
              onPress={() => router.push('/screens/PlanUmrahStep2')}
            >
              <Text style={[styles.continueButtonText, airport ? styles.continueButtonTextEnabled : null]}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: Platform.OS === 'android' ? 32 : 48, // Add space for status bar
  },
  topBarContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#fff',
    marginBottom: 0,
  },
  backIconButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentBox: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 24,
    marginTop: 24,
  },
  contentTitleBox: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 8,
  },
  contentTitle: {
    alignSelf: 'stretch',
    color: '#09090B',
    fontSize: 30,
    fontFamily: 'IBM Plex Sans Arabic',
    fontWeight: '600',
    lineHeight: 36,
  },
  contentInputBox: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 16,
  },
  inputLabel: {
    color: '#09090B',
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '500',
    lineHeight: 20,
  },
  inputFieldWrap: {
    alignSelf: 'stretch',
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#D4D4D4',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    marginTop: 8,
  },
  inputFieldWrapFocused: {
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  inputField: {
    flex: 1,
    color: '#09090B',
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
    lineHeight: 24,
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
  },
  inputIconWrap: {
    width: 24,
    height: 24,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputIcon: {
    width: 16.69,
    height: 13.88,
    borderWidth: 2,
    borderColor: '#A3A3A3',
    borderRadius: 2,
  },
  inputFloatingLabelWrap: {
    position: 'absolute',
    left: 24,
    top: -11,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputFloatingLabelLine: {
    width: 51,
    height: 1,
    backgroundColor: '#fff',
    position: 'absolute',
    left: -2,
    top: 11,
  },
  inputFloatingLabelText: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '500',
    lineHeight: 20,
    marginTop: 12,
  },
  buttonWrapper: {
    width: '100%',
    paddingHorizontal: 0,
    paddingBottom: 24,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  continueButton: {
    width: '90%',
    alignSelf: 'center',
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#FFAE6D',
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#FFAE6D',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
  },
  continueButtonEnabled: {
    backgroundColor: '#FF7A00',
    borderColor: '#FF7A00',
  },
  continueButtonText: {
    color: '#FFE9D3',
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
    lineHeight: 24,
  },
  continueButtonTextEnabled: {
    color: '#fff',
  },
  suggestionsBox: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderColor: '#D4D4D4',
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    maxHeight: 180,
    zIndex: 10,
    elevation: 2,
    marginTop: -8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  suggestionItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
  },
  suggestionText: {
    fontSize: 16,
    color: '#09090B',
  },
});
