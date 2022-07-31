import { useColorScheme } from "react-native";

type TAppThemeSizes = {
  appBarTitle: number;
  noteCardTitle: number;
  noteCardDate: number;
  addNoteTitle: number;
  addNoteMessage: number;
  addNoteInput: number;
  searchNoteInput: number;
};

type TAppThemeColors = {
  bg: string;
  bgVariant: string;
  icon: string;
  appBar: string;
  appBarTitle: string;
  noteCard: string;
  noteCardActionsSection: string;
  noteCardTitle: string;
  noteCardDate: string;
  addNoteTitle: string;
  addNoteMessage: string;
  addNoteInput: string;
  actionText: string;
  editNote: string;
  addNotePlaceholder: string;
  searchNotePlaceholder: string;
  searchNoteInput: string;
};

type TAppTheme = {
  color: TAppThemeColors;
  sizes: TAppThemeSizes;
};

type TAppThemes = {
  dark: TAppTheme;
  light: TAppTheme;
};

const sizes: TAppThemeSizes = {
  appBarTitle: 40,
  noteCardTitle: 24,
  noteCardDate: 12,
  addNoteTitle: 24,
  addNoteMessage: 14,
  addNoteInput: 16,
  searchNoteInput: 16,
};

export const themes: TAppThemes = {
  dark: {
    color: {
      appBar: "#252525",
      appBarTitle: "#fff",
      bg: "#252525",
      bgVariant: "#3b3b3b",
      icon: "#fff",
      noteCard: "#ffcc80",
      noteCardActionsSection: "#ffc061",
      noteCardTitle: "#252525",
      noteCardDate: "#00000066",
      addNoteTitle: "#fff",
      addNoteMessage: "#ffffffb3",
      addNoteInput: "#fff",
      actionText: "#fff",
      editNote: "#fff",
      addNotePlaceholder: "#ffffffb3",
      searchNoteInput: "#fff",
      searchNotePlaceholder: "#ffffffb3",
    },
    sizes,
  },
  light: {
    color: {
      appBar: "#fff",
      appBarTitle: "#3b3b3b",
      bg: "#fff",
      bgVariant: "#ebebeb",
      icon: "#3b3b3b",
      noteCard: "#ffcc80",
      noteCardActionsSection: "#ffc061",
      noteCardTitle: "#252525",
      noteCardDate: "#00000066",
      addNoteTitle: "#3b3b3b",
      addNoteMessage: "#00000066",
      addNoteInput: "#3b3b3b",
      actionText: "#3b3b3b",
      editNote: "#3b3b3b",
      addNotePlaceholder: "00000066",
      searchNoteInput: "#3b3b3b",
      searchNotePlaceholder: "00000066",
    },
    sizes,
  },
};

export function useTheme() {
  const isDarkMode = useColorScheme() === "dark";

  return themes[isDarkMode ? "dark" : "light"];
}
