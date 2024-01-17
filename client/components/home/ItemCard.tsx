import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Item } from "../../models/Item";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { addToWishList, removeFromWishList } from "../../api/WishlistApi";
import { useNavigation } from "@react-navigation/native";
import { StackProps } from "../navigation/NavigationStack";
import COLORS from "../../common/colors";

interface ItemCardProps {
  item: Item;
  isFavorite: boolean;
  isEditable: boolean;
}

export default function ItemCard({
  item,
  isFavorite,
  isEditable,
}: ItemCardProps) {
  const [favorite, setFavorite] = useState(isFavorite);
  const navigation = useNavigation<StackProps["navigation"]>();
  const [disableClick , setDisableClick] = useState(false)

  async function handleFavorite() {
    setDisableClick(true)
    if (favorite) {
      setFavorite(false);
      await removeFromWishList(item.id);
      setDisableClick(false)
    } else {
      setFavorite(true);
      await addToWishList(item.id);
      setDisableClick(false)
    }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ItemScreen", { item: item, favorite: favorite })
        }
      >
        {item.img_url === null ? (
          <Image
            source={require("../../assets/logo.png")}
            style={{ width: 140, height: 162, borderRadius: 8 }}
          />
        ) : (
          <Image
            source={{ uri: item.img_url }}
            style={{ width: 140, height: 162, borderRadius: 8 }}
          />
        )}
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          <MaterialIcons name="star-half" size={15} color="white" />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={styles.priceIconContainer}>
          <Text style={styles.price}>JOD {item?.base_price}</Text>
        </View>
        <TouchableOpacity>
          {favorite ? (
            <FontAwesome
              name="heart"
              size={20}
              color="#854627"
              onPress={handleFavorite}
              disabled={disableClick}
            />
          ) : (
            <FontAwesome
              name="heart-o"
              size={20}
              color="#854627"
              onPress={handleFavorite}
              disabled={disableClick}
            />
          )}
        </TouchableOpacity>
      </View>
      {isEditable && (
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            navigation.navigate("EditItemScreen", {
              shopId: item.shopId,
              item: item,
            });
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Edit</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  itemName: {
    marginTop: 7,
    color: COLORS.itemDetails,
    fontWeight: "bold",
    fontSize: 15,
    flexWrap:"wrap-reverse",
    maxWidth:140
  },
  ratingContainer: {
    backgroundColor: COLORS.CTAButtonBackground,
    width: 35,
    marginTop: 5,
    borderRadius: 4,
    flex: 1,
    flexDirection: "row",
    padding:1,
  },
  rating: {
    color: "white",
    fontSize: 13,
    position: "absolute",
    right: 5,
  },
  priceIconContainer: {
    marginTop: 6,
  },
  price: {
    color: COLORS.itemDetails,
    fontWeight: "900",
    fontSize: 14,
  },
  editButton: {
    borderRadius: 5,
    backgroundColor: COLORS.handysGrey,
    width: "100%",
    height: 25,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
