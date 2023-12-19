import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Shop } from "../../models/Shop";
import { StackProps } from "../navigation/NavigationStack";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../../common/colors";
import {StarRatingDisplay } from 'react-native-star-rating-widget';

interface Props {
  shop: Shop;
}

export default function ShopCard({ shop }: Props) {
  const navigation = useNavigation<StackProps["navigation"]>();
  return (
    <TouchableOpacity style={styles.shopCardContainer} onPress={() => {
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

        <Text style={styles.shopName}>{shop.name}</Text>

        <View style={styles.rating}>
          <StarRatingDisplay rating={1.5} starSize={13} color={"white"} starStyle={{width:2}} style={{}}/>

          {2000<1000 ? (
        <Text style={styles.ratingCount}>(100 Reviews)</Text>
        ) : (
          <Text style={styles.ratingCount}>({2000/1000}k Reviews)</Text>
        )}
          
        </View>

    </TouchableOpacity>
    
  );
}

const styles = StyleSheet.create({
  shopCardContainer: {
    backgroundColor:COLORS.handysGrey,
    padding:6,
    maxWidth:150,
    borderRadius:10
  },
  shopImg: {
    borderRadius: 8,
    width: 135,
    height: 135,
    resizeMode: "cover",
  },
  shopName: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginVertical:5,
    marginLeft:5,
  },
  rating:{
    flexDirection:"row",
    alignItems:"center",
    gap:10
  },
  ratingCount:{
    fontSize:8,
    color:"#fffffa",
    opacity:0.5
  }
});

