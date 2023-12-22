import { Alert } from "react-native";
import STRINGS from "../../strings/strings";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../components/navigation/NavigationStack";
import { EditProfile } from "../../api/UserApi";

interface Profile {
  name: string;
  password?: string;
  pfp_url: string | null;
}

export default function EditProfileHelper(
  name: string,
  Password: string,
  ConfirmPassword: string,
  pfp_url: string | null,
  userId: number,
  navigation: NativeStackNavigationProp<StackParamList>
) {
  
  if (Password != ConfirmPassword) {
    Alert.alert(STRINGS.failPopUp, STRINGS.passwordDontMatch);
  } else if (Password.length < 8 && Password.length!=0) {
    Alert.alert(STRINGS.failPopUp, STRINGS.invalidPassword);
  } else {
    let data: Profile = {
      name: name,
      password: Password,
      pfp_url: pfp_url,
    };

    if (Password == "") {
      delete data.password;
    }
    console.log("hi");
    
    EditProfile(
      data,
      userId
    )
      .then((result: any) => {
        console.log("hi");

        const message = result.data;
        const title = result.status == 200 ? "Yay!" : "Oops";
        Alert.alert(title, message);
        navigation.pop();
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
