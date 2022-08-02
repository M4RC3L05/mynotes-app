import { Portal } from "@gorhom/portal";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useCallback, useMemo, useState } from "react";
import { FlatList, View } from "react-native";

import { NoteFile } from "../../domain/models/note-file";
import { CreateNoteUseCaseFactory } from "../../domain/use-cases/create-note-use-case";
import { DeleteNoteUseCaseFactory } from "../../domain/use-cases/delete-note-use-case";
import { GetNotesUseCaseFactory } from "../../domain/use-cases/get-notes-use-case";
import { GetOrRequestANotesDirectoryUseCaseFactory } from "../../domain/use-cases/get-or-request-a-notes-directory-use-case";
import { RenameNoteUseCaseFactory } from "../../domain/use-cases/rename-noto-use-case";
import { AppBarAction } from "../components/appbar-action";
import { AddNoteModal } from "../components/editable-models/add-note-modal";
import { RenameNoteModal } from "../components/editable-models/rename-note-modal";
import { Fab } from "../components/fab";
import { NoteCard } from "../components/note-card";
import { NoteSearch } from "../components/note-search";
import { useUseCase } from "../hooks/useUseCase";
import { useTheme } from "../theme/theme";
import { TMainScreenNavigationProp } from "./screens";

function MainScreen() {
  const [newNoteDialog, setNewNoteDialog] = useState(false);
  const [renameNoteDialog, setRenameNoteDialog] = useState(false);
  const [noteToRename, setNoteToRename] = useState<NoteFile | undefined>();
  const [noteFiles, setNoteFiles] = useState<NoteFile[]>([]);
  const [query, setQuery] = useState<string | undefined>(undefined);
  const [showSearch, setShowSearch] = useState(false);
  const navigation = useNavigation<TMainScreenNavigationProp>();
  const theme = useTheme();
  const isFocus = useIsFocused();
  const { execute: getNotes, executing: gettingNotes } = useUseCase(GetNotesUseCaseFactory);
  const { execute: getOrSetNotesDir } = useUseCase(GetOrRequestANotesDirectoryUseCaseFactory);
  const { execute: createNote } = useUseCase(CreateNoteUseCaseFactory);
  const { execute: deleteNote } = useUseCase(DeleteNoteUseCaseFactory);
  const { execute: renameNote } = useUseCase(RenameNoteUseCaseFactory);

  const filtered = useMemo(
    () => (query ? noteFiles.filter(({ name }) => name.toLowerCase().includes(query.toLowerCase())) : noteFiles),
    [noteFiles, query],
  );

  const fetchNoteFiles = useCallback(async () => {
    try {
      const notesDir = await getOrSetNotesDir();
      const notes = await getNotes({ notesDir });
      setNoteFiles(notes);
    } catch {}
  }, [getNotes, getOrSetNotesDir]);

  const beginAddNewNote = async () => {
    try {
      await getOrSetNotesDir();
      setNewNoteDialog(true);
    } catch {}
  };

  useFocusEffect(
    useCallback(() => {
      void fetchNoteFiles();
    }, [fetchNoteFiles]),
  );

  const handleNewNoteDialog = async (noteName: string) => {
    try {
      const notesDir = await getOrSetNotesDir();
      await createNote({ fileName: noteName, notesDir });

      setNewNoteDialog(false);
      await fetchNoteFiles();
    } catch {}
  };

  const previewNote = async (file: NoteFile) => {
    // @ts-ignore
    navigation.navigate("EditNote", { file: { uri: file.uri, name: file.name }, mode: "edit" });
  };

  const removeNote = async (file: NoteFile) => {
    try {
      await deleteNote({ note: file });
      await fetchNoteFiles();
    } catch {}
  };

  const handeRenameNote = async (newName: string) => {
    try {
      const notesDir = await getOrSetNotesDir();
      await renameNote({ file: noteToRename!, newFileName: newName, notesDir });
      await fetchNoteFiles();

      setNoteToRename(undefined);
      setRenameNoteDialog(false);
    } catch {}
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.color.bg }}>
      <NoteSearch
        show={showSearch}
        onDismiss={() => {
          setShowSearch(false);
        }}
        onSearchQuery={(query) => {
          setQuery(query);
        }}
      />

      <FlatList
        style={{ flex: 1 }}
        refreshing={gettingNotes}
        data={filtered}
        ItemSeparatorComponent={() => <View style={{ marginBottom: 18 }} />}
        keyExtractor={(item) => item.uri}
        contentContainerStyle={{ paddingVertical: 18, paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <NoteCard
            item={item}
            onRename={() => {
              setNoteToRename(item);
              setRenameNoteDialog(true);
            }}
            onDelete={() => {
              void removeNote(item);
            }}
            onView={() => {
              void previewNote(item);
            }}
          />
        )}
        onRefresh={fetchNoteFiles}
      />
      <Fab icon="plus" style={{ position: "absolute", bottom: 22, right: 22 }} onPress={beginAddNewNote} />
      <Portal>
        <AddNoteModal
          show={newNoteDialog}
          onDismiss={() => {
            setNewNoteDialog(false);
          }}
          onCancel={() => {
            setNewNoteDialog(false);
          }}
          onCreate={handleNewNoteDialog}
        />

        {noteToRename ? (
          <RenameNoteModal
            show={renameNoteDialog}
            note={noteToRename}
            onCancel={() => {
              setRenameNoteDialog(false);
              setNoteToRename(undefined);
            }}
            onDismiss={() => {
              setRenameNoteDialog(false);
              setNoteToRename(undefined);
            }}
            onRename={handeRenameNote}
          />
        ) : null}
      </Portal>
      {isFocus ? (
        <Portal hostName="AppBarRightActions">
          <AppBarAction
            icon="magnify"
            onPress={() => {
              setShowSearch(true);
            }}
          />
        </Portal>
      ) : null}
    </View>
  );
}

export default MainScreen;
