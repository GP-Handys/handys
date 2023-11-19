import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import toggleLikeIcon from "../../helpers/toggle/toggleLikeIcon";

export default function LikeDisLikeButton() {
  const [icon, setIcon] = useState("thumb-up-off-alt");

  return (
    <View style={styles.likeButton}>
      <TouchableOpacity
        onPress={() => {
          setIcon(toggleLikeIcon(icon));
        }}
      >
        <MaterialIcons name={icon} size={25} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  likeButton: {
    width: 30,
  },
});
