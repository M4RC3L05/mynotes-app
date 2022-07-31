import React, { useCallback, useMemo } from "react";
import { ActivityIndicator, useColorScheme, View } from "react-native";
import RNWebView from "react-native-webview";
import Showdown from "showdown";

import { renderMDPreview } from "../../utils/rendering";
import { useTheme } from "../theme/theme";

const mdToHtml = new Showdown.Converter({ ghCodeBlocks: true, strikethrough: true, tasklists: true, underline: true });
mdToHtml.setFlavor("github");

function MarkdownRenderer({ markdown }: React.PropsWithoutRef<{ markdown: string }>) {
  const theme = useTheme();
  const isDarkMode = useColorScheme() === "dark";
  const requestHandler = useCallback(() => false, []);
  const webViewSource = useMemo(
    () => ({ html: renderMDPreview(mdToHtml.makeHtml(markdown), theme.color.bg, theme.color.bgVariant) }),
    [markdown, theme.color.bg, theme.color.bgVariant],
  );

  return (
    <RNWebView
      nestedScrollEnabled
      incognito
      startInLoadingState
      style={{ flex: 1, backgroundColor: theme.color.bg }}
      allowsLinkPreview={false}
      containerStyle={{ flex: 1 }}
      source={webViewSource}
      forceDarkOn={isDarkMode}
      javaScriptEnabled={false}
      renderLoading={() => (
        <View style={{ flex: 1 }}>
          <ActivityIndicator size="large" />
        </View>
      )}
      onShouldStartLoadWithRequest={requestHandler}
    />
  );
}

export default MarkdownRenderer;
