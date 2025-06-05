import { Image } from 'expo-image';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  // Hide the Expo Router top bar
  // @ts-ignore
  HomeScreen.options = { headerShown: false };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ alignItems: 'center', backgroundColor: '#A1CEDC', width: '100%' }}>
        <Image
          source={require('../../assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Welcome!</Text>
      </View>
      <View style={styles.stepContainer}>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>Step 1: Try it</Text>
        <Text>
          Edit <Text style={{ fontWeight: 'bold' }}>app/(tabs)/index.tsx</Text> to see changes.
          Press{' '}
          <Text style={{ fontWeight: 'bold' }}>
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </Text>{' '}
          to open developer tools.
        </Text>
      </View>
      <View style={styles.stepContainer}>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>Step 2: Explore</Text>
        <Text>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </Text>
      </View>
      <View style={styles.stepContainer}>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>Step 3: fresh start</Text>
        <Text>
          {`When you're ready, run `}
          <Text style={{ fontWeight: 'bold' }}>npm run reset-project</Text> to get a fresh{' '}
          <Text style={{ fontWeight: 'bold' }}>app</Text> directory. This will move the current{' '}
          <Text style={{ fontWeight: 'bold' }}>app</Text> to{' '}
          <Text style={{ fontWeight: 'bold' }}>app-example</Text>.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
