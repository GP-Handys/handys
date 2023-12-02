import { ReactNode } from "react";
import { TextInput } from "react-native-paper";
import COLORS from "../common/colors";
import { StyleSheet } from "react-native";
interface Props {
  placeholder: string;
  left?: ReactNode;
  right?: ReactNode;
  isSecureTextEntry?: boolean;
  value?: string;
  onChangeText?: ((text: string) => void) & Function;
  maxLength?:number;
  multiline?:boolean
  minHeight?:number
  maxHeight?:number
}

export default function CustomTextInput({
  placeholder,
  left,
  right,
  isSecureTextEntry,
  value,
  onChangeText,
  maxLength,
  multiline,
  minHeight=44,
  maxHeight=440
}: Props) {
  return (
    <TextInput
      style={[styles.commonStyle,{minHeight:minHeight,maxHeight:maxHeight}]}
      placeholder={placeholder}
      secureTextEntry={isSecureTextEntry}
      left={left}
      right={right}
      textColor="white"
      placeholderTextColor={COLORS.textInputPlaceholder}
      selectionColor={COLORS.textInputSelection}
      activeUnderlineColor="transparent"
      value={value}
      onChangeText={onChangeText}
      maxLength={maxLength}
      multiline={multiline}
    />
  );
}

const styles = StyleSheet.create({
  commonStyle: {
    backgroundColor: COLORS.handysGrey,
    borderRadius: 9,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    
  },
});
