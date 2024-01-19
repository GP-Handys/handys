import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { getShopById } from "../../api/ShopApi";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackProps } from "../navigation/NavigationStack";
import COLORS from "../../common/colors";

interface Props {
  shopId: number;
  orderId: number;
}

export default function MyOrder({ shopId, orderId }: Props) {
  const navigation = useNavigation<StackProps["navigation"]>();
  const [shop, setShop] = useState<any>();

  const fetchShopDataById = async () => {
    await getShopById(shopId).then((res) => {
      if (res.status === 200) {
        setShop(res.data);
      }
    });
  };

  useEffect(() => {
    fetchShopDataById();
  }, []);

  return (
    <TouchableOpacity
      style={styles.mainContainer}
      onPress={() =>
        navigation.navigate("ItemOrderScreen", {
          shop: shop,
          orderId: orderId,
        })
      }
    >
      {shop && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: shop.pfp_url ?? "" }} style={styles.image} />
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.shopName}>{shop?.name}</Text>
        <MaterialIcons
          name="keyboard-arrow-right"
          size={30}
          color={COLORS.normalText}
          style={{
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
          }}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
  imageContainer: {
    paddingLeft: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shopName: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.normalText,
    marginTop: 5,
    paddingRight: 5,
  },
});
