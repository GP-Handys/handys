import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { CommonScrollableBackground } from "../../common/background";
import { View } from "react-native";
import STRINGS from "../../strings/strings";
import CategoryCard from "../../components/home/CategoryCard";
import ShopCard from "../../components/home/ShopCard";
import MostPopularItem from "../../components/home/ItemCard";
import { Shop } from "../../models/Shop";
import { useEffect, useState } from "react";
import { Item } from "../../models/Item";
import { getRecommendedShops } from "../../api/ShopApi";
import { getMostPopularItems } from "../../api/ItemApi";
import ItemCard from "../../components/home/ItemCard";
import { Category } from "../../models/Category";

export default function Home() {
  const [recommendedShops, setRecommendedShops] = useState<Shop[]>([]);
  const [mostPopularItems, setMostPopularItems] = useState<Item[]>([]);
  const [Categories, setCategories] = useState<Category[]>([{id:1,category_name:"hi",category_pfp:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/330px-Image_created_with_a_mobile_phone.png"}]);

  const fetcRecommendedShops = async () => {
    await getRecommendedShops().then((result) => {
      if (result.status === 200) {
        setRecommendedShops(result.data);
      }
    });
  };
  const fetchMostPopularItems = async () => {
    await getMostPopularItems().then((result) => {
      if (result.status === 200) {
        setMostPopularItems(result.data);
      }
    });
  };
  useEffect(() => {
    const fetchScreenData = async () => {
      await fetchMostPopularItems();
      await fetcRecommendedShops();
    };

    fetchScreenData();
  }, []);

  return (
    <CommonScrollableBackground>
      <View>
        <ImageBackground
          source={require("../../assets/homeBanner.png")}
          style={styles.banner}
        >
          <Text style={styles.homeBannerTitleContainer}>
            {STRINGS.homeBannerTitle}
          </Text>
          <Text style={styles.homeBannerSubtitleContainer}>
            {STRINGS.homeBannerSubtitle}
          </Text>
        </ImageBackground>
      </View>

      <View style={styles.pageContainer}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          data={Categories}
          renderItem={({ item }) => <CategoryCard category={item} />}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        />

        <Text style={styles.sectionTitle}>Recommended Shops</Text>
        <FlatList
          data={recommendedShops}
          renderItem={({ item }) => <ShopCard shop={item} />}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        />

        <Text style={styles.sectionTitle}>Most Popular Items</Text>
        <FlatList
          data={mostPopularItems}
          renderItem={({ item }) => {
            return <ItemCard item={item} />;
          }}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      </View>
    </CommonScrollableBackground>
  );
}

const styles = StyleSheet.create({
  banner: {
    width: "100%",
    paddingBottom: 24,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  homeBannerTitleContainer: {
    fontWeight: "bold",
    color: "white",
    fontSize: 35,
    marginTop: 46,
  },
  homeBannerSubtitleContainer: {
    color: "white",
    marginTop: 17,
    paddingHorizontal: 5,
    fontSize: 15,
  },
  sectionTitle: {
    marginVertical: 10,
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  pageContainer: {
    marginHorizontal: 30,
  },
});
