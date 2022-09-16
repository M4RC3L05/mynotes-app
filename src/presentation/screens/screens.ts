import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import type { NoteFile } from "../../domain/models/note-file";

export type TRootStackParameterList = {
  Main: undefined;
  EditNote: { file: NoteFile; mode: "edit" | "view" };
};
export type TMainScreenNavigationProp = NativeStackNavigationProp<TRootStackParameterList, "Main">;
export type TMainScreenRouteProp = RouteProp<TRootStackParameterList, "Main">;
export type TEditNoteScreenNavigationProp = NativeStackNavigationProp<TRootStackParameterList, "EditNote">;
export type TEditNoteScreenRouteProp = RouteProp<TRootStackParameterList, "EditNote">;

export const RootStack = createNativeStackNavigator();
