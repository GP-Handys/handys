import { ReactNode } from "react";
import { TextInput } from "react-native-paper";
import COLORS from "../common/colors";
import { StyleSheet } from "react-native";

interface Props {
  placeholder: string;
  left?: ReactNode;
  right?: ReactNode;
  isSecureTextEntry?: boolean;
}

export default function CustomTextInput({
  placeholder,
  left,
  right,
  isSecureTextEntry,
}: Props) {
  return (
    <TextInput
      style={styles.commonStyle}
      placeholder={placeholder}
      secureTextEntry={isSecureTextEntry}
      left={left}
      right={right}
      textColor="white"
      placeholderTextColor={COLORS.textInputPlaceholder}
      selectionColor={COLORS.textInputSelection}
      activeUnderlineColor="transparent"
    />
  );
}

const styles = StyleSheet.create({
  commonStyle: {
    backgroundColor: COLORS.handysGrey,
    height: 44,
    borderRadius: 9,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
  },
});
