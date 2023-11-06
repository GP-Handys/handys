import { View, Text, StyleSheet } from "react-native";
import ThematicBreak from "./ThematicBreak";
import STRINGS from "../strings/strings";
import Logo from "./HandysLogo";

export default function OnboardingHeader() {
  return (
    <View>
      <View style={styles.logo}>
        <Logo />
      </View>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcome}>{STRINGS.welcome}</Text>
      </View>
      <View style={{ marginTop: 14 }}>
        <ThematicBreak marginHorizontal={38} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  welcomeContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },
  welcome: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 13,
  },
});
