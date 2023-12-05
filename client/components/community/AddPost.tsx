import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Modal, Text } from "react-native";
import { CommonBackgroundWithSafeArea } from "../../common/background";
import { MaterialIcons } from "@expo/vector-icons";
import ThematicBreak from "../ThematicBreak";
import COLORS from "../../common/colors";

export default function AddPost() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleModal = () => setIsModalVisible(!isModalVisible);

  return (
    <View style={styles.Iconbutton}>
      <TouchableOpacity onPress={handleModal}>
        <MaterialIcons name="add-circle" size={50} color="#F6977F" />
      </TouchableOpacity>
      <Modal animationType="slide" transparent={false} visible={isModalVisible}>
        <CommonBackgroundWithSafeArea>
          <View style={styles.ModalBackGround}>
            <View style={styles.ModalHeadrer}>
              <TouchableOpacity
                onPress={handleModal}
                style={styles.CloseButton}
              >
                <MaterialIcons name="close" size={23} color="white" />
              </TouchableOpacity>
              <Text style={styles.HeaderText}>Create post</Text>
              <TouchableOpacity onPress={handleModal} style={styles.PostButton}>
                <Text style={styles.InnerPostButton}>Post</Text>
              </TouchableOpacity>
            </View>
            <ThematicBreak />
          </View>
        </CommonBackgroundWithSafeArea>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  Iconbutton: {
    position: "absolute",
    width: 48,
    height: 48,
    bottom: 25,
    right: 20,
    alignItems: "center",
  },
  ModalBackGround: {
    backgroundColor: COLORS.commonBackground,
  },
  ModalHeadrer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    top: -20,
    left: 10,
  },
  CloseButton: {
    width: 30,
    left: 10,
  },
  HeaderText: {
    fontSize: 20,
    width: 150,
    color: "white",
    marginLeft: 50,
    left: 15,
  },
  PostButton: {
    borderWidth: 2,
    borderRadius: 20,
    width: 86,
    alignItems: "center",
    height: 38,
    backgroundColor: "#F6977F",
    left: 20,
    top: 5,
  },
  InnerPostButton: {
    color: "black",
    top: 5,
    fontWeight: "800",
  },
});
