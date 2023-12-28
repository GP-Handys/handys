import React, { ReactNode } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import COLORS from "./colors";

interface Props {
  children: ReactNode;
}

export function CommonBackgroundWithNoSafeArea({ children }: Props) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.commonContainer}>{children}</View>
    </TouchableWithoutFeedback>
  );
}

export function CommonBackgroundWithSafeArea({ children }: Props) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={[styles.commonContainer, styles.androidSafeArea]}>
        {children}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export function CommonScrollableBackground({ children }: Props) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAwareScrollView style={styles.commonContainer}>
        {children}
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  commonContainer: {
    flex: 1,
    backgroundColor: COLORS.commonBackground,
  },
  androidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
