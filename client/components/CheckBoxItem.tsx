import Checkbox from "expo-checkbox";
import { View, Text, StyleSheet } from "react-native";
import COLORS from "../common/colors";

interface CheckBoxItemProps {
  label: string;
  state: any;
  setState: any;
}

export default function CheckBoxItem({
  label,
  state,
  setState,
}: CheckBoxItemProps) {
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <Text style={styles.categoryLabel}>{label}</Text>
      <Checkbox
        value={state}
        onValueChange={setState}
        color={state ? COLORS.CTAButtonBackground : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  categoryLabel: {
    marginRight: 5,
    color: "white",
    fontWeight: "bold",
  },
});
