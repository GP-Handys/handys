import { Alert } from "react-native";
import STRINGS from "../../strings/strings";
import { StackParamList } from "../../components/navigation/NavigationStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { confirmOrder } from "../../api/OrderApi";

export default function checkoutHelper(
  street_name: string,
  apt_number: string,
  floor: string,
  phone_number: number,
  price: number,
  navigation: NativeStackNavigationProp<StackParamList>
) {
  let phoneReg = STRINGS.phoneValidator;

  if (!phoneReg.test(String(phone_number))) {
    Alert.alert(STRINGS.failPopUp, "You have to enter valid phone number");
  } else if (street_name.length == 0) {
    Alert.alert(STRINGS.failPopUp, "You have to enter street name");
  } else if (floor.length == 0) {
    Alert.alert(STRINGS.failPopUp, "You have to enter the floor");
  } else if (apt_number.length == 0) {
    Alert.alert(STRINGS.failPopUp, "You have to enter apartment number");
  } else {
    confirmOrder({ street_name, apt_number, floor, phone_number, price });
    navigation.navigate("DonePlaceOrder");
  }
}
