import { Alert } from "react-native";
import { signupUser } from "../../api/UserApi";
import STRINGS from "../../strings/strings";

export default function signup(email: string, password: string, name: string) {
  email = email.toLowerCase();
  let emailReg = STRINGS.emailRegex;

  if (!email.match(emailReg)) {
    Alert.alert(STRINGS.failPopUp, STRINGS.invalidEmail);
  } else if (password.length < 8) {
    Alert.alert(STRINGS.failPopUp, STRINGS.invalidPassword);
  } else if (name.length < 3) {
    Alert.alert(STRINGS.failPopUp, STRINGS.invalidName);
  } else {
    signupUser({
      name: name,
      email: email,
      password: password,
    })
      .then((result: any) => {
        const message = result.data;
        const title = result.status == 200 ? "Yay!" : "Oops";
        Alert.alert(title, message);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
