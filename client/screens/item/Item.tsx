import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { CommonScrollableBackground } from "../../common/background";
import COLORS from "../../common/colors";
import { AntDesign, MaterialIcons, Feather } from "@expo/vector-icons";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import ThematicBreak from "../../components/ThematicBreak";
import { getShopById } from "../../api/ShopApi";
import { Shop } from "../../models/Shop";
import { useNavigation } from "@react-navigation/native";
import { StackProps } from "../../components/navigation/NavigationStack";
import { addToWishList, removeFromWishList } from "../../api/WishlistApi";
import { addToCart } from "../../api/CartApi";
import CustomizeModal from "./CustomizeModal";

export default function ItemScreen({ route }: any) {
  const navigation = useNavigation<StackProps["navigation"]>();
  const { item, favorite } = route.params;
  const [shop, setShop] = useState<Shop>();
  const [isFavorite, setIsFavorite] = useState(favorite);
  const [isCustomizeModalVisible, setIsCustomizeModalVisible] = useState(false);
  const [customization, setCustomization] = useState("");
  const [isAddToCartButtonDisabled, setIsAddToCartButtonDisabled] =
    useState(false);

  const fetchShopDataById = async () => {
    await getShopById(item.shopId).then((res) => {
      if (res.status === 200) {
        setShop(res.data);
      }
    });
  };

  const handleFavorite = async () => {
    if (isFavorite) {
      setIsFavorite(false);
      await removeFromWishList(item.id);
    } else {
      setIsFavorite(true);
      await addToWishList(item.id);
    }
  };

  const handleAddToCart = async () => {
    setIsAddToCartButtonDisabled(true);
    await addToCart(item.id, customization).then((res) => {
      if (res.status === 201) {
        Alert.alert(res.data);
      } else if (res.status === 400) {
        Alert.alert(res.data);
      }
    });
    setIsAddToCartButtonDisabled(false);
  };

  useEffect(() => {
    fetchShopDataById();
  }, []);

  return (
    <CommonScrollableBackground>
      <View style={{ flex: 1 }}>
        <Image source={{ uri: item.img_url }} style={styles.image} />
        <View style={styles.mainContainer}>
          <View style={styles.itemNameRow}>
            <Text style={styles.itemNameText}>{item.name}</Text>
            <TouchableOpacity
              style={styles.circle}
              onPress={() => {
                handleFavorite();
              }}
            >
              {isFavorite ? (
                <AntDesign name="heart" size={16} color="red" />
              ) : (
                <AntDesign name="hearto" size={16} color="white" />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.rectangle}>
              <View style={styles.rating}>
                <StarRatingDisplay
                  rating={item.rating}
                  starSize={18}
                  color={"white"}
                  starStyle={{ width: 5 }}
                />
                {item.rating < 1000 ? (
                  <Text style={styles.ratingCount}>{item.rating} Reviews</Text>
                ) : (
                  <Text style={styles.ratingCount}>
                    ({item.rating / 1000}k Reviews)
                  </Text>
                )}
              </View>
            </View>
            <View style={styles.rectangle}>
              <Text style={styles.price}>JOD {item.base_price} </Text>
            </View>
          </View>
          <ThematicBreak />
          <View>
            <Text style={styles.Description}>Description</Text>
            <Text style={styles.itemDesc}>{item.description}</Text>
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.shopButton}
              onPress={() =>
                navigation.navigate("ShopScreen", {
                  shopId: shop?.id,
                  shopName: shop?.name,
                })
              }
            >
              <View style={styles.rowContainer}>
                <View style={styles.shop}>
                  <Text style={styles.madeBy}>Made by:</Text>
                  <Image
                    source={{ uri: shop?.pfp_url ?? "facebook.com" }}
                    style={styles.shopPic}
                  />
                  <Text style={styles.shopName}>{shop?.name}</Text>
                </View>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color="white"
                />
              </View>

              {isCustomizeModalVisible && (
                <CustomizeModal
                  customization={customization}
                  setCustomization={setCustomization}
                  isVisible={isCustomizeModalVisible}
                  itemCustomization={item.customization}
                  onDismiss={() => setIsCustomizeModalVisible(false)}
                />
              )}
            </TouchableOpacity>
            {item.customization && (
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor:
                      customization.length > 0
                        ? COLORS.greenColor
                        : COLORS.handysGrey,
                  },
                ]}
                onPress={() => setIsCustomizeModalVisible(true)}
              >
                <Text
                  style={{ fontSize: 16, color: "white", fontWeight: "500" }}
                >
                  Customize
                </Text>
              </TouchableOpacity>
            )}

            <ThematicBreak />

            <TouchableOpacity
              style={[styles.cartButton, isAddToCartButtonDisabled && { opacity: 0.5 }]}
              onPress={handleAddToCart}
              disabled={isAddToCartButtonDisabled}
            >
              <Feather name="shopping-cart" size={24} color="black" />
              <Text
                style={{
                  fontSize: 16,
                  color: "black",
                  fontWeight: "500",
                  marginLeft: 10,
                }}
              >
                Add to Cart
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </CommonScrollableBackground>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 0.75,
    marginHorizontal: 25,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  itemNameRow: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemNameText: {
    color: "white",
    fontWeight: "500",
    paddingVertical: 10,
    fontSize: 24,
  },
  circle: {
    backgroundColor: COLORS.handysGrey,
    width: 30,
    height: 30,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  rectangle: {
    width: 145,
    height: 30,
    borderRadius: 7.5,
    backgroundColor: COLORS.handysGrey,
    justifyContent: "center",
    alignItems: "center",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  ratingCount: {
    fontSize: 8,
    color: "#fffffa",
    opacity: 0.5,
  },
  price: {
    color: "white",
    fontWeight: "500",
  },
  Description: {
    color: "white",
    marginVertical: 10,
    fontSize: 20,
    fontWeight: "500",
  },
  itemDesc: {
    color: "white",
    fontSize: 14,
    lineHeight: 20,
  },
  buttonsContainer: {
    marginTop: 70,
    bottom: 0,
    paddingBottom: 40,
  },
  cartButton: {
    flexDirection: "row",
    backgroundColor: COLORS.CTAButtonBackground,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 8,
    marginTop: 15,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    borderRadius: 8,
    marginBottom: 10,
  },
  shopButton: {
    flexDirection: "row",
    backgroundColor: COLORS.handysGrey,
    paddingLeft: 15,
    height: 45,
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  madeBy: {
    fontSize: 12,
    color: "#A2A4A1",
    fontWeight: "500",
  },
  shopPic: {
    width: 35,
    height: 35,
    borderRadius: 100,
    marginLeft: 10,
  },
  shopName: {
    fontSize: 14,
    width: 130,
    marginLeft: 10,
    fontWeight: "500",
    color: "white",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  shop: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 20,
  },
});
