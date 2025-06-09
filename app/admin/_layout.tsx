import { Stack } from 'expo-router';

export default function AdminLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Admin Dashboard' }} />
      <Stack.Screen name="flights" options={{ title: 'Manage Flights' }} />
      <Stack.Screen name="hotels" options={{ title: 'Manage Hotels' }} />
      <Stack.Screen name="umrah" options={{ title: 'Manage Umrah Packages' }} />
      <Stack.Screen name="users" options={{ title: 'Manage Users' }} />
      <Stack.Screen name="bookings" options={{ title: 'Manage Bookings' }} />
    </Stack>
  );
}