import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ThematicBreak from "../ThematicBreak";
import React, { useEffect, useState } from "react";
import { Item } from "../../models/Item";
import COLORS from "../../common/colors";

interface Props {
  item: Item;
}

export default function cartItem({ item }: Props) {
  const [counter, setCounter] = useState(1);
  const [ItemTotalPrice, setItemTotalPrice] = useState(item.base_price);

  const plus = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  const minus = () => {
    if (counter > 1) {
      setCounter((prevCounter) => prevCounter - 1);
    }
  };

  useEffect(() => {
    setItemTotalPrice(counter * item.base_price);
  }, [counter, item.base_price]);

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.info}>
          <View style={{ flex: 1 }}>
            <Text style={styles.itemName}>{item.name}</Text>
            {item.is_customizable && (
              <>
                <Text style={styles.Customized}>Customized</Text>
                <Text style={styles.details}>Details:</Text>
              </>
            )}
          </View>
          <View style={styles.footer}>
            <Text style={styles.price}>JOD {ItemTotalPrice}</Text>
            <View style={{ flexDirection: "row", gap: 15 }}>
              <Pressable onPress={minus}>
                <MaterialIcons name="remove" size={23} color="#ffffff" />
              </Pressable>
              <Text style={styles.counter}>{counter}</Text>
              <Pressable onPress={plus}>
                <MaterialIcons name="add" size={23} color="#ffffff" />
              </Pressable>
            </View>
          </View>
        </View>
        <Image source={require("../../assets/pic1.jpg")} style={styles.image} />
      </View>
      <ThematicBreak verticalHorizontal={20} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  info: {
    gap: 5,
    flexGrow: 1,
  },
  itemName: {
    color: "white",
    fontSize: 16,
  },
  Customized: {
    color: COLORS.CTAButtonBackground,
    fontSize: 14,
    textDecorationLine: "underline",
  },
  details: {
    fontSize: 12,
    color: "grey",
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 6,
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
  },
  counter: {
    fontSize: 16,
    color: "white",
  },
});
