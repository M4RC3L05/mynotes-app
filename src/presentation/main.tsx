import { PortalProvider } from "@gorhom/portal";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AppBar } from "./components/app-bar";
import { PhoneBars } from "./components/phone-bars";
import { EditNoteScreen } from "./screens/edit-note-screen";
import MainScreen from "./screens/main-screen";
import { RootStack } from "./screens/screens";

export function Main() {
  return (
    <SafeAreaProvider>
      <PhoneBars />
      <PortalProvider>
        <NavigationContainer>
          <RootStack.Navigator initialRouteName="Main" screenOptions={{ header: AppBar }}>
            <RootStack.Screen name="Main" component={MainScreen} />
            <RootStack.Screen name="EditNote" component={EditNoteScreen} />
          </RootStack.Navigator>
        </NavigationContainer>
      </PortalProvider>
    </SafeAreaProvider>
  );
}
