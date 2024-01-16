import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { CommonScrollableBackground } from "../../common/background";
import { useEffect, useState } from "react";
import { GetItemsBycategory } from "../../api/ItemApi";
import ItemCard from "../../components/home/ItemCard";
import { getWishList } from "../../api/WishlistApi";
import COLORS from "../../common/colors";
import { Item } from "../../models/Item";

export default function CategoryItemsScreen({ route }: any) {
  const category = route.params.category;

  const [items, setItems] = useState<Item[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [loadingFav, setLoadingFav] = useState(false);
  const [favItems, setFavItems] = useState<any[]>([]);

  useEffect(() => {
    async function handleSearch() {
      setLoadingItems(true);
      await GetItemsBycategory(category.id).then((result) => {
        setItems(result);
        setLoadingItems(false);
      });
      await getWishList("ids").then((result) => {
        setFavItems(result);
        setLoadingFav(false);
      });
    }
    handleSearch();
  }, []);

  if (loadingItems || loadingFav) {
    return (
      <View style={styles.loadingPage}>
        <ActivityIndicator size={"large"} color={COLORS.normalText} />
      </View>
    );
  } else
    return (
      <CommonScrollableBackground>
        <View style={{ margin: 15, minHeight: "90%" }}>
          {loadingItems ? (
            <View
              style={{
                alignItems: "center",
                flex: 1,
                justifyContent: "center",
              }}
            >
              <ActivityIndicator size={"large"} color="white" />
            </View>
          ) : (
            <View style={{ marginTop: 15 }}>
              {items.length == 0 ? (
                <View style={styles.centered}>
                  <Image
                    source={require("../../assets/content-creation-monochromatic.png")}
                    style={styles.image}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      alignSelf: "center",
                      fontWeight: "500",
                      marginTop: 30,
                      color: "white",
                    }}
                  >
                    There are no items yet...
                  </Text>
                </View>
              ) : (
                <View style={{ gap: 15 }}>
                  <FlatList
                    data={items}
                    renderItem={({ item }) => (
                      <ItemCard
                        item={item}
                        isFavorite={favItems.includes(item.id)}
                        isEditable={false}
                      />
                    )}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    scrollEnabled={false}
                  />
                </View>
              )}
            </View>
          )}
        </View>
      </CommonScrollableBackground>
    );
}

const styles = StyleSheet.create({
  centered: {
    marginTop: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 260,
    height: 250,
    alignSelf: "center",
  },
  loadingPage: {
    backgroundColor: COLORS.commonBackground,
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
});
