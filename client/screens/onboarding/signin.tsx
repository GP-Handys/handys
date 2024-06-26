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
import signin from "../../helpers/onboarding/signin";
import { StackProps } from "../../components/navigation/NavigationStack";

export default function SignIn({ navigation }: StackProps) {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);
  const [icon, setIcon] = useState("eye-off");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    signin(email, password, navigation);
  };

  return (
    <CommonBackgroundWithSafeArea>
      <OnboardingHeader />
      <View style={{ marginTop: 31, marginHorizontal: 30 }}>
        <CustomTextInput
          placeholder="Email"
          left={<TextInput.Icon icon="email" color={"#854627"} />}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={{ marginTop: 14, marginHorizontal: 30 }}>
        <CustomTextInput
          placeholder="Password"
          isSecureTextEntry={isSecureTextEntry}
          left={<TextInput.Icon icon="lock" color={COLORS.brown} />}
          value={password}
          onChangeText={(text) => setPassword(text)}
          right={
            <TextInput.Icon
              icon={icon}
              color={(COLORS.brown)}
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
      <View style={{ marginHorizontal: 38 }}>
        <Pressable
          onPress={handleLogin}
          style={({ pressed }) => [
            styles.signInPressable,
            {
              opacity: pressed ? 0.6 : 1,
            },
          ]}
        >
          <Text style={{ color: "#FFFFFF", fontWeight: "500", fontSize: 18.44 }}>
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
  signInPressable: {
    backgroundColor: COLORS.CTAButtonBackground,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    height: 41,
    borderRadius: 8,
    fontWeight: "bold"
  },
});
