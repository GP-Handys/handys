import { View, StyleSheet } from "react-native";

interface Props {
  marginHorizontal: number;
}

export default function ThematicBreak({ marginHorizontal }: Props) {
  return (
    <View style={[styles.line, { marginHorizontal: marginHorizontal }]}></View>
  );
}

const styles = StyleSheet.create({
  line: {
    borderBottomColor: "#FFFFFA40",
    borderWidth: 1,
  },
});
