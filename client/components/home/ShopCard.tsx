import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Shop } from "../../models/Shop";
import { StackProps } from "../navigation/NavigationStack";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../../common/colors";
import { StarRatingDisplay } from "react-native-star-rating-widget";

interface Props {
  shop: Shop;
}

export default function ShopCard({ shop }: Props) {
  const navigation = useNavigation<StackProps["navigation"]>();
  return (
    <TouchableOpacity
      style={styles.shopCardContainer}
      onPress={() => {
        navigation.navigate("ShopScreen", {
          shopId: shop.id,
          shopName: shop.name
        });
      }}
    >
      {shop.pfp_url === null ? (
        <Image
          source={require("../../assets/default_shop_img.png")}
          style={styles.shopImg}
        />
      ) : (
        <Image source={{ uri: shop.pfp_url }} style={styles.shopImg} />
      )}

      <Text style={styles.shopName}>{shop.name}</Text>

      <View style={styles.rating}>
        <StarRatingDisplay
          rating={shop.rating}
          starSize={13}
          color={"white"}
          starStyle={{ width: 2 , alignItems:"center" }}
        />
      </View>

        {shop.rating < 1000 ? (
          <Text style={styles.ratingCount}>{shop.rating} Reviews</Text>
        ) : (
          <Text style={styles.ratingCount}>({shop.rating / 1000}k Reviews)</Text>
        )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  shopCardContainer: {
    backgroundColor: COLORS.shopBackground,
    padding: 10,
    maxWidth: 150,
    borderRadius: 10
  },
  shopImg: {
    borderRadius: 8,
    width: 125,
    height: 135,
    resizeMode: "cover"
  },
  shopName: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
    marginVertical: 5,
    alignSelf:'center'
  },
  rating: {
    flexDirection: "row",
    alignSelf:'center',
    marginBottom:5,
  },
  ratingCount: {
    fontSize: 9,
    color: "#fffffa",
    opacity: 0.7,
    alignSelf:'center'
  }
});
