import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
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
import { confirmOrder } from "../../api/OrderApi";
import checkoutHelper from "../../helpers/checkout/checkoutHelper";
import { InstanceError } from "sequelize";

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

  function handleConfirm() {
    checkoutHelper(
      streetName,
      apartment,
      floor,
      phoneNumber,
      grandTotal,
      navigation
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
              <MaterialIcons name="location-pin" size={20} color="white" />
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
              <Text style={styles.change}>Change</Text>
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
              style={{ paddingRight: 30 }}
              placeholder="Apt. Number"
              value={apartment}
              onChangeText={(Apartment) => setApartment(Apartment)}
            />
            <CustomTextInput
              style={{ paddingRight: 90 }}
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
            placeholder={"Any Instructions?"}
            onChangeText={(Instructions) => setInstructions(Instructions)}
            value={instructions}
            multiline={true}
          />
        </View>
        <View style={styles.paymentContainer}>
          <View style={styles.paymentRows}>
            <FontAwesome5 name="money-check-alt" size={18} color="white" />
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
          <TouchableOpacity onPress={handleConfirm}>
            <View style={styles.button}>
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
    color: "white",
    marginTop: 10,
    fontWeight: "500"
  },
  details: {
    fontSize: 12,
    color: "#A2A4A4",
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
    color: COLORS.CTAButtonBackground
  },
  confirm: {
    color: "black",
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
    justifyContent: "space-between"
  },
  paymentContainer: {
    marginTop: 10,
    padding: 15,
    height: 140,
    width: "90%",
    alignSelf: "center",
    borderRadius: 7.5,
    backgroundColor: COLORS.handysGrey
  },
  paymentRows: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3
  },
  title: {
    marginLeft: 35,
    color: "white",
    fontSize: 12,
    fontWeight: "500",
    width: 185
  },
  titlePrice: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
    width: 75,
    textAlign: "right"
  },
  paymentSummaryWord: {
    fontSize: 14,
    marginLeft: 10,
    fontWeight: "500",
    color: "white"
  },
  grandTotalTitle: {
    marginTop: 5,
    marginLeft: 33,
    color: "white",
    fontSize: 14,
    fontWeight: "700",
    width: 160
  },
  grandTotalPrice: {
    marginTop: 5,
    color: "white",
    fontSize: 14,
    fontWeight: "800",
    width: 100,
    textAlign: "right"
  },
  button: {
    backgroundColor: COLORS.CTAButtonBackground,
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
