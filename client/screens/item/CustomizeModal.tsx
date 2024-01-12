import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  Platform,
} from "react-native";
import CustomTextInput from "../../components/CustomTextInput";
import { CommonScrollableBackground } from "../../common/background";
import COLORS from "../../common/colors";
import { MaterialIcons } from "@expo/vector-icons";
import ThematicBreak from "../../components/ThematicBreak";
interface ModalProps {
  isVisible: boolean;
  onDismiss: () => void;
}

export default function CustomizeScreen({ isVisible, onDismiss }: ModalProps) {
  return (
    <View>
      <Modal animationType="slide" transparent={false} visible={isVisible}>
        <CommonScrollableBackground>
          <View style={{ backgroundColor: COLORS.commonBackground }}>
            <View style={styles.ModalHeader}>
              <TouchableOpacity onPress={onDismiss} style={styles.CloseButton}>
                <MaterialIcons name="close" size={23} color="white" />
              </TouchableOpacity>
              <Text style={styles.HeaderText}> Customize</Text>
              <TouchableOpacity onPress={onDismiss} style={styles.DoneButton}>
                <Text style={styles.DoneText}>Done</Text>
              </TouchableOpacity>
            </View>
            <ThematicBreak />
          </View>
          <View style={{ marginHorizontal: 10, marginTop: 20 }}>
            <CustomTextInput
              placeholder="Any special requests?"
              multiline={true}
              minHeight={150}
            />
          </View>
        </CommonScrollableBackground>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  ConfirmButton: {
    backgroundColor: COLORS.CTAButtonBackground,
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
    marginTop: 20,
  },
  Text: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  ModalHeader: {
    paddingTop: Platform.OS === "android" ? 15 : 0,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 10,
  },
  CloseButton: {
    width: 30,
    position: "absolute",
    left: 15,
  },
  HeaderText: {
    fontSize: 20,
    color: "white",
    marginEnd: 25,
  },
  DoneButton: {
    borderWidth: 1,
    borderRadius: 20,
    width: 75,
    alignItems: "center",
    height: 35,
    backgroundColor: "#F6977F",
    justifyContent: "center",
    marginEnd: 10,
    position: "absolute",
    right: 10,
  },
  DoneText: {
    color: "black",
    alignItems: "center",
    fontWeight: "700",
    fontSize: 14,
  },
});
