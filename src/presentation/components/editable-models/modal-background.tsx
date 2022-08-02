import React, { PropsWithChildren } from "react";
import { TouchableWithoutFeedback, View } from "react-native";

export function ModalBackground({
  show = false,
  onDismiss,
  children,
}: PropsWithChildren<{ onDismiss: () => void; show?: boolean }>) {
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
        {children}
      </View>
    </>
  ) : null;
}
