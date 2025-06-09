import { Stack } from "expo-router";
import { BookingProvider } from "./components/BookingContext";
import { ErrorBoundary } from "./components/ErrorBoundary";

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <BookingProvider>
        {<Stack screenOptions={{ headerShown: false }} />}
      </BookingProvider>
    </ErrorBoundary>
  );
}
