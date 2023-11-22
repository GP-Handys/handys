import { View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";

export default function LikeButton() {
  interface Ibutton {
    iconName: any;
  }

  const toggleLikeIcon = (currentIcon: Ibutton): Ibutton => {
    return {
      iconName:
        currentIcon.iconName === "thumb-up-off-alt"
          ? "thumb-up-alt"
          : "thumb-up-off-alt",
    };
  };

  const [icon, setIcon] = useState<Ibutton>({ iconName: "thumb-up-off-alt" });

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setIcon(toggleLikeIcon(icon));
        }}
      >
        <MaterialIcons name={icon.iconName} size={20} color="#FFFFFFBF" />
      </TouchableOpacity>
    </View>
  );
}