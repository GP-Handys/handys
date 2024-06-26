import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { CommonBackgroundWithNoSafeArea } from "../../common/background";
import CartItem from "../../components/cart/cartItem";
import { useEffect, useState } from "react";
import COLORS from "../../common/colors";
import { getCart, removeFromcart } from "../../api/CartApi";
import { useNavigation } from "@react-navigation/native";
import { StackProps } from "../../components/navigation/NavigationStack";

export default function Cart() {
  const navigation = useNavigation<StackProps["navigation"]>();
  const [itemPrices, setItemPrices] = useState<any>({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState<any>([]);
  const [items, setItems] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    let data = await getCart();
    setCartItems(data[0]);
    setItems(data[1]);
    setLoading(false);
  };

  useEffect(() => {
    getData();
    navigation.addListener("focus", getData);
  }, []);

  const updateItemPrice = (itemId: number, price: number) => {
    itemPrices[itemId] = price;
    setItemPrices(itemPrices);
    countTotal();
  };

  const removeItem = (cartId: any) => {
    removeFromcart(cartId);
    let editedcartItems = cartItems.filter(
      (obj: { id: any }) => obj.id !== cartId
    );
    setCartItems(editedcartItems);
    countTotal();
  };

  function countTotal() {
    let total = 0;
    if (cartItems) {
      cartItems.forEach((element: any) => {
        total += itemPrices[element.item_id];
      });
    }
    setTotalPrice(total);
  }

  if (loading) {
    return (
      <View style={styles.loadingPage}>
        <ActivityIndicator size={"large"} color={COLORS.normalText} />
      </View>
    );
  } else if (cartItems && cartItems.length == 0) {
    return (
      <CommonBackgroundWithNoSafeArea>
        <View style={styles.Emptycontainer}>
          <Text
            style={{
              fontSize: 30,
              color: COLORS.normalText,
              fontWeight: "600",
              marginBottom: 20,
            }}
          >
            Your Cart is Empty
          </Text>
          <Image
            style={styles.image}
            source={require("../../assets/pana.png")}
          />
          <Text style={styles.textIcon}>Add some items to your cart.</Text>
        </View>
      </CommonBackgroundWithNoSafeArea>
    );
  } else
    return (
      <CommonBackgroundWithNoSafeArea>
        <FlatList
          style={{ marginHorizontal: 30, marginTop: 10 }}
          scrollEnabled
          data={cartItems}
          renderItem={({ item }) => (
            <CartItem
              cartItem={item}
              item={items[item.item_id]}
              updateTotal={updateItemPrice}
              removeItem={removeItem}
            />
          )}
        />
        <View style={styles.container}>
          <View style={styles.priceContainer}>
            <Text style={styles.TotalPrice}>Total Price</Text>
            <Text style={styles.TotalPrice}>JOD {totalPrice}</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("Map", { totalAmount: totalPrice });
              setTotalPrice(0);
              setLoading(true);
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
  TotalPrice: {
    color: COLORS.normalText,
    fontSize: 16,
    fontWeight: "500",
  },
  button: {
    height: 45,
    backgroundColor: COLORS.CTAButtonBackground,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  checkout: {
    color:'white',
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
  textIcon: {
    marginTop: 20,
    color: COLORS.normalText,
    fontWeight: "500",
    fontSize: 20,
  },
  Emptycontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  okay: {
    backgroundColor: COLORS.CTAButtonBackground,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 8,
  },
  image: {
    width: 300,
    height: 300,
  },
});
