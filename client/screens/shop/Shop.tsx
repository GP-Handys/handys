import { Image } from "react-native-elements";
import { CommonScrollableBackground } from "../../common/background";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import COLORS from "../../common/colors";
import { useNavigation } from "@react-navigation/native";
import { StackProps } from "../../components/navigation/NavigationStack";
import { Item } from "../../models/Item";
import React, { useEffect, useState } from "react";
import { getItemsForShopId } from "../../api/ItemApi";
import { getShopById } from "../../api/ShopApi";
import { getProfile } from "../../api/UserApi";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import ThematicBreak from "../../components/ThematicBreak";
import ItemCard from "../../components/home/ItemCard";
import { getWishList } from "../../api/WishlistApi";

export default function ShopScreen({ route }: any) {
  const navigation = useNavigation<StackProps["navigation"]>();
  const [items, setItems] = useState<Item[]>([]);
  const [shop, setShop] = useState<any>();
  const [favoriteItems, setFavoriteItems] = useState<any[]>([]);
  const [userId, setUserId] = useState<number>();

  const [loadingFavItems, setLoadingFavItems] = useState(true);
  const [loadingItemsForShopId, setLoadingItemsForShopId] = useState(true);
  const [loadingShopDataById, setLoadingShopDataById] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);

  const { shopId } = route.params;

  const fetchFavItems = async () => {
    await getWishList("ids").then((res) => {
      if (res.status === 200) {
        setFavoriteItems(res.data);
        setLoadingFavItems(false);
        setFirstLoad(false);
      }
    });
  };

  const fetchItemsForShopId = async () => {
    await getItemsForShopId(shopId).then((res) => {
      if (res.status === 200) {
        setItems(res.data);
        setLoadingItemsForShopId(false);
        setFirstLoad(false);
      }
    });
  };
  const fetchShopDataById = async () => {
    await getShopById(shopId).then((res) => {
      if (res.status === 200) {
        setShop(res.data);
        setLoadingShopDataById(false);
        setFirstLoad(false);
      }
    });
  };
  const getProfileByToken = async () => {
    await getProfile().then((res) => {
      setUserId(res.id);
    });
  };
  useEffect(() => {
    fetchFavItems();
    fetchItemsForShopId();
    fetchShopDataById();
    getProfileByToken();
  }, []);

  if (
    firstLoad &&
    (loadingFavItems || loadingItemsForShopId || loadingShopDataById)
  ) {
    return (
      <View style={styles.loadingPage}>
        <ActivityIndicator size={"large"} color={COLORS.normalText} />
      </View>
    );
  } else
    return (
      <CommonScrollableBackground>
        <Image source={{ uri: shop?.pfp_url }} style={styles.shopImage} />
        <View style={styles.footerContainer}>
          <View>
            <Text style={styles.footerShopName}>{shop?.name}</Text>
            <StarRatingDisplay
              rating={shop?.rating}
              starSize={16}
            color={COLORS.normalText}
            starStyle={{ width: 5 }}
              style={styles.rating}
            />
          </View>
          {shop?.userId === userId && userId != undefined ? (
            <View style={styles.subToPremiumContainer}>
              <TouchableOpacity
              style={styles.settings}
                onPress={() =>
                  navigation.navigate("ShopSettingsScreen", { shop: shop })
                }
              >
                <Ionicons name="settings" size={22} color="white" />
                <Text
                  style={{ fontSize: 14, fontWeight: "bold", color: "white" }}
                >
                  Settings
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.subToPremiumContainer}>
              <TouchableOpacity
                style={styles.settings}
                onPress={() =>
                  navigation.navigate("ShopContactScreen", { shop: shop })
                }
              >
                <FontAwesome5 name="phone-alt" size={22} color="white" />
                <Text
                  style={{ fontSize: 14, fontWeight: "bold", color: "white" }}
                >
                  Contact
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <Text style={styles.bio}>{shop?.bio}</Text>
        <ThematicBreak />
        <Text style={styles.shopItems}>Shop's handicrafts</Text>
        <View style={{ marginLeft: 20, marginRight: 20 }}>
          <FlatList
            data={items}
            renderItem={({ item }) => {
              return (
                <ItemCard
                  item={item}
                  isFavorite={favoriteItems.includes(item.id)}
                  isEditable={shop?.userId === userId}
                />
              );
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
    marginLeft: 10,
    color: COLORS.normalText,
  },
  rating: {
    marginLeft:8,
  },
  subToPremiumContainer: {
    marginRight: 15,
  },
  settings: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    backgroundColor: COLORS.lightBrown,
    height: 37,
    width: 135,
    borderRadius: 6,
    paddingHorizontal: 10,
  },
  bio: {
    fontSize: 14,
    color: COLORS.textTitle,
    opacity: 0.8,
    marginLeft: 15,
    marginVertical: 17,
  },
  shopItems: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.normalText,
    marginLeft: 15,
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    marginTop: "auto",
    height: "50%",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeButton: {
    alignItems: "center",
    padding: 16,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  loadingPage: {
    backgroundColor: COLORS.commonBackground,
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
});
