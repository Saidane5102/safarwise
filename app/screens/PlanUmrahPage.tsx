import { StyleSheet, Text, View } from "react-native";
import StepProgress from "./StepProgress";

export default function PlanUmrahPage() {
  // Hide the Expo Router top bar
  // @ts-ignore
  PlanUmrahPage.options = { headerShown: false };

  // For demo, set currentStep to 1. You can manage this with state as you build the flow.
  const currentStep = 1;
  return (
    <View style={styles.container}>
      <StepProgress currentStep={currentStep} />
      <Text style={styles.title}>Plan Your Umrah</Text>
      <Text style={styles.text}>This is the start of your Umrah planning flow. Add your steps here!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
    color: '#007AFF',
  },
  text: {
    fontSize: 18,
    color: '#222',
    textAlign: 'center',
  },
});
