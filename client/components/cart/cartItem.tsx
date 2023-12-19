import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ThematicBreak from "../ThematicBreak";
import React, { useState } from "react";

interface Props {
  items: any;
}

export default function cartItem({ items }: Props) {
  const [counter, setCounter] = useState(0);
  var [ItemTotal, setItemTotal] = useState(0);

  const Plus = () => {
    setCounter(counter + 1);
    setItemTotal((items.price += items.price));
  };

  const Minus = () => {
    if (counter > 0) {
      setCounter(counter - 1);
      setItemTotal((items.price -= 1));
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.title}>{items.name}</Text>
          <Text style={styles.description}>{items.description}</Text>
          <View style={styles.footer}>
            <Text style={styles.price}>{items.price + "JOD"}</Text>
            <View style={styles.quantity}>
              <View>
                <Pressable onPress={Plus}>
                  <MaterialIcons name="add" size={18} color="#ffffff" />
                </Pressable>
              </View>
              <View>
                <Text style={styles.counter}>{"  " + counter + "  "}</Text>
              </View>
              <View>
                <Pressable onPress={Minus}>
                  <MaterialIcons name="remove" size={18} color="#ffffff" />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
        <Image source={require("../../assets/pic1.jpg")} style={styles.image} />
      </View>
      <View style={{ marginTop: 20 }}>
        <ThematicBreak marginHorizontal={15} />
      </View>
    </View> // mainView
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: "row",
  },
  footer: {
    borderColor: "rgba(255, 255, 255, 1)",
  },
  title: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 16,
  },
  customize: {
    color: "rgba(246, 151, 127, 1)",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  image: {
    position: "absolute",
    right: 20,
    width: 130,
    height: 130,
    borderRadius: 6,
  },
  info: {
    marginLeft: 15,
    width: 175,
  },
  description: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 1)",
    marginTop: 5,
    width: 206,
    height: 70,
  },
  price: {
    position: "absolute",
    color: "rgba(255, 255, 255, 1)",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 85,
  },
  quantity: {
    marginLeft: 2,
    color: "rgba(255, 255, 255, 1)",
    width: 60,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  counter: {
    fontSize: 16,
    color: "white",
  },
});
