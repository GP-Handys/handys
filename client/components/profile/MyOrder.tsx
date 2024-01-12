import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Shop } from "../../models/Shop";
import { getShopById } from "../../api/ShopApi";

interface Props {
  shopId: number;
  orderId: number;
}

export default function MyOrder({ shopId, orderId }: Props) {
  const [shop, setShop] = useState<Shop>();

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
    <View style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: shop?.pfp_url ?? "" }} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text>{shop?.name}</Text>
      </View>
    </View>
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
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
  },
  prompt: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    marginTop: 5,
    paddingRight: 5,
  },
});
