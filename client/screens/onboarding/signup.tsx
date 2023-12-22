import { StyleSheet, View, Text, Pressable, Keyboard, KeyboardAvoidingView } from "react-native";
import { CommonBackgroundWithSafeArea, CommonScrollableBackground } from "../../common/background";
import STRINGS from "../../strings/strings";
import COLORS from "../../common/colors";
import CustomTextInput from "../../components/CustomTextInput";
import { TextInput } from "react-native-paper";
import { useState } from "react";
import OnboardingHeader from "../../components/OnboardingHeader";
import toggleEyeIcon from "../../helpers/toggle/toggleEyeIcon";
import toggleIsSecureTextEntry from "../../helpers/toggle/toggleIsSecureTextEntry";
import signup from "../../helpers/onboarding/signup";
import { StackProps } from "../../components/navigation/NavigationStack";

export default function SignUp({ navigation }: StackProps) {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);
  const [icon, setIcon] = useState("eye-off");
  const [isSecureTextEntry2, setIsSecureTextEntry2] = useState(true);
  const [icon2, setIcon2] = useState("eye-off");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  function handleSignUp() {
    signup(email, password,ConfirmPassword, name, navigation);
  }

  return (
    <CommonScrollableBackground>
      <OnboardingHeader />
      <View style={{ marginTop: 31, marginHorizontal: 30 }}>
        <CustomTextInput
          placeholder="Name"
          left={<TextInput.Icon icon="account" color={"white"} />}
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={{ marginTop: 14, marginHorizontal: 30 }}>
        <CustomTextInput
          placeholder="Email"
          left={<TextInput.Icon icon="email" color={"white"} />}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={{ marginTop: 14, marginHorizontal: 30 }}>
        <CustomTextInput
          placeholder="Password"
          isSecureTextEntry={isSecureTextEntry}
          value={password}
          onChangeText={(text) => setPassword(text)}
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
      <View style={{ marginTop: 14, marginHorizontal: 30 }}>
        <CustomTextInput
          placeholder="Confirm Password"
          isSecureTextEntry={isSecureTextEntry2}
          value={ConfirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          left={<TextInput.Icon icon="lock" color={"white"} />}
          right={
            <TextInput.Icon
              icon={icon2}
              color={"white"}
              onPress={() => {
                Keyboard.dismiss();
                setIsSecureTextEntry2(
                  toggleIsSecureTextEntry(isSecureTextEntry2)
                );
                setIcon2(toggleEyeIcon(icon2));
              }}
            />
          }
        />
      </View>

      <View style={{ marginHorizontal: 38 }}>
        <Pressable
          onPress={handleSignUp}
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
    </CommonScrollableBackground>
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
