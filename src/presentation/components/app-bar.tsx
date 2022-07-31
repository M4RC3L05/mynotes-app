import { PortalHost } from "@gorhom/portal";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "../theme/theme";
import { AppBarAction } from "./appbar-action";

export function AppBar({ back, navigation }: NativeStackHeaderProps) {
  const { top: topInsets } = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.color.appBar,
        width: "100%",
        padding: 8,
        elevation: 16,
        paddingHorizontal: 16,
        flexDirection: "row",
        paddingTop: 18 + topInsets,
        paddingBottom: 18,
        alignItems: "center",
      }}
    >
      {back && (
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            alignContent: "space-between",
            marginRight: 16,
          }}
        >
          <AppBarAction
            icon="arrow-left"
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
            }}
          />
        </View>
      )}

      <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start" }}>
        <Text
          style={{
            lineHeight: theme.sizes.appBarTitle,
            color: theme.color.appBarTitle,
            fontSize: theme.sizes.appBarTitle,
          }}
        >
          My notes
        </Text>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignContent: "space-between",
          flexDirection: "row",
          marginLeft: 16,
        }}
      >
        <PortalHost name="AppBarRightActions" />
      </View>
    </View>
  );
}
