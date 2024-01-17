import { Alert } from "react-native";
import STRINGS from "../../strings/strings";
import { StackParamList } from "../../components/navigation/NavigationStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { confirmOrder } from "../../api/OrderApi";

export default async function checkoutHelper(
  street_name: string,
  apt_number: string,
  floor: string,
  phone_number: number,
  price: number,
  buildingNumber:string,
  instructions:string,
  navigation: NativeStackNavigationProp<StackParamList>,
  setDisableClick:any
) {
  let phoneReg = STRINGS.phoneValidator;

  if (!phoneReg.test(String(phone_number))) {
    Alert.alert(STRINGS.failPopUp, "You have to enter valid phone number");
    setDisableClick(false)
  } else if (street_name.length == 0) {
    Alert.alert(STRINGS.failPopUp, "You have to enter street name");
    setDisableClick(false)
  } else if (floor.length == 0) {
    Alert.alert(STRINGS.failPopUp, "You have to enter the floor");
    setDisableClick(false)
  } else if (buildingNumber.length == 0) {
    Alert.alert(STRINGS.failPopUp, "You have to enter the building number");
    setDisableClick(false)
  } else if (apt_number.length == 0) {
    Alert.alert(STRINGS.failPopUp, "You have to enter apartment number");
    setDisableClick(false)
  } else {
    await confirmOrder({ street_name, apt_number, floor, phone_number, price,buildingNumber,instructions });
    navigation.navigate("DonePlaceOrder");
  }
}
