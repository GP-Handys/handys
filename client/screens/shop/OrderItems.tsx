import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { User } from "../../models/User";
import { getItemsForOrderId, getOrderById } from "../../api/OrderApi";
import { Order } from "../../models/Order";
import { useEffect, useState } from "react";
import { CommonScrollableBackground } from "../../common/background";
import COLORS from "../../common/colors";
import ThematicBreak from "../../components/ThematicBreak";
import { ItemOrderModel } from "../../models/ItemOrder";
import OrderItem from "../../components/shop/OrderItem";

export default function ShopOrderItemsScreen({ route }: any) {
  const user: User = route.params.user;
  const orderId: number = route.params.orderId;
  const [order, setOrder] = useState<Order>();
  const [items, setItems] = useState<ItemOrderModel[]>([]);
  const [isFetchingItems, setIsFetchingItems] = useState<boolean>(true);
  const [isFetchingOrder, setIsFetchingOrder] = useState<boolean>(true);

  const fetchOrderById = async () => {
    await getOrderById(orderId).then((res) => {
      if (res.status === 200) {
        setOrder(res.data);
        setIsFetchingOrder(false);
      }
    });
  };

  const fetchItemsForOrderId = async () => {
    await getItemsForOrderId(orderId).then((res) => {
      if (res.status === 200) {
        setItems(res.data);
        setIsFetchingItems(false);
      }
    });
  };

  useEffect(() => {
    fetchOrderById();
    fetchItemsForOrderId();
  }, []);

  if (isFetchingItems || isFetchingOrder) {
    return (
      <View style={styles.loadingPage}>
        <ActivityIndicator size={"large"} color={COLORS.normalText} />
      </View>
    );
  } else {
    return (
      <CommonScrollableBackground>
        <View style={styles.userInfoContainer}>
          <View>
            {user.pfp_url == null ? (
              <Image
                source={require("../../assets/default_profile_img.jpg")}
                style={styles.userPfp}
              />
            ) : (
              <Image
                source={{ uri: user.pfp_url ?? "" }}
                style={styles.userPfp}
              />
            )}
          </View>
          <View style={styles.userInfo}>
            <Text
              style={{
                color: COLORS.normalText,
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: 5,
              }}
            >
              {user.name}
            </Text>
            <Text
              style={{
                color: COLORS.normalText,
                fontSize: 11,
                fontWeight: "bold",
                marginBottom: 5,
              }}
            >
              Road: {order?.street_name}
            </Text>
            <Text
              style={{
                color: COLORS.normalText,
                fontSize: 11,
                fontWeight: "bold",
                marginBottom: 5,
              }}
            >
              Building No.: {order?.building_number}
            </Text>
            <Text
              style={{
                color: COLORS.normalText,
                fontSize: 11,
                fontWeight: "bold",
                marginBottom: 5,
              }}
            >
              Apt. No.: {order?.apt_number}
            </Text>
            <Text
              style={{
                color: COLORS.normalText,
                fontSize: 11,
                fontWeight: "bold",
                marginBottom: 5,
              }}
            >
              Floor: {order?.floor}
            </Text>
            <Text
              style={{
                color: COLORS.normalText,
                fontSize: 11,
                fontWeight: "bold",
              }}
            >
              Phone: {order?.phone_number}
            </Text>
          </View>
        </View>
        {order?.instructions != null && (
          <View style={styles.specialInstructions}>
            <Text
              style={{
                color: COLORS.normalText,
                fontSize: 12,
                fontWeight: "bold",
              }}
            >
              Special instructions: {order?.instructions}
            </Text>
          </View>
        )}
        <View style={styles.flatListTitle}>
          <Text
            style={{
              color: COLORS.normalText,
              fontWeight: "bold",
              fontSize: 24,
            }}
          >
            Ordered Items
          </Text>
        </View>
        <View style={{ marginBottom: 40 }}>
          <ThematicBreak marginHorizontal={30} />
        </View>
        <View style={{marginHorizontal: 15}}>
          <FlatList
            data={items}
            renderItem={({ item }) => <OrderItem itemOrder={item} />}
            scrollEnabled={false}
            ItemSeparatorComponent={() => {
              return (
                <View style={{ marginVertical: 20 }}>
                  <ThematicBreak marginHorizontal={15} />
                </View>
              );
            }}
          />
        </View>
      </CommonScrollableBackground>
    );
  }
}

const styles = StyleSheet.create({
  loadingPage: {
    backgroundColor: COLORS.commonBackground,
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  userInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
    marginTop: 40,
    marginHorizontal: 25,
  },
  userPfp: {
    borderRadius: 6.5,
    height: 140,
    width: 140,
  },
  userInfo: {
    backgroundColor: COLORS.shopOrderUserInfoBox,
    borderRadius: 6.5,
    padding: 10,
    flex: 1,
  },
  specialInstructions: {
    backgroundColor: COLORS.shopOrderUserInfoBox,
    borderRadius: 6.5,
    padding: 10,
    marginTop: 10,
    marginHorizontal: 25,
    flex: 1,
  },
  flatListTitle: {
    marginTop: 65,
    marginBottom: 15,
    alignItems: "center",
  },
});
