import { ScrollView, Text, TouchableOpacity, View , StyleSheet, Pressable} from "react-native";
import { CommonBackgroundWithNoSafeArea } from "../../common/background";
import CartItem from "../../components/cart/CartItem";
import { useEffect, useState } from "react";
import COLORS from "../../common/colors";

export default function Cart() {
  const [itemPrices, setItemPrices] = useState<any>({});
  const [totalPrice, setTotalPrice] = useState(0);

  function countTotal() {
    let total = 0;
    for (const itemId in itemPrices) {
      if (Object.prototype.hasOwnProperty.call(itemPrices, itemId)) {
        total += itemPrices[itemId];
      }
    }
    setTotalPrice(total);
  }

  useEffect(() => {
    countTotal();
  }, []);

  const updateItemPrice = (itemId: number, price: number) => {
    itemPrices[itemId]=price
    setItemPrices(itemPrices);
    countTotal()
  };

  const items: any = [
    {
      id: 1,
      name: "Metal Handcraft",
      base_price: 199.5,
      img: "https://cdn.jetphotos.com/400/3/45417_1379168336.jpg",
      description: "bla bla bla cats :3",
    },
    {
      id: 2,
      name: "wood",
      base_price: 122,
      img: "https://cdn.jetphotos.com/400/3/45417_1379168336.jpg",
      description: "bla bla bla cats :3",
    },
  ];
  return (
    <CommonBackgroundWithNoSafeArea>
      <ScrollView style={{ marginHorizontal: 30 }}>
        {items.map((item: any) => (
          <CartItem item={item} key={item.id} updateTotal={updateItemPrice} />
        ))}
      </ScrollView>

      <View style={styles.container}>
        <View style={styles.priceContainer}>
          <Text style={styles.TotalPriceLable}>Total Price</Text>
          <Text style={styles.price}>JOD {totalPrice}</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.checkout}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </CommonBackgroundWithNoSafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginBottom:20,
    gap:5
  },
  priceContainer:{
    justifyContent:"space-between",
    flexDirection:"row",
    alignItems:"baseline"
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
  button:{
    height:45,backgroundColor:COLORS.CTAButtonBackground,borderRadius:10,alignItems:"center",justifyContent:"center"
  },
  checkout:{
    fontSize:20,
    fontWeight:"500"
  }
  
  
});