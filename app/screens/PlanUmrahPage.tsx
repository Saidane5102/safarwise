import { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LoadingSpinner } from "../components/LoadingSpinner";
import PrimaryButton from "../components/PrimaryButton";
import StepProgress from "./StepProgress";

export default function PlanUmrahPage() {
  // Hide the Expo Router top bar
  // @ts-ignore
  PlanUmrahPage.options = { headerShown: false };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const handleStartPlanning = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      // Simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCurrentStep(prev => Math.min(prev + 1, 6));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <View style={styles.container}>
      <StepProgress currentStep={currentStep} />
      <Text style={styles.title}>Plan Your Umrah</Text>
      
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <PrimaryButton 
            title="Try Again" 
            onPress={() => setError(null)} 
            style={styles.retryButton}
          />
        </View>
      ) : (
        <>
          <Text style={styles.text}>
            This is the start of your Umrah planning flow. Add your steps here!
          </Text>
          <PrimaryButton
            title="Start Planning"
            onPress={handleStartPlanning}
            style={styles.startButton}
          />
        </>
      )}
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
    marginBottom: 24,
  },
  errorContainer: {
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#FF3B30',
  },
  startButton: {
    marginTop: 20,
  },
});
