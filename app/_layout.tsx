import { Stack } from "expo-router";
import { BookingProvider } from "./components/BookingContext";

export default function RootLayout() {
  return (
    <BookingProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Your existing screen definitions */}
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="plan-umrah" options={{ headerShown: false }} />
        <Stack.Screen 
          name="profile"
          options={{ 
            headerShown: false
          }} 
        />

        {/* Add this new admin screen definition */}
        <Stack.Screen
          name="admin"
          options={{
            headerShown: false,
            presentation: "modal",
          }}
        />
      </Stack>
    </BookingProvider>
  );
}
