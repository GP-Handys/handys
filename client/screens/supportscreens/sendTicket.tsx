import React, { useState, useEffect } from "react";
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { CommonBackgroundWithNoSafeArea } from "../../common/background";
import { Entypo } from "@expo/vector-icons";
import COLORS from "../../common/colors";
import validator from "validator"; // For email validation

export default function SendTicket() {
  const [inputValues, setInputValues] = useState({
    email: "",
    subject: "",
    message: ""
  });

  const isButtonEnabled =
    inputValues.email.trim().length > 0 &&
    validator.isEmail(inputValues.email) &&
    inputValues.subject.trim().length > 0 &&
    inputValues.message.trim().length > 0;

  const handleInputChange = (key: any, value: any) => {
    setInputValues({ ...inputValues, [key]: value });
  };

  const isValidEmail = validator.isEmail(inputValues.email) && inputValues.email.trim()!== null;

  return (
    <CommonBackgroundWithNoSafeArea>
      <KeyboardAvoidingView
        style={styles.mainContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 150}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.upperContainer}>
            <Entypo name="ticket" size={100} color="white" />
            <Text style={styles.textTitle}>
              Fill the form below and we will get back to you soon :)
            </Text>
          </View>

          <View style={styles.inputsContainer}>
            <Text style={styles.note}>
              *We will use your Handy's email if you leave this field empty.
            </Text>

            <TextInput
              style={styles.input}
              placeholder="E-mail (optional)"
              placeholderTextColor={COLORS.textInputPlaceholder}
              onChangeText={(inputValue) =>
                handleInputChange("email", inputValue)
              }
              keyboardType="email-address"
            />
            {isValidEmail ? null : (
              <Text style={styles.emailError}>*Invalid email address</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Subject"
              placeholderTextColor={COLORS.textInputPlaceholder}
              onChangeText={(inputValue) =>
                handleInputChange("subject", inputValue)
              }
            />

            <TextInput
              style={styles.textArea}
              placeholder="Message"
              placeholderTextColor={COLORS.textInputPlaceholder}
              onChangeText={(inputValue) =>
                handleInputChange("message", inputValue)
              }
              multiline={true}
            />
          </View>

          <View style={{ marginBottom: 10, marginHorizontal: 10 }}>
            {!isButtonEnabled ? (
              <Pressable disabled={true} style={styles.signUpPressableDisabled}>
                <Text
                  style={{ color: "black", fontWeight: "600", fontSize: 16 }}
                >
                  Confirm
                </Text>
              </Pressable>
            ) : (
              <Pressable
                style={({ pressed }) => [
                  styles.signUpPressable,
                  {
                    opacity: pressed ? 0.6 : 1
                  }
                ]}
              >
                <Text
                  style={{ color: "black", fontWeight: "600", fontSize: 16 }}
                >
                  Confirm
                </Text>
              </Pressable>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </CommonBackgroundWithNoSafeArea>
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
    fontSize: 20,
    textAlign: "center"
  },
  signUpPressable: {
    backgroundColor: COLORS.CTAButtonBackground,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 8
  },
  signUpPressableDisabled: {
    backgroundColor: COLORS.CTAButtonBackground,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 8,
    opacity: 0.5
  },
  input: {
    color: "#ABABAB",
    padding: 15,
    fontSize: 15,
    fontWeight: "600",
    backgroundColor: COLORS.handysGrey,
    alignItems: "center",
    height: 50,
    borderRadius: 6,
    marginHorizontal: 20,
    marginBottom: 12,
    marginTop: 1
  },
  textArea: {
    color: "#ABABAB",
    padding: 15,
    backgroundColor: COLORS.handysGrey,
    height: 100,
    borderRadius: 6,
    marginTop: 2,
    marginHorizontal: 20,
    fontSize: 15,
    fontWeight: "600",
    textAlignVertical: "top"
  },
  inputsContainer: {
    marginTop: 10,
    flex: 1
  },
  note: {
    alignSelf: "center",
    fontSize: 11.5,
    fontWeight: "600",
    color: COLORS.textInputPlaceholder,
    alignItems: "center"
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between"
  },
  emailError: {
    color: "red",
    marginLeft: 20
  }
});
