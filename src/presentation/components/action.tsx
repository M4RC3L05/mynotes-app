import type { PropsWithoutRef } from "react";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

import { useTheme } from "../theme/theme";

export function Action({ onPress, text }: PropsWithoutRef<{ onPress: () => void; text: string }>) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={{
        height: 40,
        minWidth: 40,
        justifyContent: "center",
        alignContent: "space-between",
      }}
      onPress={onPress}
    >
      <Text style={{ color: theme.color.actionText }}>{text}</Text>
    </TouchableOpacity>
  );
}
