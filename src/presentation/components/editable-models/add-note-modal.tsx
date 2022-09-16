import type { PropsWithoutRef } from "react";
import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableWithoutFeedback, View } from "react-native";

import { useTheme } from "../../theme/theme";
import { Action } from "../action";
import { ModalBackground } from "./modal-background";

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

  return (
    <ModalBackground show={show} onDismiss={onDismiss}>
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
                if (!name || name.trim().length <= 0) {
                  onCancel();
                  return;
                }

                onCreate(name);
              }}
            />
          </View>
          <Action text="Cancel" onPress={onCancel} />
        </View>
      </View>
    </ModalBackground>
  );
}
