import { View, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";
import COLORS from "../common/colors";

interface Props {
  marginHorizontal?: number;
}

export default function ThematicBreak({ marginHorizontal }: Props) {
  return (
    <Divider style={[styles.line, { marginHorizontal: marginHorizontal }]}></Divider>
  );
}

const styles = StyleSheet.create({
  line: {
    backgroundColor: COLORS.DividerColor,
    height:2
  },
});
