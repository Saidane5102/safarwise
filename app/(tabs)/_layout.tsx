import { Tabs } from 'expo-router';
import { Image } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#E5E5EA',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/home.png')}
              style={{
                width: 24,
                height: 24,
                opacity: focused ? 1 : 0.5,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="my-trips"
        options={{
          title: 'My Trips',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/trip.png')}
              style={{
                width: 24,
                height: 24,
                opacity: focused ? 1 : 0.5,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="labeeb"
        options={{
          title: 'Labeeb',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/labeeb.png')}
              style={{
                width: 24,
                height: 24,
                opacity: focused ? 1 : 0.5,
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}