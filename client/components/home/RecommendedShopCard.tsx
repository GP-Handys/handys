import { View, Pressable, Text, Image, StyleSheet } from "react-native";

export default function RecommendedShopCard() {
  return (
    <View>
      <Pressable>
        <Image
          style={styles.shopImg}
          source={require("../../assets/crafter.png")}
        />
      </Pressable>
      <Text style={styles.shopName}>Crafter's Store</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  shopImg: {
    borderRadius: 8,
  },
  shopName: {
    color: "white",
    fontSize: 11,
    marginTop: 12,
    textAlign: "left",
  },
});
