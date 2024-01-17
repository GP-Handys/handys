import { View, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { CommonBackgroundWithNoSafeArea } from "../../common/background";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackProps } from "../../components/navigation/NavigationStack";
import { getWishList } from "../../api/WishlistApi";
import ItemCard from "../../components/home/ItemCard";
import COLORS from "../../common/colors";

export default function WishlistScreen() {
  const navigation = useNavigation<StackProps["navigation"]>();
  const [loading, setLoading] = useState(false);
  const [items , setItems] = useState();

  useEffect(() => {
    setLoading(true);

    const fetchItems = async () => {
      await getWishList("items").then((result)=>{
        setItems(result[0]);
        setLoading(false)
      })
    };

    navigation.addListener("focus", fetchItems);
  }, []);

  return (
    <CommonBackgroundWithNoSafeArea>
      <View style={{marginHorizontal:20}}>
      {(loading)? (
          <View
            style={{
              alignItems: "center",
              flex: 1,
              marginTop: "50%",
            }}
          >
            <ActivityIndicator size={"large"} color={COLORS.normalText} />
          </View>
        ) : (
          <View style={{ marginTop: 15 }}>
              <FlatList
                key={"_"}
                keyExtractor={(item) => "_" + item.id}
                data={items}
                renderItem={({ item }) => <ItemCard item={item} isFavorite={true} isEditable={false}/>}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between" }}
              />
          </View>
        )}
      </View>
    </CommonBackgroundWithNoSafeArea>
  );
}

const styles = StyleSheet.create({});
