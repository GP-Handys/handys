import { View, StyleSheet, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
  import { Button } from "react-native-paper";
  import { CommonBackgroundWithNoSafeArea } from "../../common/background";
  import React from "react";

export default function cartItem() {
      
        return (
          <CommonBackgroundWithNoSafeArea>
            <Image
              style={styles.root}
              source={require("../../assets/landing.png")}
            />
          </CommonBackgroundWithNoSafeArea>
        );
      }
      
      const styles = StyleSheet.create({
        root: {
          width: 333,
          height: 115,
          flexShrink: 0
        },
        item_pic: {
          width: 93,
          height: 17,
          flexShrink: 0,
          color: "rgba(255, 255, 255, 1)",
          fontFamily: "Readex Pro",
          fontSize: 16,
          fontStyle: "normal",
          fontWeight: "500"
        },
        price: {
          width: 71,
          height: 14,
          flexShrink: 0,
          color: "rgba(255, 255, 255, 1)",
          fontFamily: "Readex Pro",
          fontSize: 13,
          fontStyle: "normal",
          fontWeight: "400"
        },
        quantity: {
          width: 7,
          height: 8,
          flexShrink: 0,
          color: "rgba(255, 255, 255, 1)",
          fontFamily: "Readex Pro",
          fontSize: 13,
          fontStyle: "normal",
          fontWeight: "400"
        }
      });
      
