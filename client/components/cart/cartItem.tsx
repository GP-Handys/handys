import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ThematicBreak from "../ThematicBreak";
import React, { useEffect, useState } from "react";
import { Item } from "../../models/Item";
import COLORS from "../../common/colors";
import { Cart } from "../../models/Cart";

interface Props {
  cartItem:Cart;
  item: Item;
  updateTotal: any;
  
}

export default function cartItem({cartItem, item, updateTotal }: Props) {
  const [counter, setCounter] = useState(1);
  const [ItemTotalPrice, setItemTotalPrice] = useState(0);

  const plus = () => {
    const newCounter = counter + 1;
    setCounter(newCounter);
    const newTotalPrice = newCounter * item.base_price;
    setItemTotalPrice(newTotalPrice);
    updateTotal(item.id, newTotalPrice);
  };

  const minus = () => {
    if (counter > 1) {
      const newCounter = counter - 1;
      setCounter(newCounter);
      const newTotalPrice = newCounter * item.base_price;
      setItemTotalPrice(newTotalPrice);
      updateTotal(item.id, newTotalPrice);
    }
  };

  useEffect(() => {
    console.log(cartItem);
    console.log(item);
    
    
    const quantity = cartItem.quantity;
    setCounter(quantity)
    const newTotalPrice = counter * item.base_price;
    setItemTotalPrice(newTotalPrice);
    updateTotal(item.id, newTotalPrice);
  }, []);

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.info}>
          <View style={{ flex: 1 }}>
            <Text style={styles.itemName}>{item.name}</Text>
            {/* {item.is_customizable && (
              <View>
                <Text style={styles.Customized}>Customized</Text>
                <Text style={styles.details}>Details:</Text>
              <View/>
            )} */}
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

        {item.img_url === null ? (
          <Image
            source={require("../../assets/default_shop_img.png")}
            style={styles.image}
          />
        ) : (
          <Image source={{ uri: item.img_url }} style={styles.image} />
        )}
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
