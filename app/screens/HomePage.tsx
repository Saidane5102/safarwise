import { useRouter } from 'expo-router';
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomePage() {
  const router = useRouter();
  return (
    <View style={styles.homeContainer}>
      {/* Top Section */}
      <View style={styles.homeTopSection}>
        {/* Logo and Spacer */}
        <View style={styles.homeHeaderRow}>
          <Image source={require('../../assets/images/faviconsafar.png')} style={{ width: 29, height: 29, borderRadius: 6 }} />
          <View style={{ width: 191, height: 28 }} />
        </View>
        {/* Welcome Texts */}
        <View style={styles.homeWelcomeBox}>
          <Text style={styles.homeWelcome1}>Salam alaykum, Welcome to Safarwise!</Text>
          <Text style={styles.homeWelcome2}>How can we help today?</Text>
        </View>
        {/* Cards Row */}
        <View style={styles.homeCardsRow}>
          <TouchableOpacity style={styles.homeCard} onPress={() => router.push('/screens/PlanUmrahStep1')}>
            <Image source={require('../../assets/images/planeumrah.png')} style={styles.homeCardImg} />
            <Text style={styles.homeCardText}>Begin Planning Your Umrah</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.homeCard} onPress={() => console.log('Ask Labeeb pressed!')}>
            <Image source={require('../../assets/images/labeebai.png')} style={styles.homeCardImg} />
            <Text style={styles.homeCardText}>Ask Labeeb – Your Umrah Assistant</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Bottom Section */}
      <View style={styles.homeBottomSection}>
        <Text style={styles.homeBottomText1}>
          Because you are not just traveling.{"\n"}You are answering a sacred call.
        </Text>
        <Text style={styles.homeBottomText2}>Amin Khelil{"\n"}founder</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 0,
    paddingBottom: 0,
    gap: 40,
    backgroundColor: '#fff',
  },
  homeTopSection: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 27,
  },
  homeHeaderRow: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  homeLogoBox: {
    width: 29,
    height: 29,
    position: 'relative',
    overflow: 'hidden',
  },
  homeLogoBar: {
    width: 16.49,
    height: 29,
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: '#09090B',
    borderRadius: 4,
  },
  homeLogoDot: {
    width: 11.08,
    height: 10.09,
    position: 'absolute',
    left: 17.9,
    top: 5.42,
    backgroundColor: '#09090B',
    borderRadius: 5,
  },
  homeWelcomeBox: {
    alignSelf: 'stretch',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 8,
  },
  homeWelcome1: {
    width: 321,
    color: '#09090B',
    fontSize: 30,
    fontFamily: 'IBM Plex Sans Arabic',
    fontWeight: '400',
    lineHeight: 36,
  },
  homeWelcome2: {
    width: 321,
    color: '#09090B',
    fontSize: 30,
    fontFamily: 'IBM Plex Sans Arabic',
    fontWeight: '600',
    lineHeight: 36,
  },
  homeCardsRow: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  homeCard: {
    flex: 1,
    height: 222,
    maxWidth: 163.5,
    minWidth: 163.5,
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D4D4D4',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 10,
  },
  homeCardImg: {
    alignSelf: 'stretch',
    height: 143.5,
    borderRadius: 14,
    width: '100%',
  },
  homeCardText: {
    alignSelf: 'stretch',
    color: '#09090B',
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '500',
    lineHeight: 20,
  },
  homeBottomSection: {
    alignSelf: 'stretch',
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  homeBottomText1: {
    width: 321,
    textAlign: 'center',
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '400',
    lineHeight: 20,
  },
  homeBottomText2: {
    width: 321,
    textAlign: 'center',
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '400',
    lineHeight: 20,
  },
  topBarContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#fff', // reverted from #FF7A00
    marginBottom: 0,
  },
});
