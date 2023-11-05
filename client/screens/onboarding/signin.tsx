import { StyleSheet, View, Text, Pressable, Keyboard } from "react-native";
import Logo from "../../components/logo";
import { CommonBackgroundWithSafeArea } from "../../common/background";
import ThematicBreak from "../../components/thematic-break";
import STRINGS from "../../strings/strings";
import COLORS from "../../common/colors";
import { TextInput } from "react-native-paper";
import { useState } from "react";

export default function SignIn() {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);
  const [icon, setIcon] = useState("eye-off");

  return (
    <CommonBackgroundWithSafeArea>
      <View style={styles.logo}>
        <Logo />
      </View>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcome}>{STRINGS.welcome}</Text>
      </View>
      <View style={styles.thematicBreakContainer}>
        <ThematicBreak marginHorizontal={38} />
      </View>
      <TextInput
        style={[styles.commonTextInput, styles.name]}
        placeholder="Name"
        textColor="white"
        placeholderTextColor={"#FFFFFF80"}
        selectionColor="white"
        activeUnderlineColor="transparent"
        left={<TextInput.Icon icon="account" color={"white"} />}
      />
      <TextInput
        style={[styles.commonTextInput, styles.email]}
        placeholder="Email"
        textColor="white"
        placeholderTextColor={"#FFFFFF80"}
        selectionColor="white"
        activeUnderlineColor="transparent"
        left={<TextInput.Icon icon="email" color={"white"} />}
      />
      <TextInput
        style={[styles.commonTextInput, styles.password]}
        placeholder="Password"
        textColor="white"
        placeholderTextColor={"#FFFFFF80"}
        selectionColor="white"
        activeUnderlineColor="transparent"
        left={<TextInput.Icon icon="lock" color={"white"}/>}
        secureTextEntry={isSecureTextEntry}
        right={
          <TextInput.Icon
            icon={icon}
            color={"white"}
            onPress={() => {
              Keyboard.dismiss();
              setIsSecureTextEntry(toggleIsSecureTextEntry(isSecureTextEntry));
              setIcon(toggleEyeIcon(icon));
            }}
          />
        }
      />
      <View style={styles.pressableContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.signUpPressable,
            {
              opacity: pressed ? 0.6 : 1,
            },
          ]}
        >
          <Text style={{ color: "black", fontWeight: "bold", fontSize: 18.44 }}>
            {STRINGS.signUp}
          </Text>
        </Pressable>
      </View>
    </CommonBackgroundWithSafeArea>
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
  thematicBreakContainer: {
    marginTop: 14,
  },
  commonTextInput: {
    backgroundColor: COLORS.handysGrey,
    marginHorizontal: 30,
    marginTop: 31,
    color: "FFFFFF",
    height: 44,
    borderRadius: 9,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
  },
  name: {
    marginTop: 31,
  },
  email: {
    marginTop: 14,
  },
  password: {
    marginTop: 14,
  },
  pressableContainer: {
    marginHorizontal: 38,
  },
  signUpPressable: {
    backgroundColor: COLORS.CTAButtonBackground,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    height: 41,
    borderRadius: 8,
  },
});

function toggleIsSecureTextEntry(isSecureTextEntry: boolean): boolean {
  return isSecureTextEntry ? false : true;
}

function toggleEyeIcon(icon: string): string {
  return icon == "eye-off" ? "eye" : "eye-off";
}
