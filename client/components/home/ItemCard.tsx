import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Item } from "../../models/Item";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { addToWishList, removeFromWishList } from "../../api/WishlistApi";

interface ItemCardProps {
  item: Item;
  isFavorite: boolean;
}

export default function ItemCard({ item,isFavorite }: ItemCardProps) {
  const [favorite,setFavorite] = useState(isFavorite);
  
  async function handleFavorite() { 
    if(favorite){
      setFavorite(false);
      await removeFromWishList(item.id);
    }
    else{
      setFavorite(true);
      await addToWishList(item.id);
    }
    
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          style={{ width: 140, height: 162, borderRadius: 8 }}
          source={{ uri: item.img_url ?? "" }}
        />
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
          <Text style={styles.price}>JOD {item.base_price}</Text>
        </View>
        <TouchableOpacity>
          {favorite ? (
            <FontAwesome name="heart" size={24} color="red" onPress={handleFavorite}/>
          ) : (
            <FontAwesome name="heart-o" size={24} color="white" onPress={handleFavorite}/>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  itemName: {
    marginTop: 7,
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  ratingContainer: {
    backgroundColor: "#464949",
    width: 35,
    marginTop: 5,
    borderRadius: 3,
    flex: 1,
    flexDirection: "row",
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
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
