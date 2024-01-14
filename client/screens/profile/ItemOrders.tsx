import {
  View,
  Image,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Shop } from "../../models/Shop";
import COLORS from "../../common/colors";
import StarRating from "react-native-star-rating-widget";
import { useEffect, useState } from "react";
import { CommonScrollableBackground } from "../../common/background";
import ThematicBreak from "../../components/ThematicBreak";
import { getItemsForOrderId } from "../../api/OrderApi";
import ItemOrder from "../../components/profile/ItemOrder";
import { submitItemRating, submitShopRating } from "../../api/Rating";
import { useNavigation } from "@react-navigation/native";
import { StackProps } from "../../components/navigation/NavigationStack";

export function ItemOrderScreen({ route }: any) {
  const navigation = useNavigation<StackProps["navigation"]>();
  const orderId: number = route.params.orderId;
  const shop: Shop = route.params.shop;
  const [shopRating, setShopRating] = useState<number>(0);
  const [itemOrders, setItemOrders] = useState<any[]>([]);
  const [isFetchingItems, setIsFetchingItems] = useState<boolean>(false);
  const [itemReviews, setItemReviews] = useState<{ [itemId: number]: number }>(
    {}
  );

  const handleItemReviewChange = (itemId: number, rating: number) => {
    setItemReviews((prevItemReviews) => ({
      ...prevItemReviews,
      [itemId]: rating,
    }));
  };

  const handleSubmitShopRating = async () => {
    await submitShopRating(shop.id, shopRating);
  };

  const handleSubmitItemsRating = async () => {
    for (const [itemId, rating] of Object.entries(itemReviews)) {
      await submitItemRating(parseInt(itemId), rating);
    }
  };

  const fetchItemsForOrderId = async () => {
    await getItemsForOrderId(orderId).then((res) => {
      if (res.status === 200) {
        setItemOrders(res.data);
        setIsFetchingItems(false);
      }
    });
  };

  useEffect(() => {
    fetchItemsForOrderId();
  }, []);

  return (
    <CommonScrollableBackground>
      {shop && (
        <>
          <Image
            source={{ uri: shop?.pfp_url ?? "" }}
            style={styles.shopImage}
          />
          <View style={styles.shopFooter}>
            <Text style={styles.shopName}>{shop.name}</Text>
            <StarRating
              rating={shopRating}
              onChange={setShopRating}
              starSize={25}
              color="white"
            />
          </View>
        </>
      )}
      <Text style={styles.screenDescription}>
        Please provide feedback to help improve the shop and the items in the
        future.
      </Text>
      <View style={{ marginVertical: 10 }}>
        <ThematicBreak />
      </View>
      <FlatList
        data={itemOrders}
        renderItem={({ item }) => (
          <ItemOrder
            itemOrder={item}
            onItemReviewChange={handleItemReviewChange}
          />
        )}
        scrollEnabled={false}
        ItemSeparatorComponent={() => {
          return (
            <View style={{ marginVertical: 20 }}>
              <ThematicBreak marginHorizontal={15} />
            </View>
          );
        }}
      />
      <View style={{ marginHorizontal: 38, paddingBottom: 50 }}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            handleSubmitShopRating();
            handleSubmitItemsRating();
            navigation.pop();
            Alert.alert("Thank you for your feedback!");
          }}
        >
          <Text style={{ color: "black", fontWeight: "bold", fontSize: 18.44 }}>
            Submit Rating
          </Text>
        </TouchableOpacity>
      </View>
    </CommonScrollableBackground>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.commonBackground,
    flex: 1,
    paddingHorizontal: 15,
  },
  shopImage: {
    width: "100%",
    aspectRatio: 3 / 2,
  },
  shopFooter: {
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shopName: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  screenDescription: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 25,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: COLORS.CTAButtonBackground,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    height: 41,
    borderRadius: 8,
  },
});
