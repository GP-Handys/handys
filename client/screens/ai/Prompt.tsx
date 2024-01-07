import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { CommonScrollableBackground } from "../../common/background";
import COLORS from "../../common/colors";
import CustomTextInput from "../../components/CustomTextInput";
import { AntDesign } from "@expo/vector-icons";

export default function AiPromptScreen() {
  const [prompt, setPrompt] = useState("");

  const isButtonEnabled = prompt.trim().length > 6;

  const handleSendPrompt = () => {
    // navigation.navigate("result");
  };
  var maxLength = 100;
  return (
    <View style={styles.mainContainer}>
      <CommonScrollableBackground>
        <View style={styles.upperContainer}>
          <AntDesign name="rocket1" size={100} color="white" />
          <Text style={styles.textTitle}>
            Use this cutting-edge AI tool to help you visualize your ideas to real products!
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <CustomTextInput
            placeholder={"Type Your Prompt Here.."}
            onChangeText={(inputValue) => setPrompt(inputValue)}
            multiline={true}
            minHeight={200}
            maxLength={100}
          />
          <Text style={styles.counter}>
            {prompt.length}/{maxLength}
          </Text>
          <View>
            <View style={styles.lowerContainer}>
              <Text style={styles.note}>
                *Note: please use words that are related to handcrafts to get
                better results.
              </Text>
              <Text style={styles.note}>eg. Scarfs for babies ages 3 to 12 months old, nitted using blue and pink wool with some star stickers stuck on the scarf. </Text>
            </View>
            {!isButtonEnabled ? (
              <TouchableOpacity
                disabled={true}
                style={styles.confirmPressableDisabled}
              >
                <Text style={styles.confirm}>Generate</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.confirmPressable}
                onPress={handleSendPrompt}
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
  lowerContainer: {
    width: 300,
    marginTop: 10,
    marginBottom: 40,
    textAlign: "left",
    alignSelf: "center",
    alignItems: "center"
  },
  textTitle: {
    color: "white",
    marginTop: 10,
    fontWeight: "400",
    fontSize: 20,
    textAlign: "center"
  },
  note: {
    color: "#C7C9C9",
    marginTop: 10,
    fontWeight: "400",
    fontSize: 14,
    textAlign: "center"
  },
  confirmPressable: {
    backgroundColor: COLORS.CTAButtonBackground,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 8,
    bottom: 0
  },
  confirmPressableDisabled: {
    backgroundColor: COLORS.CTAButtonBackground,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 8,
    opacity: 0.5,
    bottom: 0
  },
  inputContainer: {
    marginTop: 10,
    marginHorizontal: 20
  },
  confirm: {
    color: "black",
    fontWeight: "500",
    fontSize: 20
  },
  counter: {
    color: "#C7C9C9",
    flexDirection:'row',
    alignSelf:'flex-end'
  }
});