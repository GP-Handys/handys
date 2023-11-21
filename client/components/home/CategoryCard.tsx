import { Pressable, View, Text, Image, StyleSheet } from "react-native";

export default function CategoryCard() {
  return (
    <View>
      <Pressable>
        <Image style={styles.categoryImg} source={require("../../assets/wood.png")}/>
      </Pressable>
      <Text style={styles.categoryName}>
        Wood
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryName: {
    color: "white",
    fontSize: 11,
    marginTop: 12,
    textAlign: "center"
  },
  categoryImg: {
    borderRadius: 8
  }
})
