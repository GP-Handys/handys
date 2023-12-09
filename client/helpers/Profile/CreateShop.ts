import { Alert } from "react-native";
import { createShop } from "../../api/ShopApi";
import STRINGS from "../../strings/strings";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../components/navigation/NavigationStack";

export default function CreateShop(
  name: string,
  socialMediaLink: string | null,
  bio: string | null,
  pfp_url:string | null,
  navigation: NativeStackNavigationProp<StackParamList>
) {
  if (name.length==0) {
    Alert.alert(STRINGS.failPopUp, "You should enter name");
  } else {
    createShop({
      name: name,
      socialMediaLink: socialMediaLink,
      bio: bio,
      pfp_url:pfp_url
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
