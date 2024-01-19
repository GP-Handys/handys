import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { CommonScrollableBackground } from "../../common/background";
import COLORS from "../../common/colors";
import CustomTextInput from "../../components/CustomTextInput";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackProps } from "../../components/navigation/NavigationStack";

export default function AiPromptScreen() {
  const navigation = useNavigation<StackProps["navigation"]>();
  const [prompt, setPrompt] = useState("");
  const isButtonEnabled = prompt.trim().length > 6;

  return (
    <CommonScrollableBackground>
      <View style={styles.upperContainer}>
        <AntDesign name="rocket1" size={70} color="#522C19" />
        <Text style={styles.textTitle}>
          Use this cutting-edge AI tool to help you visualize your ideas to real
          products!
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <CustomTextInput
          placeholder={
            "Enter your prompt here. Make it as descriptive as possible for the best results."
          }
          onChangeText={(prompt) => setPrompt(prompt)}
          multiline={true}
          minHeight={200}
        />
        <View>
          <View style={styles.lowerContainer}>
            <Text style={styles.note}>
              *Note: please use words that are related to handicrafts to get
              better results.
            </Text>
            <Text style={styles.note}>
              eg. Scarfs for babies aged 3 to 12 months old, nitted using blue
              and pink wool with some star stickers stuck on the scarf.
            </Text>
          </View>
          {!isButtonEnabled ? (
            <TouchableOpacity
              disabled={true}
              style={[{ opacity: 0.5 }, styles.generatePressable]}
            >
              <Text style={styles.confirm}>Generate</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.generatePressable}
              onPress={() => navigation.navigate("GeneratedImageScreen", {prompt: prompt})}
            >
              <Text style={styles.confirm}>Generate</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </CommonScrollableBackground>
  );
}

const styles = StyleSheet.create({
  upperContainer: {
    width: 300,
    marginTop: 30,
    marginBottom: 50,
    textAlign: "left",
    alignSelf: "center",
    alignItems: "center",
  },
  lowerContainer: {
    width: 300,
    marginTop: 10,
    marginBottom: 40,
    textAlign: "left",
    alignSelf: "center",
    alignItems: "center",
  },
  textTitle: {
    color: COLORS.normalText,
    marginTop: 10,
    fontWeight: "400",
    fontSize: 15,
    textAlign: "center",
  },
  note: {
    marginTop: 10,
    fontWeight: "400",
    fontSize: 14,
    textAlign: "center",
  },
  generatePressable: {
    backgroundColor: COLORS.CTAButtonBackground,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 8,
    bottom: 0,
  },
  inputContainer: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  confirm: {
    color: "white",
    fontWeight: "500",
    fontSize: 20,
  },
  counter: {
    color: "#C7C9C9",
    flexDirection: "row",
    alignSelf: "flex-end",
  },
});
