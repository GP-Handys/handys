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
import { CommonBackgroundWithSafeArea } from "../../common/background";
import COLORS from "../../common/colors";
import { MaterialIcons } from "@expo/vector-icons";
import ThematicBreak from "../../components/ThematicBreak";
interface ModalProps {
  isVisible: boolean;
  onDismiss: () => void;
  itemCustomization: string;
  setCustomization: (customization: string) => void;
  customization:string
}

export default function CustomizeScreen({
  isVisible,
  onDismiss,
  setCustomization,
  itemCustomization,
  customization
}: ModalProps) {
  const [tempCustomization, setTempCustomization] = useState("");
  useEffect(()=>{
    setTempCustomization(customization)
  },[])
  
  return (
    <View>
      <Modal animationType="slide" transparent={false} visible={isVisible}>
        <CommonBackgroundWithSafeArea>
          <View style={{ backgroundColor: COLORS.commonBackground }}>
            <View style={styles.ModalHeader}>
              <TouchableOpacity onPress={onDismiss} style={styles.CloseButton}>
                <MaterialIcons name="close" size={23} color="white" />
              </TouchableOpacity>
              <Text style={styles.HeaderText}>Customize</Text>
            </View>
            <ThematicBreak />
          </View>
          <View style={{ marginHorizontal: 10, marginTop: 20 }}>
            <CustomTextInput
              placeholder = {itemCustomization}
              multiline={true}
              minHeight={150}
              onChangeText={(text) => {
                setTempCustomization(text);
              }}
              defaultValue={customization}
            />
          </View>
          <TouchableOpacity
            style={styles.ConfirmButton}
            onPress={() => {
              setCustomization(tempCustomization);
              onDismiss();
            }}
          >
            <Text style={styles.Text}>Confirm</Text>
          </TouchableOpacity>
        </CommonBackgroundWithSafeArea>
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
    color: "white",
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
