import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen 
        name="index" 
        options={{
          title: 'My Profile',
          headerTitleStyle: {
            fontFamily: 'Inter',
            fontSize: 16,
            fontWeight: '600',
          },
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#fff',
          },
        }}
      />
    </Stack>
  );
}