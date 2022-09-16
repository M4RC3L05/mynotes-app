import type { PropsWithoutRef } from "react";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

import { useTheme } from "../theme/theme";

export function NoteCardAction({ onPress, text }: PropsWithoutRef<{ onPress: () => void; text: string }>) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={{
        height: 40,
        minWidth: 40,
        justifyContent: "center",
        alignContent: "space-between",
        paddingVertical: 8,
        paddingHorizontal: 8,
      }}
      onPress={onPress}
    >
      <Text style={{ color: theme.color.noteCardTitle }}>{text}</Text>
    </TouchableOpacity>
  );
}
