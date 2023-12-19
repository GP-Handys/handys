import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Shop } from "../../models/Shop";
import { StackProps } from "../navigation/NavigationStack";
import { useNavigation } from "@react-navigation/native";

interface Props {
  shop: Shop;
}

export default function ShopCard({ shop }: Props) {
  const navigation = useNavigation<StackProps["navigation"]>();
  return (
    <View style={styles.shopCardContainer}>
      <TouchableOpacity onPress={() => {
        navigation.navigate("ShopScreen", {
          shopId: shop.id,
          shopName: shop.name,
        })
      }}>
        {shop.pfp_url === null ? (
          <Image
            source={require("../../assets/default_shop_img.png")}
            style={styles.shopImg}
          />
        ) : (
          <Image source={{ uri: shop.pfp_url }} style={styles.shopImg} />
        )}
      </TouchableOpacity>
      <Text style={styles.shopName}>{shop.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  shopCardContainer: {
    marginTop: 10,
  },
  shopImg: {
    borderRadius: 8,
    width: 302,
    height: 162,
    marginHorizontal: 20,
    resizeMode: "cover",
  },
  shopName: {
    color: "white",
    fontSize: 11,
    marginTop: 12,
    marginHorizontal: 20,
    fontWeight: "bold",
    textAlign: "left",
  },
});
