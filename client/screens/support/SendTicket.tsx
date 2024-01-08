


import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,

} from "react-native";
import {
  CommonBackgroundWithNoSafeArea,
  CommonScrollableBackground
} from "../../common/background";
import { Entypo } from "@expo/vector-icons";
import COLORS from "../../common/colors";
import validator from "validator"; // For email validation
import { StackProps } from "../../components/navigation/NavigationStack";
import { submitTicket } from "../../api/TicketApi";
import CustomTextInput from "../../components/CustomTextInput";

export default function SendTicketScreen({ navigation }: StackProps) {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const isButtonEnabled =
    (email.trim().length == 0 || validator.isEmail(email)) &&
    subject.trim().length > 0 &&
    message.trim().length > 0;

  const handleSendticket = () => {
    let data = {
      email: email,
      subject: subject,
      content: message
    };
    submitTicket(data);
    navigation.navigate("DoneScreen");
  };

  return (
    <View style={styles.mainContainer}>
      <CommonScrollableBackground>
        <View style={styles.upperContainer}>
          <Entypo name="ticket" size={100} color="white" />
          <Text style={styles.textTitle}>
            Fill the form below and we will get back to you soon :)
          </Text>
        </View>

        <View style={styles.inputsContainer}>
          <View>
            <Text style={styles.defaultEmail}>
              *We will use your Handy's email if you leave this field empty.
            </Text>
            <CustomTextInput
              placeholder={"Email (optinal)"}
              onChangeText={(inputValue) => setEmail(inputValue)}
            />
          </View>

          <CustomTextInput
            placeholder={"subject"}
            onChangeText={(inputValue) => setSubject(inputValue)}
          />

          <CustomTextInput
            placeholder={"Message"}
            onChangeText={(inputValue) => setMessage(inputValue)}
            multiline={true}
            minHeight={200}
          />
          <View style={{paddingBottom: 50}}>
            {!isButtonEnabled ? (
              <TouchableOpacity
                disabled={true}
                style={styles.confirmPressableDisabled}
              >
                <Text style={styles.confirm}>Confirm</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.confirmPressable}
                onPress={handleSendticket}
              >
                <Text style={styles.confirm}>Confirm</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </CommonScrollableBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  upperContainer: {
    width: 300,
    marginTop: 80,
    marginBottom: 50,
    textAlign: "left",
    alignSelf: "center",
    alignItems: "center"
  },
  textTitle: {
    color: "white",
    marginTop: 10,
    fontWeight: "500",
    fontSize: 25,
    textAlign: "center"
  },
  confirmPressable: {
    backgroundColor: COLORS.CTAButtonBackground,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 8
  },
  confirmPressableDisabled: {
    backgroundColor: COLORS.CTAButtonBackground,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 8,
    opacity: 0.5
  },
  inputsContainer: {
    marginTop: 10,
    gap: 15,
    marginHorizontal: 20
  },
  confirm: {
    color: "black",
    fontWeight: "500",
    fontSize: 20
  },
  defaultEmail: {
    alignSelf: "center",
    color: COLORS.handysGrey,
    fontSize: 13,
    marginBottom: 3
  }
});
