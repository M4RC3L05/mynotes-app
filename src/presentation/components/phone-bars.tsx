import React, { useEffect } from "react";
import { StatusBar, useColorScheme } from "react-native";
import SystemNavigationBar from "react-native-system-navigation-bar";

export function PhoneBars() {
  const isDarkMode = useColorScheme() === "dark";

  useEffect(() => {
    void SystemNavigationBar.setNavigationColor("transparent");
  }, []);

  return (
    <StatusBar
      translucent
      animated
      backgroundColor="transparent"
      barStyle={isDarkMode ? "light-content" : "dark-content"}
    />
  );
}
