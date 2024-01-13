import { useState } from "react";
import { StyleSheet, View } from "react-native";
import StarRating from "react-native-star-rating-widget";
import { ItemOrderModel } from "../../models/ItemOrder";

interface Props {
  itemOrder: ItemOrderModel;
}

export default function ItemOrder({ itemOrder }: Props) {
  const [itemRating, setItemRating] = useState<number>(0);

  return (
    <View>
      <View></View>
      <View style={styles.starRating}>
        <StarRating rating={itemRating} onChange={setItemRating} color="white" starSize={25}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  starRating: {
    alignItems: "center",
  },
});
