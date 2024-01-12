import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Order } from "../../models/Order";
import { getOrdersForUser } from "../../api/OrderApi";
import { ActivityIndicator } from "react-native-paper";
import COLORS from "../../common/colors";
import MyOrder from "../../components/profile/MyOrder";
import ThematicBreak from "../../components/ThematicBreak";

export function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  const fetchOrders = async () => {
    await getOrdersForUser().then((result) => {
      if (result.status == 200) {
        setOrders(result.data);
        setIsFetching(false);
      }
    });
  };

  useEffect(() => {
    fetchOrders();
  });

  if (isFetching) {
    return (
      <View style={styles.loadingPage}>
        <ActivityIndicator size={"large"} color="white" />
      </View>
    );
  } else {
    return (
      <View
        style={{
          backgroundColor: COLORS.commonBackground,
          flex: 1,
          paddingHorizontal: 15,
        }}
      >
        <FlatList
          data={orders}
          renderItem={({ item }) => (
            <MyOrder shopId={item.shopId} orderId={item.id} />
          )}
          ItemSeparatorComponent={() => {
            return (
              <View style={{ marginVertical: 20 }}>
                <ThematicBreak marginHorizontal={15} />
              </View>
            );
          }}
        />
      </View>
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
});
