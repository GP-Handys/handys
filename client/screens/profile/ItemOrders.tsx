import { View, Image, StyleSheet, Text } from "react-native";
import { Shop } from "../../models/Shop";
import COLORS from "../../common/colors";
import StarRating from "react-native-star-rating-widget";
import { useState } from "react";
import { CommonScrollableBackground } from "../../common/background";
import ThematicBreak from "../../components/ThematicBreak";

export function ItemOrdersScreen({ route }: any) {
  const orderId: number = route.params.orderId;
  const shop: Shop = route.params.shop;
  const [shopRating, setShopRating] = useState<number>(0);

  return (
    <CommonScrollableBackground>
      {shop && (
        <>
          <Image
            source={{ uri: shop?.pfp_url ?? "" }}
            style={styles.shopImage}
          />
          <View style={styles.shopFooter}>
            <Text style={styles.shopName}>{shop.name}</Text>
            <StarRating
              rating={shopRating}
              onChange={setShopRating}
              starSize={25}
              color="white"
            />
          </View>
        </>
      )}
      <Text style={styles.screenDescription}>
        Please provide feedback to help improve the shop and the items in the
        future.
      </Text>
      <View style={{marginVertical: 10}}>
        <ThematicBreak />
      </View>
    </CommonScrollableBackground>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.commonBackground,
    flex: 1,
    paddingHorizontal: 15,
  },
  shopImage: {
    width: "100%",
    aspectRatio: 3 / 2,
  },
  shopFooter: {
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shopName: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  screenDescription: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 25,
    marginBottom: 10,
  },
});
