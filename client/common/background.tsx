import React, { ReactNode } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
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
  return <ScrollView style={styles.commonContainer}>{children}</ScrollView>;
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
