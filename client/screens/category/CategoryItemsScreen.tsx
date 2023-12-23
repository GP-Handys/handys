import { View, Text, Image, StyleSheet } from "react-native";
import { CommonScrollableBackground } from "../../common/background";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import { GetItemsBycategory } from "../../api/ItemApi";

export default function CategoryItemsScreen({ route }: any) {
  const category = route.params.category;

  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);

  useEffect(() => {
    async function handleSearch() {
      setLoadingItems(true);
      await GetItemsBycategory(category.id).then((result) => {        
        setItems(result);
        setLoadingItems(false);
      });
    }
    handleSearch();
  }, []);

  return (
    <CommonScrollableBackground>
      <View style={{ margin: 15, minHeight: "90%", }}>
        {loadingItems ? (
          <View
            style={{
              alignItems: "center",
              flex: 1,
              justifyContent:"center",
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
                {/* {items.map((item: any) => (
                  <ItemCard key={item.id} item={item} />
                ))} */}
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
});
