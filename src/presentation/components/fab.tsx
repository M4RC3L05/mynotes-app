import React, { PropsWithoutRef } from "react";
import { StyleProp, TouchableNativeFeedback, View, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useTheme } from "../theme/theme";

export function Fab({
  onPress,
  icon,
  style,
}: PropsWithoutRef<{ onPress: () => void; icon: string; style?: StyleProp<ViewStyle> }>) {
  const theme = useTheme();

  return (
    <View
      style={[
        {
          width: 60,
          height: 60,
          borderRadius: 12,
          overflow: "hidden",
          backgroundColor: theme.color.bgVariant,
          elevation: 18,
        },
        style,
      ]}
    >
      <TouchableNativeFeedback style={{ flex: 1 }} onPress={onPress}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Icon size={32} name={icon} color={theme.color.icon} />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}
