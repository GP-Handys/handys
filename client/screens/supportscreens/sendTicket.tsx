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
import { useState } from "react";
import COLORS from "../../common/colors";

export default function choose() {
  const [email, onChangeEmail] = useState("");
  const [subject, onChangesubject] = useState("");
  const [message, onChangeMessage] = useState("");
  return (
    <CommonBackgroundWithNoSafeArea>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.textContainer}>
        <Text style={styles.textTitle}>
          Fill the form below and we will get back to you soon
        </Text>
      </View>

      <View style={styles.inputsContainer}>
        <Text style={styles.note}>
          *We will use your Handy’s email if you leave this field empty.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="E-mail (optional)"
          placeholderTextColor={COLORS.textInputPlaceholder}
          value={email}
          onChangeText={onChangeEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Subject"
          placeholderTextColor={COLORS.textInputPlaceholder}
          value={subject}
          onChangeText={onChangesubject}
        />

        <TextInput
          style={styles.textArea}
          placeholder="Message"
          placeholderTextColor={COLORS.textInputPlaceholder}
          value={message}
          onChangeText={onChangeMessage}
          multiline={true}
        />
      </View>

      <View style={{ marginBottom: 10, marginHorizontal: 10 }}>
        <Pressable
          onPress={() => {}}
          style={({ pressed }) => [
              styles.signUpPressable,
              {
                  opacity: pressed ? 0.6 : 1
                }
            ]}
        >
          <Text style={{ color: "black", fontWeight: "600", fontSize: 16 }}>
            Confirm
          </Text>
        </Pressable>
      </View>
      </KeyboardAvoidingView>
    </CommonBackgroundWithNoSafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textContainer: {
    width: 300,
    marginTop: 80,
    marginBottom: 50,
    textAlign: "left",
    alignSelf: "center"
  },
  textTitle: {
    marginTop: 10,
    color: "white",
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
    paddingLeft: 15,
    paddingBottom: 60,
    backgroundColor: COLORS.handysGrey,
    height: 100,
    borderRadius: 6,
    marginTop: 2,
    marginHorizontal: 20,
    fontSize: 15,
    fontWeight: "600"
  },
  inputsContainer: {
    marginTop: 30,
    flex: 1
  },
  note: {
    alignSelf: "center",
    fontSize: 11.5,
    fontWeight: "600",
    color: COLORS.textInputPlaceholder,
    alignItems: "center"
  }
});
