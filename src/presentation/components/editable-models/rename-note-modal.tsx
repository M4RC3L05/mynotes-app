import React, { PropsWithoutRef, useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";

import { NoteFile } from "../../../domain/models/note-file";
import { useTheme } from "../../theme/theme";
import { Action } from "../action";
import { ModalBackground } from "./modal-background";

export function RenameNoteModal({
  onCancel,
  onRename,
  onDismiss,
  show = false,
  note,
}: PropsWithoutRef<{
  onDismiss: () => void;
  onRename: (name: string) => void;
  onCancel: () => void;
  show: boolean;
  note: NoteFile;
}>) {
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
            Rename note
          </Text>
          <Text style={{ fontSize: theme.sizes.addNoteMessage, color: theme.color.addNoteMessage, marginBottom: 16 }}>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Renaming "{note.name}"
          </Text>
          <View
            style={{
              borderRadius: 4,
              paddingHorizontal: 8,
              backgroundColor: theme.color.bgVariant,
            }}
          >
            <TextInput
              placeholder="New note name"
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
              text="Rename"
              onPress={() => {
                if (!name || name.trim().length <= 0) {
                  onCancel();
                  return;
                }

                onRename(name);
              }}
            />
          </View>
          <Action text="Cancel" onPress={onCancel} />
        </View>
      </View>
    </ModalBackground>
  );
}
