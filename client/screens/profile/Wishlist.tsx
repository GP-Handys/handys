import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  Text,
} from "react-native";
import { CommonBackgroundWithNoSafeArea } from "../../common/background";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackProps } from "../../components/navigation/NavigationStack";
import { getWishList } from "../../api/WishlistApi";
import ItemCard from "../../components/home/ItemCard";
import COLORS from "../../common/colors";
import { Item } from "../../models/Item";

export default function WishlistScreen() {
  const navigation = useNavigation<StackProps["navigation"]>();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    setLoading(true);

    const fetchItems = async () => {
      await getWishList("items").then((result) => {
        setItems(result[0]);
        setLoading(false);
      });
    };

    navigation.addListener("focus", fetchItems);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingPage}>
        <ActivityIndicator size={"large"} color={COLORS.normalText} />
      </View>
    );
  } else {
    return (
      <CommonBackgroundWithNoSafeArea>
        {items?.length === 0 ? (
          <View style={styles.container}>
            <Text style={styles.textIcon}>Oh...</Text>
            <Image
              style={styles.image}
              source={require("../../assets/sad.png")}
            />
            <Text style={styles.textIcon}>
              Your wishlist is empty :(
            </Text>
          </View>
        ) : (
          <View style={{ marginHorizontal: 20 }}>
            <View style={{ marginTop: 15 }}>
              <FlatList
                key={"_"}
                keyExtractor={(item) => "_" + item.id}
                data={items}
                renderItem={({ item }) => (
                  <ItemCard item={item} isFavorite={true} isEditable={false} />
                )}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between" }}
              />
            </View>
          </View>
        )}
      </CommonBackgroundWithNoSafeArea>
    );
  }
}

const styles = StyleSheet.create({
  loadingPage: {
    backgroundColor: COLORS.commonBackground,
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  textIcon: {
    marginVertical: 20,
    color: "#854627",
    fontWeight: "500",
    fontSize: 20,
    alignSelf: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: "center",
  },
});
