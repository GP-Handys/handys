import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    Pressable,
    Alert,
    TouchableOpacity,
    ScrollView,
  } from "react-native";
  import { CommonBackgroundWithNoSafeArea } from "../../common/background";
  import CartItem from "../../components/cart/cartItem";
  import CartTotal from "../../components/cart/cartTotal";

  
  export default function Cart() {

    return (
      <CommonBackgroundWithNoSafeArea>
        <ScrollView>
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        </ScrollView>
        <CartTotal />
      </CommonBackgroundWithNoSafeArea>
    );
  }
  
  const styles = StyleSheet.create({});
  