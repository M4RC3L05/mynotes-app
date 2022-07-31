import React, { PropsWithoutRef, useEffect, useRef, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useTheme } from "../theme/theme";

export function NoteSearch({
  show,
  onDismiss,
  onSearchQuery,
}: PropsWithoutRef<{ show: boolean; onDismiss: () => void; onSearchQuery: (query: string) => void }>) {
  const [filterNotes, setFilterNotes] = useState<string | undefined>(undefined);
  const debounceTimeoutRef = useRef<number>();
  const theme = useTheme();
  const onSearchQueryRef = useRef(onSearchQuery);

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
      debounceTimeoutRef.current = undefined;
    }

    const query = filterNotes;
    debounceTimeoutRef.current = setTimeout(() => {
      onSearchQueryRef.current?.(query ?? "");
    }, 250);
  }, [filterNotes]);

  return show ? (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 16,
        marginBottom: 12,
        borderRadius: 8,
        backgroundColor: theme.color.bgVariant,
        overflow: "hidden",
        paddingHorizontal: 12,
      }}
    >
      <TextInput
        placeholder="Note name"
        placeholderTextColor={theme.color.searchNotePlaceholder}
        style={{
          flex: 1,
          fontSize: theme.sizes.searchNoteInput,
          color: theme.color.searchNoteInput,
          backgroundColor: theme.color.bgVariant,
        }}
        value={filterNotes}
        onChangeText={setFilterNotes}
      />

      <TouchableOpacity
        onPress={() => {
          setFilterNotes(undefined);
          onDismiss();
        }}
      >
        <View>
          <Icon name="close" size={24} color={theme.color.icon} />
        </View>
      </TouchableOpacity>
    </View>
  ) : null;
}
