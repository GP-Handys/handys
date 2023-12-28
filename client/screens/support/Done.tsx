import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { CommonBackgroundWithNoSafeArea } from "../../common/background";
import COLORS from "../../common/colors";
import { StackProps } from "../../components/navigation/NavigationStack";

export default function DoneScreen({ navigation }: StackProps) {
  return (
    <CommonBackgroundWithNoSafeArea>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 40,
            color: "white",
            fontWeight: "600",
            marginBottom: 20,
          }}
        >
          Done!
        </Text>
        <Image
          style={styles.image}
          source={require("../../assets/Done-pana.png")}
        />
        <Text style={styles.textIcon}>We’ll reply to you in your mail.</Text>
      </View>

      <View style={{ marginBottom: 40, marginHorizontal: 10 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Profile");
          }}
          style={styles.okay}
        >
          <Text style={{ color: "black", fontWeight: "600", fontSize: 16 }}>
            Okay!
          </Text>
        </TouchableOpacity>
      </View>
    </CommonBackgroundWithNoSafeArea>
  );
}

const styles = StyleSheet.create({
  textIcon: {
    marginTop: 20,
    color: "white",
    fontWeight: "500",
    fontSize: 20,
  },
  container: {
    flex: 1,
    marginTop: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  okay: {
    backgroundColor: COLORS.CTAButtonBackground,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 8,
    
  },
  image: {
    width: 300,
    height: 300,
  },
});
