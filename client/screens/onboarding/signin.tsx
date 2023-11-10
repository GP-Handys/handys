import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Keyboard,
  Alert,
} from "react-native";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignIn() {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);
  const [icon, setIcon] = useState("eye-off");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    let token = signin(email, password);

    if(token.length!=0){
      AsyncStorage.setItem("Authorization",token)
      //TODO:navigate to home
    }
    else{
      Alert.alert(STRINGS.failPopUp,STRINGS.InvalidCredentials)
    }
  };

  return (
    <CommonBackgroundWithSafeArea>
      <OnboardingHeader />
      <View style={{ marginTop: 31, marginHorizontal: 30 }}>
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
          left={<TextInput.Icon icon="lock" color={"white"} />}
          value={password}
          onChangeText={(text) => setPassword(text)}
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
      <View style={{ marginHorizontal: 38 }}>
        <Pressable
          onPress={handleLogin}
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
