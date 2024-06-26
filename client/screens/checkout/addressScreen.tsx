import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import MapScreen from "../../components/map/MapScreen";
import { CommonBackgroundWithSafeArea } from "../../common/background";
import COLORS from "../../common/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackProps } from "../../components/navigation/NavigationStack";
import CustomTextInput from "../../components/CustomTextInput";
import { FontAwesome5 } from "@expo/vector-icons";
import checkoutHelper from "../../helpers/checkout/checkoutHelper";

const AddressScreen = ({ route }: any) => {
  const { governorate, street, totalAmount } = route.params;
  const [streetName, setStreetName] = useState(street);
  const [apartment, setApartment] = useState("");
  const [floor, setFloor] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<any>();
  const [buildingNumber, setBuildingNumber] = useState<any>();
  const [instructions, setInstructions] = useState<any>();
  const navigation = useNavigation<StackProps["navigation"]>();
  let DELIVREY_FEE = parseInt("5");
  let serviceFee = parseFloat((totalAmount * 0.03).toFixed(2));
  let grandTotal = parseFloat(totalAmount + serviceFee + DELIVREY_FEE);
  const [disableClick , setDisableClick] = useState(false);


  function handleConfirm() {
    setDisableClick(true)
    checkoutHelper(
      streetName,
      apartment,
      floor,
      phoneNumber,
      grandTotal,
      buildingNumber,
      instructions,
      navigation,
      setDisableClick
    );
  }

  return (
    <CommonBackgroundWithSafeArea>
      <ScrollView>
        <View>
          <MapScreen />
        </View>
        <View style={styles.areaView}>
          <View style={styles.firstSection}>
            <View style={{ margin: 10, height: 60 }}>
              <MaterialIcons name="location-pin" size={20} color="#522C19" />
            </View>
            <View>
              <Text style={styles.area}>Area</Text>
              <Text style={styles.details}>
                {governorate}, {street}
              </Text>
            </View>
          </View>
          <View style={styles.secondSection}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={styles.change}>change</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputsContainer}>
          <CustomTextInput
            placeholder="Street Name"
            value={streetName}
            onChangeText={(StreetName) => setStreetName(StreetName)}
          />
          <View style={styles.row}>
            <CustomTextInput
              style={{flexGrow:1}}
              placeholder="Apt. Number"
              value={apartment}
              onChangeText={(Apartment) => setApartment(Apartment)}
            />
            <CustomTextInput
              style={{flexGrow:2,}}
              placeholder="Floor"
              value={floor}
              onChangeText={(Floor) => setFloor(Floor)}
            />
          </View>
          <CustomTextInput
            style={{ marginTop: 10 }}
            placeholder={"Phone Number | 07********"}
            onChangeText={(phone_number) => setPhoneNumber(phone_number)}
            value={phoneNumber}
            maxLength={10}
            mode={"tel"}
          />
          <CustomTextInput
            style={{ marginTop: 10 }}
            placeholder={"Buliding Number"}
            onChangeText={(buildingNumber) => setBuildingNumber(buildingNumber)}
            value={buildingNumber}
            maxLength={10}
          />
          <CustomTextInput
            style={{ marginTop: 10 }}
            placeholder={"special Instructions"}
            onChangeText={(Instructions) => setInstructions(Instructions)}
            value={instructions}
            multiline={true}

          />
        </View>
        <View style={styles.paymentContainer}>
          <View style={styles.paymentRows}>
            <FontAwesome5 name="money-check-alt" size={18} color="#522C19" />
            <Text style={styles.paymentSummaryWord}>Payment Summary</Text>
          </View>
          <View style={styles.paymentRows}>
            <Text style={styles.title}>Subtotal</Text>
            <Text style={styles.titlePrice}>JOD {totalAmount}</Text>
          </View>
          <View style={styles.paymentRows}>
            <Text style={styles.title}>Service Fee</Text>
            <Text style={styles.titlePrice}>JOD {serviceFee}</Text>
          </View>
          <View style={styles.paymentRows}>
            <Text style={styles.title}>Delivery fee</Text>
            <Text style={styles.titlePrice}>JOD {DELIVREY_FEE}</Text>
          </View>
          <View style={styles.paymentRows}>
            <Text style={styles.grandTotalTitle}>Grand Total</Text>
            <Text style={styles.grandTotalPrice}>JOD {grandTotal}</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={handleConfirm} disabled={disableClick}> 
            <View style={[styles.button,{backgroundColor: disableClick ? COLORS.disabledButtom : COLORS.CTAButtonBackground}]}>
              <Text style={styles.confirm}>Confirm</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </CommonBackgroundWithSafeArea>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  areaView: {
    height: 60,
    width: "90%",
    alignSelf: "center",
    marginTop: 25,
    borderRadius: 7.5,
    backgroundColor: COLORS.handysGrey,
    flexDirection: "row"
  },
  firstSection: {
    width: "75%",
    height: 60,
    flexDirection: "row"
  },
  area: {
    fontSize: 16,
    color: COLORS.normalText,
    marginTop: 10,
    fontWeight: "500"
  },
  details: {
    fontSize: 12,
    color: "#966448",
    fontWeight: "500"
  },
  secondSection: {
    justifyContent: "center",
    alignItems: "center",
    width: "25%",
    height: 60
  },
  change: {
    fontSize: 14,
    color: COLORS.normalText,
    fontWeight: "500"
  },
  confirm: {
    color: "white",
    fontWeight: "500",
    fontSize: 20
  },
  inputsContainer: {
    width: "90%",
    alignSelf: "center",
    marginVertical: 20
  },
  row: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
    gap:20
  },
  paymentContainer: {
    
    marginTop: 10,
    padding: 15,
    height: 140,
    width: "90%",
    alignSelf: "center",
    borderRadius: 7.5,
    backgroundColor: COLORS.handysGrey,
    justifyContent:"space-between"
  },
  paymentRows: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
    justifyContent:"space-between"
  },
  title: {
    color: COLORS.normalText,
    fontSize: 12,
    fontWeight: "500",
  },
  titlePrice: {
    color: COLORS.normalText,
    fontSize: 12,
    fontWeight: "500",
    textAlign: "right"
  },
  paymentSummaryWord: {
    fontSize: 14,
    marginLeft: 10,
    fontWeight: "500",
    color: COLORS.normalText
  },
  grandTotalTitle: {
    marginTop: 5,
    color: COLORS.normalText,
    fontSize: 14,
    fontWeight: "700",
  },
  grandTotalPrice: {
    marginTop: 5,
    color: COLORS.normalText,
    fontSize: 14,
    fontWeight: "800",
    textAlign: "right"
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    height: 50,
    borderRadius: 8,
    width: "90%",
    marginVertical: 20
  }
});

export default AddressScreen;
