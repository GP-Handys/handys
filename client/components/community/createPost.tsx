import { View, StyleSheet, TouchableOpacity } from "react-native";
import { CommonBackgroundWithNoSafeArea } from "../../common/background";
import { MaterialIcons } from "@expo/vector-icons";

export default function createPostButton() {
  return (
    <CommonBackgroundWithNoSafeArea>
      <View style={styles.Iconbutton}>
        <TouchableOpacity>
          <MaterialIcons name="post-add" size={50} color="#F6977F" />
        </TouchableOpacity>
      </View>
    </CommonBackgroundWithNoSafeArea>
  );
}

const styles = StyleSheet.create({
  Iconbutton: {
    width: 45,
    height: 45,
    position: "absolute",
    top: 540,
    left: 290,
  },

  wtf: {},
});
