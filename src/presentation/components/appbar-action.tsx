import type { PropsWithoutRef } from "react";
import React from "react";
import { TouchableNativeFeedback, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useTheme } from "../theme/theme";

export function AppBarAction({ icon, onPress }: PropsWithoutRef<{ onPress: () => void; icon: string }>) {
  const theme = useTheme();

  return (
    <View
      style={{
        width: theme.sizes.appBarTitle,
        height: theme.sizes.appBarTitle,
        backgroundColor: theme.color.bgVariant,
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <TouchableNativeFeedback style={{ flex: 1 }} onPress={onPress}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon name={icon} size={24} color={theme.color.icon} />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}
