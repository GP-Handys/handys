import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { CommonBackgroundWithNoSafeArea } from "../../common/background";
import COLORS from "../../common/colors";
import { StackProps } from "../../components/navigation/NavigationStack";
import { AntDesign } from "@expo/vector-icons";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import ThematicBreak from "../../components/ThematicBreak";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

interface IButton {
  buttonName: any;
}

const toggleLikeIcon = (currentIcon: IButton): IButton => {
  return {
    buttonName: currentIcon.buttonName === "hearto" ? "heart" : "hearto"
  };
};
export default function ItemScreen({ navigation }: StackProps, props: any) {
  const [icon, setIcon] = useState<IButton>({ buttonName: "hearto" });
  return (
    <CommonBackgroundWithNoSafeArea>
      <View style={{ flex:1}}>
        <Image
          source={require("../../assets/crafter.png")}
          style={styles.image}
        />
        <View style={styles.mainContainer}>
          <View style={styles.itemNameRow}>
            <Text style={styles.itemNameText}>Elon mask</Text>
            <TouchableOpacity
              style={styles.circle}
              onPress={() => {
                setIcon(toggleLikeIcon(icon));
              }}
            >
              {icon.buttonName == "hearto" ? (
                <AntDesign name="hearto" size={16} color="white" />
              ) : (
                <AntDesign name="heart" size={16} color="red" />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.rectangle}>
              <View style={styles.rating}>
                <StarRatingDisplay
                  rating={1.5}
                  starSize={18}
                  color={"white"}
                  starStyle={{ width: 5 }}
                  style={{}}
                />

                {2000 < 1000 ? (
                  <Text style={styles.ratingCount}>(100 Reviews)</Text>
                ) : (
                  <Text style={styles.ratingCount}>
                    ({2000 / 1000}k Reviews)
                  </Text>
                )}
              </View>
            </View>
            <View style={styles.rectangle}>
              <Text style={styles.price}>182.80 JOD</Text>
            </View>
          </View>
          <ThematicBreak />
          <View>
            <Text style={styles.Description}>Description</Text>
            <Text style={styles.itemDesc}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took printer took
              printer took printer took printer took.
            </Text>
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.shopButton}>
              <View style={styles.rowContainer}>
                <View style={styles.shop}>
                <Text style={styles.madeBy}>Made by:</Text>
                  <Image
                    source={require("../../assets/wood.png")}
                    style={styles.shopPic}
                  />
                  <Text style={styles.shopName}>Wood Crafters</Text>
                </View>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color="white"
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={{ fontSize: 16, color: "white", fontWeight: "500" }}>
                Customize
              </Text>
            </TouchableOpacity>
            <ThematicBreak />

            <TouchableOpacity style={styles.cartButton}>
              <Feather name="shopping-cart" size={24} color="black" />
              <Text
                style={{
                  fontSize: 16,
                  color: "black",
                  fontWeight: "500",
                  marginLeft: 10
                }}
              >
                Add to Cart
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </CommonBackgroundWithNoSafeArea>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 0.75,
    marginHorizontal: 25
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover"
  },
  itemNameRow: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "space-between"
  },
  itemNameText: {
    color: "white",
    fontWeight: "500",
    paddingVertical: 10,
    fontSize: 24
  },
  circle: {
    backgroundColor: COLORS.handysGrey,
    width: 30,
    height: 30,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12
  },
  rectangle: {
    width: 145,
    height: 30,
    borderRadius: 7.5,
    backgroundColor: COLORS.handysGrey,
    justifyContent: "center",
    alignItems: "center"
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  ratingCount: {
    fontSize: 8,
    color: "#fffffa",
    opacity: 0.5
  },
  price: {
    color: "white",
    fontWeight: "500"
  },
  Description: {
    color: "white",
    marginVertical: 10,
    fontSize: 20,
    fontWeight: "500"
  },
  itemDesc: {
    color: "white",
    fontSize: 14,
    lineHeight: 20,
    height: 175
  },
  buttonsContainer: {
    marginTop: 70,
    bottom:0
  },
  cartButton: {
    flexDirection: "row",
    backgroundColor: COLORS.CTAButtonBackground,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 8,
    marginTop: 15
  },
  button: {
    backgroundColor: COLORS.handysGrey,
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    borderRadius: 8,
    marginBottom: 10
  },
  shopButton: {
    flexDirection: "row",
    backgroundColor: COLORS.handysGrey,
    paddingLeft: 15,
    height: 45,
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: "space-between"
  },
  madeBy: {
    fontSize: 12,
    color: "#A2A4A1",
    fontWeight: "500"
  },
  shopPic: {
    width: 35,
    height: 35,
    borderRadius: 100,
    marginLeft:10,
  },
  shopName: {
    fontSize: 14,
    width: 130,
    marginLeft: 10,
    fontWeight: "500",
    color: "white"
  },

  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:'space-between'
  },
  shop: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 20
  }
});
