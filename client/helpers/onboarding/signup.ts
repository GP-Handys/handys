import { Alert } from "react-native";
import { signupUser } from "../../api/UserApi";
import STRINGS from "../../strings/strings";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../components/navigation/NavigationStack";

export default function signup(
  email: string,
  password: string,
  ConfirmPassword:string,
  name: string,
  navigation: NativeStackNavigationProp<StackParamList>
  
) {
  email = email.toLowerCase();
  let emailReg = STRINGS.emailRegex;

  if (name.length < 3) {
    Alert.alert(STRINGS.failPopUp, STRINGS.invalidName);
  } else if (!emailReg.test(email)) {
    Alert.alert(STRINGS.failPopUp, STRINGS.invalidEmail);
  } else if (password.length < 8) {
    Alert.alert(STRINGS.failPopUp, STRINGS.invalidPassword);
  } else if (password!=ConfirmPassword) {
    Alert.alert(STRINGS.failPopUp, STRINGS.passwordDontMatch);
  }else {
    signupUser({
      name: name,
      email: email,
      password: password,
    })
      .then((result: any) => {
        const message = result.data;
        const title = result.status == 200 ? "Yay!" : "Oops";
        Alert.alert(title, message);
        if (result.status == 200) {
          navigation.navigate("SignIn");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
