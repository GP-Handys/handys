import { Alert } from "react-native";
import { loginUser } from "../../api/UserApi";
import STRINGS from "../../strings/strings";
import { StackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function signin(
  email: string,
  password: string,
  navigation: NativeStackNavigationProp<StackParamList>
) {
  email = email.toLowerCase();
  let emailReg = STRINGS.emailRegex;

  if (!emailReg.test(email)) {
    Alert.alert(STRINGS.failPopUp, STRINGS.invalidEmail);
  } else if (password.length < 8) {
    Alert.alert(STRINGS.failPopUp, STRINGS.invalidPassword);
  } else {
    loginUser({
      email: email,
      password: password,
    })
      .then(async (result: any) => {
        const message = result.data;
        if (result.status == 200) {
          await AsyncStorage.setItem("Authorization", message);
          navigation.navigate("MainScreensContainer");
        } else {
          Alert.alert(STRINGS.failPopUp, message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
