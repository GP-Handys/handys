import { Pressable, StyleSheet, Text, Image, View } from "react-native";
import COLORS from "../../common/colors";
import { FontAwesome5 } from "@expo/vector-icons";

class Shop {
  public id!: number;
  public name!: string;
  public rating!: number;
  public is_premium!: boolean;
  public is_deleted!: boolean;
  public is_approved!: boolean;
  public pfp_url?: string | null;
  public bio!: string;
  public socialMediaLink!: string;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

interface Props {
  shop: Shop;
}

export function UserShop({ shop }: Props) {
  let imageUrl = require("../../assets/logo.png");
  return (
    <Pressable key={shop.id} style={styles.shop}>
      <View style={styles.shopDetails}>
        <Image source={imageUrl} style={styles.shopIMG} />
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
