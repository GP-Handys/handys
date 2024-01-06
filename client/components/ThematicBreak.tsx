import { StyleSheet } from "react-native";
import { Divider } from "react-native-paper";
import COLORS from "../common/colors";

interface Props {
  marginHorizontal?: number;
  verticalHorizontal?: number;
}

export default function ThematicBreak({ marginHorizontal ,verticalHorizontal}: Props) {
  return (
    <Divider
      style={[styles.line, { marginHorizontal: marginHorizontal ,marginVertical:verticalHorizontal}]}
    ></Divider>
  );
}

const styles = StyleSheet.create({
  line: {
    backgroundColor: COLORS.DividerColor,
    height: 2,
  },
});
