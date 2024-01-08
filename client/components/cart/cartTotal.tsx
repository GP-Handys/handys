import { View, StyleSheet, Text, Alert, Pressable } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackProps } from "../../components/navigation/NavigationStack";

export default function cartTotal() {
  var [totalPrice, setTotalPrice] = useState(0);
  const navigation = useNavigation<StackProps["navigation"]>();

  return (
    <View>
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>{`Total Price`}</Text>
          <Text style={styles.price}>{totalPrice + "JOD"}</Text>
        </View>
        <Pressable
          style={styles.pressable}
          onPress={() => {
            navigation.navigate("Map");
          }}
        >
          <Text style={styles.button}>Checkout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  text: {
    color: "white",
    fontSize: 12,
    fontWeight: "normal"
  },
  price: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  },
  button: {
    textAlignVertical: "center",
    color: "black",
    fontSize: 18,
    fontWeight: "bold"
  },
  pressable: {
    height: 40,
    width: 150,
    borderRadius: 5,
    backgroundColor: "rgba(246, 151, 127, 1)",
    alignItems: "center",
    justifyContent: "center"
  }
});
