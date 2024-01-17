import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  Image,
} from "react-native";
import { Order } from "../../models/Order";
import { getOrdersForUser } from "../../api/OrderApi";
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
  }, []);

  if (isFetching) {
    return (
      <View style={styles.loadingPage}>
        <ActivityIndicator size={"large"} color={COLORS.normalText} />
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
        {orders.length === 0 ? (
          <View style={styles.container}>
            <Text style={styles.textIcon}>Oh...</Text>
            <Image
              style={styles.image}
              source={require("../../assets/sad.png")}
            />
            <Text style={styles.textIcon}>You haven't placed any orders yet :(</Text>
          </View>
        ) : (
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
        )}
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
  textIcon: {
    marginVertical: 20,
    color: "#854627",
    fontWeight: "500",
    fontSize: 20,
    alignSelf: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: "center",
  },
});
