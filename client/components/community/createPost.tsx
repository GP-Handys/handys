import { View, StyleSheet, TouchableOpacity } from "react-native";
import { CommonBackgroundWithNoSafeArea } from "../../common/background";
import { MaterialIcons } from "@expo/vector-icons";

export default function createPostButton() {
  return (
    <CommonBackgroundWithNoSafeArea>
      <View style={styles.Iconbutton}>
        <TouchableOpacity>
          <MaterialIcons name="add-circle" size={50} color="#F6977F" />
        </TouchableOpacity>
      </View>
    </CommonBackgroundWithNoSafeArea>
  );
}

const styles = StyleSheet.create({
  Iconbutton: {
    position: "absolute",
    width: 48,
    height: 48,
    bottom: 25,
    right: 20,
  },

  wtf: {},
});
