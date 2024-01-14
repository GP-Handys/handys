import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, ActivityIndicator } from "react-native";
import { Order } from "../../models/Order";
import { getOrdersForShopId, getOrdersForUser } from "../../api/OrderApi";
import COLORS from "../../common/colors";

import ThematicBreak from "../../components/ThematicBreak";
import ShopOrder from "../../components/shop/ShopOrder";

export function ShopOrders({ route }: any) {
  const shopId: number = route.params.shopId;
  const [orders, setOrders] = useState<Order[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  const fetchOrders = async () => {
    await getOrdersForShopId(shopId).then((result) => {
      if (result.status == 200) {
        setOrders(result.data);
        setIsFetching(false);
      }
    });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

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
            <ShopOrder userId={item.userId} orderId={item.id} />
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
