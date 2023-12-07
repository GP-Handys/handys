import {
  View,
  Pressable,
  Text,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { CommonBackgroundWithNoSafeArea } from "../../common/background";
import COLORS from "../../common/colors";

export default function choose() {
  return (
    <CommonBackgroundWithNoSafeArea>

      <View style={styles.supportContainer}>
        <MaterialIcons name="support-agent" size={100} color="white" />
        <Text style={styles.textIcon}>Choose an Option</Text>
      </View>

      <View style={{ marginTop: 70, marginHorizontal: 30, }}>
        <Pressable
          onPress={() => {}}
          style={({ pressed }) => [
            styles.signUpPressable,
            {
              opacity: pressed ? 0.6 : 1
            },
          ]}
        >
          <Text style={{ color: "white", fontWeight: "600", fontSize: 16 }}>
            View Tickets
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {}}
          style={({ pressed }) => [
            styles.signUpPressable,
            {
              opacity: pressed ? 0.6 : 1
            }
          ]}
        >
          <Text style={{ color: "white", fontWeight: "600", fontSize: 16 }}>
            Send Tickets
          </Text>
        </Pressable>

      </View>
    </CommonBackgroundWithNoSafeArea>
  );
}

const styles = StyleSheet.create({
  textIcon: {
    marginTop: 10,
    color: "white",
    fontWeight: "500",
    fontSize: 20
  },
  supportContainer: {
    marginTop: 80,
    alignItems: "center"
  },
  signUpPressable: {
    backgroundColor: COLORS.handysGrey,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 8,
    marginTop:15,
  }
});
