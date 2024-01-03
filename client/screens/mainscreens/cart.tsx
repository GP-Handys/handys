
import { ScrollView } from "react-native";
import { CommonBackgroundWithNoSafeArea } from "../../common/background";
import CartItem from "../../components/cart/CartItem";
import CartTotal from "../../components/cart/cartTotal";
import { useState } from "react";

export default function Cart() {
  const [itemsTotal,setItemTotal] = useState(0);

  const items: any = [
    {
      id:1,
      name: "Metal Handcraft",
      base_price: 199.5,
      img: "https://cdn.jetphotos.com/400/3/45417_1379168336.jpg",
      description: "bla bla bla cats :3"
    },
    {
      id:2,
      name: "wood",
      price: 122,
      img: "https://cdn.jetphotos.com/400/3/45417_1379168336.jpg",
      description: "bla bla bla cats :3"
    }
  ];
  return (
    <CommonBackgroundWithNoSafeArea>
      <ScrollView style={{marginHorizontal:30}}>
        {items.map((item: any) => (
          <CartItem item={item} key={item.id}/>
        ))}
      </ScrollView>
      <CartTotal />
    </CommonBackgroundWithNoSafeArea>
  );
}
