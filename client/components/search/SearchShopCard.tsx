import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Shop } from "../../models/Shop";
import { StackProps } from "../navigation/NavigationStack";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../../common/colors";
import { StarRatingDisplay } from "react-native-star-rating-widget";

interface Props {
  shop: Shop;
}

export default function SearchShopCard({ shop }: Props) {
  const navigation = useNavigation<StackProps["navigation"]>();
  return (
    <TouchableOpacity
      style={styles.shopCardContainer}
      onPress={() => {
        navigation.navigate("ShopScreen", {
          shopId: shop.id,
          shopName: shop.name,
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

      <View style={{flex:1}}>
        <View style={styles.header}>
          <Text style={styles.shopName}>{shop.name}</Text>
          <View style={styles.rating}>
            <StarRatingDisplay
              rating={shop.rating}
              starSize={13}
              color={"white"}
              starStyle={{ width: 2 }}
              style={{}}
            />

            {2000 < 1000 ? (
              <Text style={styles.ratingCount}>(100 Reviews)</Text>
            ) : (
              <Text style={styles.ratingCount}>({2000 / 1000}k Reviews)</Text>
            )}
          </View>
        </View>
        <Text style={styles.bio}>{shop.bio}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  shopCardContainer: {
    backgroundColor: COLORS.handysGrey,
    padding: 5,
    borderRadius: 10,
    flexDirection:"row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  shopImg: {
    borderRadius: 8,
    width: 120,
    height: 120,
    resizeMode: "cover",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shopName: {
    color: "#784024",
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 5,
    marginLeft: 10,
  },
  rating: {
    gap: 4,
    alignItems: "center",
    marginRight:10
  },
  ratingCount: {
    fontSize: 10,
    color: "black",
    opacity: 0.5,
    marginLeft: 10,
  },
  bio:{
    marginTop:9,
    marginLeft:10,
    color: COLORS.itemDetails,
    fontSize:12
  }
});
