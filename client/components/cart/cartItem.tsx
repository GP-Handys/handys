import { View, StyleSheet, Image, Text, Pressable, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ThematicBreak from "../ThematicBreak";
import React, { useEffect, useState } from "react";
import { Item } from "../../models/Item";
import COLORS from "../../common/colors";
import { Cart } from "../../models/Cart";
import {
  editQuantity,
  removeFromcart as removeFromCart,
} from "../../api/CartApi";

interface Props {
  cartItem: Cart;
  item: Item;
  updateTotal: any;
  removeItem: any;
}

export default function cartItem({
  cartItem,
  item,
  updateTotal,
  removeItem,
}: Props) {
  const [counter, setCounter] = useState(cartItem.quantity);
  const [ItemTotalPrice, setItemTotalPrice] = useState(0);

  const plus = () => {
    const newCounter = counter + 1;
    setCounter(newCounter);
    const newTotalPrice = newCounter * item.base_price;
    setItemTotalPrice(newTotalPrice);
    updateTotal(item.id, newTotalPrice);
    editQuantity(cartItem.id, counter);
  };

  const minus = () => {
    if (counter > 1) {
      const newCounter = counter - 1;
      setCounter(newCounter);
      const newTotalPrice = newCounter * item.base_price;
      setItemTotalPrice(newTotalPrice);
      updateTotal(item.id, newTotalPrice);
      editQuantity(cartItem.id, counter);
    } else {
      Alert.alert("Delete item from cart", "Are you sure?", [
        {
          text: "Yes",
          onPress: () => removeItem(cartItem.id),
        },
        {
          text: "Cancel",
        },
      ]);
    }
  };

  useEffect(() => {
    const quantity = cartItem.quantity;
    setCounter(quantity);
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
            {cartItem.customization != "" && (
              <View>
                <Text style={styles.Customized}>Customized</Text>
                <Text style={styles.details}>Details: {cartItem.customization}</Text>
              </View>
            )}
          </View>
          <View style={styles.footer}>
            <Text style={styles.price}>JOD {ItemTotalPrice}</Text>
            <View style={{ flexDirection: "row", gap: 5, justifyContent:'center', alignItems:'center' }}>
              <Pressable onPress={minus}>
                <MaterialIcons name="remove" size={24} color="#715A4F" />
              </Pressable>
              <Text style={styles.counter}>{counter}</Text>
              <Pressable onPress={plus}>
                <MaterialIcons name="add" size={24} color="#715A4F" />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    borderColor:"#7C7459",
    borderRadius:5,
    borderWidth:2,
    padding:7,
    gap: 5,
    marginBottom:20,
  },
  info: {
    gap: 5,
    flexGrow: 1,
  },
  itemName: {
    color: COLORS.normalText,
    fontSize: 16,
    fontWeight:'bold'
  },
  Customized: {
    color: COLORS.CTAButtonBackground,
    fontSize: 14,
    textDecorationLine: "underline",
  },
  details: {
    fontSize: 12,
    color: "#715A4F",
    maxWidth:180,
    flexWrap:"wrap"
  },
  image: {
    width: 120,
    height: 120,
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
    color: COLORS.normalText,
  },
  counter: {
    fontSize: 16,
    color: COLORS.normalText,
  },
});
{
  /*  */
}
