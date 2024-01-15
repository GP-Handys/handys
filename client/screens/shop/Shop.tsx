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
import React, {
  useEffect,
  useState,
} from "react";
import { getItemsForShopId } from "../../api/ItemApi";
import { getShopById } from "../../api/ShopApi";
import { getProfile } from "../../api/UserApi";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { Ionicons } from "@expo/vector-icons";
import ThematicBreak from "../../components/ThematicBreak";
import ItemCard from "../../components/home/ItemCard";
import { getWishList } from "../../api/WishlistApi";

export default function ShopScreen({ route }: any) {
  const navigation = useNavigation<StackProps["navigation"]>();
  const [items, setItems] = useState<Item[]>([]);
  const [shop, setShop] = useState<any>();
  const [favoriteItems, setFavoriteItems] = useState<any[]>([]);
  const [userId, setUserId] = useState<number>();
  const { shopId } = route.params;

  const fetchFavItems = async () => {
    await getWishList("ids").then((res) => {
      if (res.status === 200) {
        setFavoriteItems(res.data);
      }
    });
  };

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
    fetchFavItems();
    fetchItemsForShopId();
    fetchShopDataById();
    getProfileByToken();
  }, []);

  return (
    <CommonScrollableBackground>
      <Image source={{ uri: shop?.pfp_url }} style={styles.shopImage} />
      <View style={styles.footerContainer}>
        <View>
          <Text style={styles.footerShopName}>{shop?.name}</Text>
          <StarRatingDisplay
            rating={shop?.rating}
            starSize={16}
            color={COLORS.darkBrown}
            starStyle={{ width: 5 }}
            style={styles.rating}
          />
        </View>
        {shop?.userId === userId && (
          <View style={styles.subToPremiumContainer}>
            <TouchableOpacity
              style={styles.settings}
              onPress={() => navigation.navigate("ShopSettingsScreen", {shop: shop})}
            >
              <Ionicons name="settings" size={22} color="white" />
              <Text
                style={{ fontSize: 14, fontWeight: "bold", color: "white" }}
              >
                Settings
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
  shopHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
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
    marginLeft: 10,
    color: COLORS.darkBrown,
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
    backgroundColor: COLORS.CTAButtonBackground,
    height: 37,
    width: 135,
    borderRadius: 6,
    paddingHorizontal: 10,
  },
  bio: {
    fontSize: 14,
    color: COLORS.darkBrown,
    opacity: 0.5,
    marginLeft: 15,
    marginVertical: 17,
  },
  shopItems: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.darkBrown,
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
});
