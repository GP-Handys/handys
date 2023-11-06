import { StyleSheet, View, Text, Pressable, Keyboard } from "react-native";
import { CommonBackgroundWithSafeArea } from "../../common/background";
import CustomTextInput from "../../components/CustomTextInput";
import { TextInput } from "react-native-paper";
import { useState } from "react";
import OnboardingHeader from "../../components/OnboardingHeader";
import toggleEyeIcon from "../../helpers/toggle/toggleEyeIcon";
import toggleIsSecureTextEntry from "../../helpers/toggle/toggleIsSecureTextEntry";
import STRINGS from "../../strings/strings";
import COLORS from "../../common/colors";

export default function SignIn() {
    const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);
    const [icon, setIcon] = useState("eye-off");

  return (
    <CommonBackgroundWithSafeArea>
      <OnboardingHeader/>
      <View style={{marginTop: 31, marginHorizontal: 30}}>
        <CustomTextInput
          placeholder="Email"
          left={<TextInput.Icon icon="email" color={"white"} />}
        />
      </View>
      <View style={{marginTop: 14, marginHorizontal: 30}}>
        <CustomTextInput
          placeholder="Password"
          isSecureTextEntry={isSecureTextEntry}
          left={<TextInput.Icon icon="lock" color={"white"} />}
          right={
            <TextInput.Icon
              icon={icon}
              color={"white"}
              onPress={() => {
                Keyboard.dismiss();
                setIsSecureTextEntry(
                  toggleIsSecureTextEntry(isSecureTextEntry)
                );
                setIcon(toggleEyeIcon(icon));
              }}
            />
          }
        />
        </View>
        <View style={{marginHorizontal: 38}}>
        <Pressable
          style={({ pressed }) => [
            styles.signUpPressable,
            {
              opacity: pressed ? 0.6 : 1,
            },
          ]}
        >
          <Text style={{ color: "black", fontWeight: "bold", fontSize: 18.44 }}>
            {STRINGS.signIn}
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
    signUpPressable: {
        backgroundColor: COLORS.CTAButtonBackground,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        height: 41,
        borderRadius: 8,
      },
  });