import { Image } from "react-native-elements";
import { CommonScrollableBackground } from "../../common/background";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import COLORS from "../../common/colors";
import { useNavigation } from "@react-navigation/native";
import { StackProps } from "../../components/navigation/NavigationStack";
import { Item } from "../../models/Item";
import { useEffect, useState } from "react";
import { getItemsForShopId } from "../../api/ItemApi";
import { getShopById } from "../../api/ShopApi";
import { getProfile } from "../../api/UserApi";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { FontAwesome5 } from "@expo/vector-icons";
import ThematicBreak from "../../components/ThematicBreak";
import ItemCard from "../../components/home/ItemCard";

export default function ShopScreen({ route }: any) {
  const navigation = useNavigation<StackProps["navigation"]>();
  const [items, setItems] = useState<Item[]>([]);
  const [shop, setShop] = useState<any>();
  const [userId, setUserId] = useState<number>();
  const { shopId } = route.params;

  const fetchItemsForShopId = async () => {
    await getItemsForShopId(shopId).then((res) => {
      if (res.status === 200) {
        setItems(res.data);
      }
    });
  };
  const fetchShopDataById = async () => {
    await getShopById(shopId).then((res) => {
      if (res.status === 200) {
        setShop(res.data);
      }
    });
  };
  const getProfileByToken = async () => {
    await getProfile().then((res) => {
      setUserId(res.id);
    });
  };
  useEffect(() => {
    fetchItemsForShopId();
    fetchShopDataById();
    getProfileByToken();
  }, []);

  return (
    <CommonScrollableBackground>
      {shop?.userId == userId && (
        <View style={styles.addItemsButtonContainer}>
          <TouchableOpacity
            style={styles.addItemButton}
            onPress={() => {
              navigation.navigate("AddItemScreen", {
                shopId: shopId,
              });
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Add item</Text>
          </TouchableOpacity>
        </View>
      )}
      <Image source={{ uri: shop?.pfp_url }} style={styles.shopImage} />
      <View style={styles.footerContainer}>
        <View>
          <Text style={styles.footerShopName}>{shop?.name}</Text>
          <StarRatingDisplay
            rating={shop?.rating}
            starSize={16}
            color={"white"}
            starStyle={{ width: 2 }}
            style={styles.rating}
          />
        </View>
        {shop?.userId == userId && (
          <View>
            <View style={styles.subToPremiumContainer}>
              <TouchableOpacity
                style={styles.subToPremiumButton}
                onPress={() => {
                  navigation.navigate("AddItemScreen", {
                    shopId: shopId,
                  });
                }}
              >
                <FontAwesome5 name="crown" size={22} color="black" />
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                  Get premium
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      <Text style={styles.bio}>{shop?.bio}</Text>
      <ThematicBreak />
      <Text style={styles.shopItems}>Shop's handicrafts</Text>
      <View style={{marginLeft: 20, marginRight: 20}}>
        <FlatList
          data={items}
          renderItem={({ item }) => {
            return <ItemCard item={item} />;
          }}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          style={{ marginTop: 20 }}
        />
      </View>
    </CommonScrollableBackground>
  );
}

const styles = StyleSheet.create({
  shopHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  addItemsButtonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 15,
  },
  addItemButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.CTAButtonBackground,
    height: 37,
    width: 100,
    borderRadius: 6,
    marginVertical: 10,
  },
  shopImage: {
    width: "100%",
    aspectRatio: 3 / 2,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  footerShopName: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 25,
    color: "white",
  },
  rating: {
    marginLeft: 19,
  },
  subToPremiumContainer: {
    marginRight: 15,
  },
  subToPremiumButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.CTAButtonBackground,
    height: 37,
    width: 135,
    borderRadius: 6,
    paddingHorizontal: 10,
  },
  bio: {
    fontSize: 14,
    color: "white",
    opacity: 0.5,
    marginLeft: 15,
    marginVertical: 17,
  },
  shopItems: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginLeft: 15,
    marginTop: 20,
  },
});
