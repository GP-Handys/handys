import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import { CommonBackgroundWithNoSafeArea } from "../../common/background";
import CartItem from "../../components/cart/CartItem";
import { useEffect, useState } from "react";
import COLORS from "../../common/colors";
import { getCart } from "../../api/CartApi";
import { useNavigation } from "@react-navigation/native";
import { StackProps } from "../../components/navigation/NavigationStack";

import { ActivityIndicator } from "react-native-paper";

export default function Cart() {
  const navigation = useNavigation<StackProps["navigation"]>();

  const [itemPrices, setItemPrices] = useState<any>({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState<any>();
  const [items, setItems] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    let data = await getCart();

    setCartItems(data[0]);
    setItems(data[1]);
    setLoading(false);
  };

  useEffect(() => {
    getData();
    countTotal();
    navigation.addListener("focus", getData);
  }, []);

  const updateItemPrice = (itemId: number, price: number) => {
    itemPrices[itemId] = price;
    setItemPrices(itemPrices);
    countTotal();
  };

  function countTotal() {
    let total = 0;
    for (const itemId in itemPrices) {
      if (Object.prototype.hasOwnProperty.call(itemPrices, itemId)) {
        total += itemPrices[itemId];
      }
    }
    setTotalPrice(total);
  }

  if (loading) {
    return (
      <View style={styles.loadingPage}>
        <ActivityIndicator size={"large"} color="white" />
      </View>
    );
  } else
    return (
      <CommonBackgroundWithNoSafeArea>
        <FlatList style={{marginHorizontal:30,marginTop:10}}
        scrollEnabled
          data={cartItems}
          renderItem={({ item }) => (
            <CartItem cartItem={item} item={items[item.item_id]} updateTotal={updateItemPrice} />
          )}
        />

        <View style={styles.container}>
          <View style={styles.priceContainer}>
            <Text style={styles.TotalPriceLable}>Total Price</Text>
            <Text style={styles.price}>JOD {totalPrice}</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
            }}
          >
            <Text style={styles.checkout}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </CommonBackgroundWithNoSafeArea>
    );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginBottom: 20,
    gap: 5,
  },
  priceContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "baseline",
  },
  TotalPriceLable: {
    color: "gray",
    fontSize: 13,
    fontWeight: "700",
  },
  price: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    height: 45,
    backgroundColor: COLORS.CTAButtonBackground,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  checkout: {
    fontSize: 20,
    fontWeight: "500",
  },
  loadingPage: {
    backgroundColor: COLORS.commonBackground,
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
});
