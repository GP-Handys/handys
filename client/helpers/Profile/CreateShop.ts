import { Alert } from "react-native";
import { createShop } from "../../api/ShopApi";
import STRINGS from "../../strings/strings";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../components/navigation/NavigationStack";

export default function CreateShop(
  name: string,
  socialMediaLink: string | null,
  bio: string | null,
  pfp_url: string | null,
  navigation: NativeStackNavigationProp<StackParamList>,
  phone_number: any
) {
  let PhoneReg = STRINGS.phoneValidator;

  if (name.length == 0) {
    Alert.alert(STRINGS.failPopUp, "You should enter name");
  } else if (!PhoneReg.test(String(phone_number))) {
    Alert.alert(STRINGS.failPopUp, "You should valid phone number");
  } else {
    createShop({
      name: name,
      socialMediaLink: socialMediaLink,
      bio: bio,
      pfp_url: pfp_url,
      phone_number: phone_number,
    })
      .then((result: any) => {
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
