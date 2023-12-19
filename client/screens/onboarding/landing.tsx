import React from "react";
import { Image, StyleSheet, View, Text, Pressable } from "react-native";
import { CommonBackgroundWithNoSafeArea } from "../../common/background";
import Logo from "../../components/HandysLogo";
import STRINGS from "../../strings/strings";
import COLORS from "../../common/colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../components/navigation/NavigationStack";

type StackProps = NativeStackScreenProps<StackParamList>;

export default function Landing({ navigation }: StackProps) {
  return (
    <CommonBackgroundWithNoSafeArea>
      <View style={styles.imagesContainer}>
        <Image
          style={{ width: "100%" }}
          source={require("../../assets/landing.png")}
        />
        <View style={styles.logo}>
          <Logo />
        </View>
      </View>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcome}>{STRINGS.welcome}</Text>
      </View>
      <View style={styles.pressableContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.signInPressable,
            {
              opacity: pressed ? 0.6 : 1,
            },
          ]}
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <Text
            style={{ color: "#202525", fontWeight: "bold", fontSize: 18.44 }}
          >
            {STRINGS.signIn}
          </Text>
        </Pressable>
      </View>
      <View style={styles.pressableContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.signUpPressable,
            {
              opacity: pressed ? 0.6 : 1,
            },
          ]}
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={{ color: "#FFFF", fontWeight: "bold", fontSize: 18.44 }}>
            {STRINGS.signUp}
          </Text>
        </Pressable>
      </View>
    </CommonBackgroundWithNoSafeArea>
  );
}

const styles = StyleSheet.create({
  imagesContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    marginTop: 15,
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
  pressableContainer: {
    marginHorizontal: 38,
  },
  signInPressable: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    height: 41,
    backgroundColor: COLORS.CTAButtonBackground,
    borderRadius: 8,
  },
  signUpPressable: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    height: 41,
    borderWidth: 2,
    borderColor: COLORS.handysGrey,
    borderRadius: 8,
  },
});