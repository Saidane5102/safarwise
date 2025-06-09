import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HomePage from "./screens/HomePage";
import LabeebPage from "./screens/LabeebPage";
import LoginScreen from "./screens/LoginScreen";
import MyTripsPage from "./screens/MyTripsPage";
import RegisterScreen from "./screens/RegisterScreen";

const NAV_ITEMS = [
  {
    label: "Home",
    icon: require("../assets/images/home.png"),
  },
  {
    label: "Labeeb",
    icon: require("../assets/images/labeeb.png"),
  },
  {
    label: "My trips",
    icon: require("../assets/images/trip.png"),
  },
];
const PAGES = [HomePage, LabeebPage, MyTripsPage];

export default function Index() {
  const [auth, setAuth] = useState<{ email: string } | null>(null);
  const [showRegister, setShowRegister] = useState(false);
  const [active, setActive] = useState(0);
  const PageComponent = PAGES[active];

  if (!auth) {
    if (showRegister) {
      return (
        <RegisterScreen
          onRegister={(email) => {
            setAuth({ email });
            setShowRegister(false);
          }}
          onGoToLogin={() => setShowRegister(false)}
        />
      );
    }
    return (
      <LoginScreen
        onLogin={(email) => setAuth({ email })}
        onGoToRegister={() => setShowRegister(true)}
      />
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flex: 1 }}>
        <PageComponent />
      </View>
      <View style={styles.bottomNav}>
        {NAV_ITEMS.map((item, idx) => (
          <TouchableOpacity
            key={item.label}
            style={styles.navItem}
            onPress={() => setActive(idx)}
          >
            <View
              style={[
                styles.iconContainer,
                active === idx && styles.activeIconContainer,
              ]}
            >
              <Image
                source={item.icon}
                style={[
                  styles.iconSvg,
                  active === idx && styles.activeIconSvg,
                ]}
                resizeMode="contain"
              />
            </View>
            <Text
              style={[styles.navLabel, active === idx && styles.activeLabel]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => setAuth(null)}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#D4D4D4",
    backgroundColor: "#fff",
  },
  navItem: {
    width: 57,
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  iconContainer: {
    width: 24,
    height: 24,
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "transparent",
  },
  activeIconContainer: {
    backgroundColor: "#FFE9D3", // subtle orange background for active icon
  },
  iconSvg: {
    width: 24,
    height: 24,
    tintColor: "#404040",
  },
  activeIconSvg: {
    tintColor: "#FF7A00", // changed from #007AFF (blue) to #FF7A00 (orange)
  },
  navLabel: {
    alignSelf: "stretch",
    textAlign: "center",
    color: "#404040",
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "Inter",
  },
  activeLabel: {
    color: "#FF7A00", // changed from #007AFF (blue) to #FF7A00 (orange)
  },
  logoutBtn: {
    position: "absolute",
    top: 48,
    right: 24,
    backgroundColor: "#FF7A00",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});
