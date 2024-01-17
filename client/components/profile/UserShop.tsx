import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import COLORS from "../../common/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { Shop } from "../../models/Shop";
import { useNavigation } from "@react-navigation/native";
import { StackProps } from "../navigation/NavigationStack";

interface Props {
  shop: Shop;
}

export function UserShop({ shop }: Props) {
  const navigation = useNavigation<StackProps["navigation"]>();

  return (
    <TouchableOpacity
      key={shop.id}
      style={styles.shop}
      onPress={() =>
        navigation.navigate("ShopScreen", {
          shopId: shop.id,
          shopName: shop.name,
        })
      }
    >
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
          <FontAwesome5 name="crown" size={20} color={(COLORS.lightestBrown)} />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  shop: {
    backgroundColor: COLORS.handysGrey,
    height: 60,
    width: "100%",
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
    backgroundColor: COLORS.CTAButtonBackground,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  shopName: { fontSize: 18, fontWeight: "500", color: COLORS.normalText,
},
  shopDetails: { gap: 15, flexDirection: "row", alignItems: "center" },
});
