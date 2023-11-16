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
  } from "react-native";
  import { CommonBackgroundWithNoSafeArea } from "../../common/background";
  import CartItem from "../../components/cart/cartItem";
  
  export default function Community() {
    return (
      <CommonBackgroundWithNoSafeArea>
        <CartItem />
      </CommonBackgroundWithNoSafeArea>
    );
  }
  
  const styles = StyleSheet.create({});
  