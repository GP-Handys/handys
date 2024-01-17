import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import StarRating from "react-native-star-rating-widget";
import { ItemOrderModel } from "../../models/ItemOrder";
import { getItemById } from "../../api/ItemApi";
import { Item } from "../../models/Item";

interface Props {
  itemOrder: ItemOrderModel;
  onItemReviewChange: (itemId: number, rating: number) => void;
}

export default function ItemOrder({ itemOrder, onItemReviewChange }: Props) {
  const [itemRating, setItemRating] = useState<number>(0);
  const [item, setItem] = useState<Item>();

  const fetchItem = async () => {
    await getItemById(itemOrder.itemId).then((res) => {
      if (res.status === 200) {
        setItem(res.data);
      }
    });
  };

  useEffect(() => {
    fetchItem();
  }, []);

  return (
    <>
      {item && (
        <View style={{ marginHorizontal: 15 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.itemName}>{item?.name}</Text>
              <View style={{ marginRight: 5, marginTop: 5, marginBottom: 5 }}>
                <Text style={{ opacity: 0.25, color: "white" }}>
                  Customization:
                  {itemOrder.customization.length === 0
                    ? " This item is not customizable."
                    : " " + itemOrder.customization}
                </Text>
              </View>
            </View>
            <View>
              <Image
                source={{ uri: item?.img_url ?? "" }}
                style={styles.itemImage}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ fontSize: 13, color: "white", fontWeight: "bold" }}
                >
                  x{itemOrder.quantity}
                </Text>
                <Text style={styles.itemPrice}>
                  JOD {item?.base_price * itemOrder.quantity}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.starRating}>
            <StarRating
              rating={itemRating}
              onChange={(rating) => {
                setItemRating(rating);
                onItemReviewChange(itemOrder.itemId, rating);
              }}
              color="white"
              starSize={25}
            />
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  starRating: {
    alignItems: "center",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  itemName: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  itemPrice: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
  },
});
