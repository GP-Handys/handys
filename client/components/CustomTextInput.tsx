import { ReactNode } from "react";
import { TextInput } from "react-native-paper";
import COLORS from "../common/colors";
import { StyleSheet, StyleProp, TextStyle } from "react-native";
interface Props {
  placeholder: string;
  left?: ReactNode;
  right?: ReactNode;
  isSecureTextEntry?: boolean;
  value?: string;
  onChangeText?: ((text: string) => void) & Function;
  maxLength?: number;
  multiline?: boolean;
  minHeight?: number;
  maxHeight?: number;
  bgColor?: string;
  mode?: any;
  style?: StyleProp<TextStyle>;
  defaultValue?:string;
  returnKeyType?:any;
  onSubmitEditing?:any;
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
  minHeight = 44,
  maxHeight = 440,
  bgColor = "#CABEAB",
  mode = "text",
  style,
  defaultValue,
  returnKeyType,
  onSubmitEditing
}: Props) {
  return (
    <TextInput
      style={[
        styles.commonStyle,
        style,
        {
          minHeight: minHeight,
          maxHeight: maxHeight,
          backgroundColor: bgColor,
        },
      ]}
      placeholder={placeholder}
      secureTextEntry={isSecureTextEntry}
      left={left}
      right={right}
      textColor="#522C19"
      placeholderTextColor={COLORS.textInputPlaceholder}
      selectionColor={COLORS.textInputSelection}
      activeUnderlineColor="transparent"
      value={value}
      onChangeText={onChangeText}
      maxLength={maxLength}
      multiline={multiline}
      inputMode={mode}
      underlineStyle={{display:"none"}}
      defaultValue={defaultValue}
      returnKeyType={returnKeyType}
      onSubmitEditing={onSubmitEditing}
      
    />
  );
}

const styles = StyleSheet.create({
  commonStyle: {
    borderColor: "red",
    borderRadius: 9,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    borderBottomLeftRadius: 9,
  },
});
