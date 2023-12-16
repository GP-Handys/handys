import { Image } from "react-native-elements";
import {
  CommonBackgroundWithSafeArea,
  CommonScrollableBackground,
} from "../../common/background";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import COLORS from "../../common/colors";

export default function ShopScreen({ route }: any) {
  const { shopId } = route.params;
  return (
    <Text>SHOP ID IS {shopId}</Text>
    // <CommonScrollableBackground>
    //   <CommonBackgroundWithSafeArea>
    //     <View style={styles.shopHeader}>
    //       <Text style={styles.shopNameHeader}>Crafter's Store</Text>
    //       <TouchableOpacity style={styles.addItemButton}>
    //         <Text style={{ fontSize: 16, fontWeight: "500" }}>Add item</Text>
    //       </TouchableOpacity>
    //     </View>
    //   </CommonBackgroundWithSafeArea>
    //   <Image
    //     source={require("../../assets/crafter.png")}
    //     style={styles.shopImage}
    //   />
    //   <View></View>
    //   {/* <FlatList/> */}
    // </CommonScrollableBackground>
  );
}

const styles = StyleSheet.create({
  shopHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  shopNameHeader: {
    fontSize: 24,
    color: "white",
    fontWeight: "500",
    marginLeft: 15,
  },
  addItemButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.CTAButtonBackground,
    marginRight: 20,
    paddingHorizontal: 15,
    height: 37,
    borderRadius: 6,
  },
  shopImage: {
    width: "100%",
    height: 200,
  },
});
