import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { CommonBackgroundWithNoSafeArea } from "../../common/background";
import COLORS from "../../common/colors";
import { StackProps } from "../../components/navigation/NavigationStack";
import { AntDesign } from "@expo/vector-icons";
import { StarRatingDisplay } from "react-native-star-rating-widget";

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
      <View style={styles.mainContainer}>
        <Image
          source={require("../../assets/crafter.png")}
          style={styles.image}
        />
        <View style={styles.itemNameRow}>
          <Text style={styles.itemNameText}>Item Name</Text>
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
                <Text style={styles.ratingCount}>({2000 / 1000}k Reviews)</Text>
              )}
            </View>
          </View>
          <View style={styles.rectangle}>
            <Text style={styles.price}>182.80 JOD</Text>
          </View>
        </View>
      </View>
    </CommonBackgroundWithNoSafeArea>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover"
  },
  itemNameRow: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  itemNameText: {
    color: "white",
    fontWeight: "500",
    paddingVertical: 15,
    fontSize: 24,
    paddingRight: 20
  },
  circle: {
    backgroundColor: COLORS.handysGrey,
    width: 30,
    height: 30,
    borderRadius: 100,
    marginLeft: 140,
    justifyContent: "center",
    alignItems: "center"
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 24
  },
  rectangle: {
    width: 145,
    height: 40,
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
  }
});
