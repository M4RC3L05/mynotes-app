import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useRef, useState } from "react";
import { ActivityIndicator, TextInput, View } from "react-native";

import { NoteFile } from "../../domain/models/note-file";
import { GetOrRequestANotesDirectoryUseCaseFactory } from "../../domain/use-cases/get-or-request-a-notes-directory-use-case";
import { ReadNoteUseCaseFactory } from "../../domain/use-cases/read-note-use-case";
import { WriteNoteUseCaseFactory } from "../../domain/use-cases/write-note-use-case";
import { Fab } from "../components/fab";
import MarkdownRenderer from "../components/markdown-renderer";
import { useUseCase } from "../hooks/useUseCase";
import { useTheme } from "../theme/theme";
import { TEditNoteScreenNavigationProp, TEditNoteScreenRouteProp } from "./screens";

export function EditNoteScreen() {
  const route = useRoute<TEditNoteScreenRouteProp>();
  const navigation = useNavigation<TEditNoteScreenNavigationProp>();
  const [data, setData] = useState<string | undefined>(undefined);
  const [load, setLoad] = useState<boolean>(false);
  const [mode, setMode] = useState<string>(route?.params?.mode);
  const fileRef = useRef<NoteFile | undefined>(route?.params?.file);
  const saveOnTypeCB = useRef<number>();
  const theme = useTheme();
  const textInputRef = useRef<TextInput>();
  const { execute: readNote } = useUseCase(ReadNoteUseCaseFactory);
  const { execute: writeNote } = useUseCase(WriteNoteUseCaseFactory);
  const { execute: getOrRequestANotesDir } = useUseCase(GetOrRequestANotesDirectoryUseCaseFactory);

  const loadFile = useCallback(async () => {
    if (!fileRef.current) {
      return;
    }

    try {
      setLoad(true);
      const data = await readNote({ note: fileRef.current });
      setData(data);
      setLoad(false);
      textInputRef.current?.focus();
    } catch {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.replace("Main");
      }
    }
  }, [navigation, readNote]);

  const handleChangeText = async (txt: string) => {
    setData(txt);

    if (saveOnTypeCB.current) {
      clearTimeout(saveOnTypeCB.current);
      saveOnTypeCB.current = undefined;
    }

    saveOnTypeCB.current = setTimeout(() => {
      void getOrRequestANotesDir().then(async (notesDir) => writeNote({ data: txt, note: fileRef.current!, notesDir }));
    }, 250);
  };

  useFocusEffect(
    useCallback(
      () => () => {
        setData(undefined);
      },
      [],
    ),
  );

  useFocusEffect(
    useCallback(() => {
      if (!fileRef.current) {
        if (navigation.canGoBack()) {
          navigation.goBack();
        } else {
          navigation.replace("Main");
        }
      }
    }, [navigation]),
  );

  useFocusEffect(
    useCallback(() => {
      void loadFile();
    }, [loadFile]),
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.color.bg }}>
      {load ? (
        <View style={{ flex: 1 }}>
          <ActivityIndicator size="large" />
        </View>
      ) : mode === "edit" ? (
        <TextInput
          multiline
          autoCapitalize="none"
          textAlign="left"
          style={{
            paddingHorizontal: 8,
            paddingVertical: 0,
            color: theme.color.editNote,
            flex: 1,
            textAlignVertical: "top",
          }}
          value={data ?? ""}
          onChangeText={handleChangeText}
        />
      ) : (
        <MarkdownRenderer markdown={data ?? ""} />
      )}
      <Fab
        icon={mode === "edit" ? "eye-outline" : "pencil-outline"}
        style={{ position: "absolute", right: 22, bottom: 22 }}
        onPress={() => {
          setMode((pm) => (pm === "edit" ? "view" : "edit"));
        }}
      />
    </View>
  );
}
