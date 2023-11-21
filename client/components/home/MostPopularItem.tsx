import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {

}

export default function MostPopularItem({}) {
  return (
    <View style={styles.container}>
      <Pressable>
        <Image source={require("../../assets/popular.png")} />
      </Pressable>
      <Text style={styles.itemName}>Embroidery</Text>
      <View style={styles.ratingContainer}>
        <MaterialIcons name="star-half" size={15} color="white" />
        <Text style={styles.rating}>4</Text>
      </View>
      <View style={styles.priceIconContainer}>
        <Text style={styles.price}>JOD 118</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 30,
    marginTop: 20,
    paddingBottom: 40
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
