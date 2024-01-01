
import { ScrollView } from "react-native";
import { CommonBackgroundWithNoSafeArea } from "../../common/background";
import CartItem from "../../components/cart/cartItem";
import CartTotal from "../../components/cart/cartTotal";


export default function Cart() {

  const items: any = [
    {
      name: "Metal Handcraft",
      price: 199.5,
      img: "../../assets/pic1.jpg",
      description: "bla bla bla cats :3"
    },
    {
      name: "wood",
      price: 122,
      img: "../../assets/pic1.jpg",
      description: "bla bla bla cats :3"
    }
  ];
  return (
    <CommonBackgroundWithNoSafeArea>
      <ScrollView>
        {items.map((item: any) => (
          <CartItem items={item} />
        ))}
      </ScrollView>
      <CartTotal />
    </CommonBackgroundWithNoSafeArea>
  );
}
