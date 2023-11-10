import { Alert } from "react-native";
import { loginUser } from "../../api/UserApi";
import STRINGS from "../../strings/strings";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function signin(email: string, password: string) {
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
      .then((result: any) => {
        const message = result.data;
        result.status == 200
          ? AsyncStorage.setItem("Authorization", message)
          : Alert.alert(STRINGS.failPopUp, message);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
