import { Pressable, View, Text, Image, StyleSheet } from "react-native";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";

export default function CategoryCard() {
  const [url, setUrl] = useState();
  
  useEffect(() => {
    const func = async () => {
      const storage = getStorage();
      const storageRef = ref(storage, "categories/bags-category.jpg");
      await getDownloadURL(storageRef).then((url: any) => {
        setUrl(url);
      });
    };

    if (url === undefined) {
      func();
    }
  }, []);

  return (
    <View>
      <Pressable>
        <Image
          style={styles.categoryImg}
          source={{uri: url}}
        />
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
