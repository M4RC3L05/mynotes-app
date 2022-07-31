import React, { PropsWithoutRef, useEffect, useState } from "react";
import { Text, TextInput, TouchableWithoutFeedback, View } from "react-native";

import { useTheme } from "../theme/theme";
import { Action } from "./action";

export function AddNoteModal({
  onCancel,
  onCreate,
  onDismiss,
  show = false,
}: PropsWithoutRef<{ onDismiss: () => void; onCreate: (name: string) => void; onCancel: () => void; show: boolean }>) {
  const theme = useTheme();
  const [name, setName] = useState("");

  useEffect(() => {
    if (show) {
      setName("");
    }
  }, [show]);

  return show ? (
    <>
      <View style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: "#00000066" }}>
        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={onDismiss}>
          <View style={{ flex: 1 }} />
        </TouchableWithoutFeedback>
      </View>
      <View
        style={{
          position: "absolute",
          alignSelf: "center",
          height: 250,
          top: "50%",
          width: "90%",
          transform: [{ translateY: -125 }],
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: theme.color.bg,
            borderRadius: 12,
            padding: 24,
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: theme.sizes.addNoteTitle, color: theme.color.addNoteTitle, marginBottom: 4 }}>
              Add new note
            </Text>
            <Text style={{ fontSize: theme.sizes.addNoteMessage, color: theme.color.addNoteMessage, marginBottom: 16 }}>
              If exists a note with the same name, nothing will happen.
            </Text>
            <View
              style={{
                borderRadius: 4,
                paddingHorizontal: 8,
                backgroundColor: theme.color.bgVariant,
              }}
            >
              <TextInput
                placeholder="Note name"
                placeholderTextColor={theme.color.addNotePlaceholder}
                style={{
                  fontSize: theme.sizes.addNoteInput,
                  color: theme.color.addNoteInput,
                  backgroundColor: theme.color.bgVariant,
                }}
                value={name}
                onChangeText={(text) => {
                  setName(text);
                }}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ marginRight: 16 }}>
              <Action
                text="Create"
                onPress={() => {
                  onCreate(name);
                }}
              />
            </View>
            <Action text="Cancel" onPress={onCancel} />
          </View>
        </View>
      </View>
    </>
  ) : null;
}
