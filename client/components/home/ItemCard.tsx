import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Item } from "../../models/Item";

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        style={{ width: 140, height: 162, borderRadius: 8}}
        source={{ uri: item.img_url ?? "" }}
      />
      <Text style={styles.itemName}>{item.name}</Text>
      <View style={styles.ratingContainer}>
        <MaterialIcons name="star-half" size={15} color="white" />
        <Text style={styles.rating}>{item.rating}</Text>
      </View>
      <View style={styles.priceIconContainer}>
        <Text style={styles.price}>JOD {item.base_price}</Text>
      </View>
    </TouchableOpacity>
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
