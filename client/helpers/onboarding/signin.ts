import { Alert } from "react-native";
import { loginUser } from "../../api/UserApi";
import STRINGS from "../../strings/strings";

export default function signin(email: string, password: string): string {
  email = email.toLowerCase();
  let emailReg = STRINGS.emailRegex;
  if (!email.match(emailReg)) {
    Alert.alert(STRINGS.failPopUp, STRINGS.invalidEmail);
  } else if (password.length < 8) {
    Alert.alert(STRINGS.failPopUp, STRINGS.invalidPassword);
  } else {
    loginUser({
      email: email,
      password: password,
    })
      .then((result: any) => {
        return result.status == 200 ? result.data : "";
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return "";
}
