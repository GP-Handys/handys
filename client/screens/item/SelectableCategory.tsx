import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import COLORS from "../../common/colors";
import { useState, useEffect } from "react";
import { Category } from "../../models/Category";

interface Props {
  category: Category;
  isChecked: boolean;
  addCategory:(id: number) => void
  removeCategory:(id: number) => void
}

export default function SelectableCategory({addCategory , removeCategory, category, isChecked }: Props) {
  const [checked, setChecked] = useState(isChecked);

  function handleClick(){

    if(checked){
      removeCategory(category.id)
    }
    else{
      addCategory(category.id)
    }

    let afterClick = !checked
    setChecked(afterClick)
  }

  return (
    <TouchableOpacity
      style={{
        marginVertical: 8,
        backgroundColor: checked ? COLORS.DividerColor : "transparent",
        borderRadius:10,
        paddingHorizontal:20,
        paddingVertical:8
      }}
      onPress={handleClick}
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/default_profile_img.jpg")}
          style={styles.image}
        />
        <Text style={styles.name}>{category.category_name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", gap: 15 },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  name: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
