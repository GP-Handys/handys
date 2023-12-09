import { Pressable, View, Text, Image, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import retrieveImageUrlWithPathAndSet from "../../storage/retrieve";

export default function CategoryCard() {
  const [categoryImgUrl, setCategoryImgUrl] = useState<any | undefined>(undefined);

  useEffect(() => {
    const func = async () => {
      await retrieveImageUrlWithPathAndSet(
        "categories/bags-category.jpg",
        setCategoryImgUrl
      );
    };

    if (categoryImgUrl === undefined) {
      func();
    }
  }, []);

  return (
    <View>
      <Pressable>
        <Image style={styles.categoryImg} source={{ uri: categoryImgUrl }} />
      </Pressable>
      <Text style={styles.categoryName}>Wood</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  categoryName: {
    color: "white",
    fontSize: 11,
    marginTop: 12,
    textAlign: "center",
  },
  categoryImg: {
    borderRadius: 8,
    height: 70,
    width: 70,
  },
});