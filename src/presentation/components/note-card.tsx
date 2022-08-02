import React, { PropsWithoutRef } from "react";
import { Text, View } from "react-native";

import { NoteFile } from "../../domain/models/note-file";
import { useTheme } from "../theme/theme";
import { NoteCardAction } from "./note-card-action";

export function NoteCard({
  item,
  onView,
  onDelete,
  onRename,
}: PropsWithoutRef<{ item: NoteFile; onView: () => void; onDelete: () => void; onRename: () => void }>) {
  const theme = useTheme();

  return (
    <View
      style={{
        width: "100%",
        backgroundColor: theme.color.noteCard,
        borderRadius: 12,
        minHeight: 140,
        elevation: 4,
        justifyContent: "space-between",
        overflow: "hidden",
      }}
    >
      <View style={{ paddingHorizontal: 18, paddingTop: 18 }}>
        <Text
          style={{
            fontWeight: "bold",
            color: theme.color.noteCardTitle,
            fontSize: theme.sizes.noteCardTitle,
            marginBottom: 8,
          }}
        >
          {item.name}
        </Text>
        <Text style={{ color: theme.color.noteCardDate }}>{item.modifiedAt.toLocaleDateString()}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: theme.color.noteCardActionsSection,
          paddingStart: 10,
        }}
      >
        <NoteCardAction text="View" onPress={onView} />
        <NoteCardAction text="Rename" onPress={onRename} />
        <NoteCardAction text="Delete" onPress={onDelete} />
      </View>
    </View>
  );
}
