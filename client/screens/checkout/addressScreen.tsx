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

const AddressScreen = ({ route }: any) => {
  const [StreetName, setStreetName] = useState("");
  const [Apartment, setApartment] = useState("");
  const [Floor, setFloor] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const { governorate, street, totalAmount } = route.params;
  const navigation = useNavigation<StackProps["navigation"]>();
  let DELIVREY_FEE = parseInt("2");
  let serviceFee = parseFloat((totalAmount * 0.03).toFixed(2));
  let grandTotal = parseFloat(totalAmount + serviceFee + DELIVREY_FEE);

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
            value={StreetName}
            onChangeText={(StreetName) => setStreetName(StreetName)}
          />
          <View style={styles.row}>
            <CustomTextInput
              style={{ paddingRight: 30 }}
              placeholder="Apt. Number"
              value={Apartment}
              onChangeText={(Apartment) => setApartment(Apartment)}
            />
            <CustomTextInput
              style={{ paddingRight: 90 }}
              placeholder="Floor"
              value={Floor}
              onChangeText={(Floor) => setFloor(Floor)}
            />
          </View>
          <CustomTextInput
            style={{ marginTop: 10 }}
            placeholder={"Phone Number | 07********"}
            onChangeText={(phone_number) => setPhone_number(phone_number)}
            value={phone_number}
            maxLength={10}
            mode={"tel"}
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
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => navigation.navigate("DonePlaceOrder")}
          >
            <Text style={styles.confirm}>Confirm</Text>
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
    height: "30%",
    width: "90%",
    alignSelf: "center",
    marginTop: 25
  },
  row: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between"
  },
  paymentContainer: {
    marginTop: 10,
    padding: 15,
    height: "20%",
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
    marginLeft: "11.5%",
    color: "white",
    fontSize: 12,
    fontWeight: "500",
    width: "64%"
  },
  titlePrice: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
    width: "25%",
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
    marginLeft: "11.5%",
    color: "white",
    fontSize: 14,
    fontWeight: "700",
    width: "64%"
  },
  grandTotalPrice: {
    marginTop: 5,
    color: "white",
    fontSize: 14,
    fontWeight: "800",
    width: "25%",
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
    marginTop: "8%"
  }
});

export default AddressScreen;
