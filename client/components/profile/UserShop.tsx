import { Pressable, StyleSheet, Text, Image, View } from "react-native";
import COLORS from "../../common/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { Shop } from "../../models/Shop";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList, StackProps } from "../navigation/NavigationStack";
import { useNavigation } from "@react-navigation/native";


interface Props {
  shop: Shop;
}

export function UserShop({ shop }: Props) {
  const navigation = useNavigation<StackProps["navigation"]>();

  return (
    <Pressable key={shop.id} style={styles.shop} onPress={()=>navigation.navigate("ShopScreen",{
      shopId:shop.id,
      shopName:shop.name
    })}>
      <View style={styles.shopDetails}>

        {shop.pfp_url === null ? (
            <Image
              source={require("../../assets/default_shop_img.png")}
              style={styles.shopIMG}
            />
          ) : (
            <Image source={{ uri: shop.pfp_url }} style={styles.shopIMG} />
          )}

        <Text style={styles.shopName}>{shop.name!}</Text>
      </View>
      {shop.is_premium && (
        <View style={styles.premium}>
          <FontAwesome5 name="crown" size={22} color="black" />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shop: {
    backgroundColor: COLORS.handysGrey,
    height: 60,
    width: 320,
    borderRadius: 9,
    gap: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 13,
  },
  shopIMG: {
    width: 36,
    height: 36,
    borderRadius: 36,
  },
  premium: {
    width: 36,
    height: 36,
    backgroundColor: "#F6977F",
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  shopName: { fontSize: 18, fontWeight: "500", color: "white" },
  shopDetails: { gap: 15, flexDirection: "row", alignItems: "center" },
});
