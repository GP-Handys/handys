import { View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";

interface IButton {
  iconName: any;
}

export default function LikeButton() {
  const toggleLikeIcon = (currentIcon: IButton): IButton => {
    return {
      iconName:
        currentIcon.iconName === "thumb-up-off-alt"
          ? "thumb-up-alt"
          : "thumb-up-off-alt",
    };
  };

  const [icon, setIcon] = useState<IButton>({ iconName: "thumb-up-off-alt" });

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
