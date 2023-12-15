import { View, Pressable, Text, Image, StyleSheet } from "react-native";
import { Shop } from "../../models/Shop";

interface Props {
  shop: Shop;
}

export default function ShopCard({shop}:Props){
  return (
    <View>
      <Pressable>
      {shop.pfp_url === null ? (
            <Image
              source={require("../../assets/default_shop_img.png")}
              style={styles.shopImg}
            />
          ) : (
            <Image source={{ uri: shop.pfp_url }} style={styles.shopImg} />
          )}

      </Pressable>
      <Text style={styles.shopName}>{shop.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  shopImg: {
    borderRadius: 8,
    width:140,
    height:160,
    resizeMode: "contain",
    
  },
  shopName: {
    color: "white",
    fontSize: 11,
    marginTop: 12,
    textAlign: "left",
  },
});
