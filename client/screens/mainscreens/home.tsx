import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import { CommonScrollableBackground } from "../../common/background";
import { View } from "react-native";
import STRINGS from "../../strings/strings";
import CategoryCard from "../../components/home/CategoryCard";
import ShopCard from "../../components/home/ShopCard";
import { Shop } from "../../models/Shop";
import { useEffect, useState } from "react";
import { Item } from "../../models/Item";
import { getRecommendedShops } from "../../api/ShopApi";
import { getMostPopularItems } from "../../api/ItemApi";
import ItemCard from "../../components/home/ItemCard";
import { Category } from "../../models/Category";
import { getWishList } from "../../api/WishlistApi";
import { useNavigation } from "@react-navigation/native";
import { StackProps } from "../../components/navigation/NavigationStack";
import { getCategories } from "../../api/CategoryApi";
import COLORS from "../../common/colors";

export default function Home() {
  const navigation = useNavigation<StackProps["navigation"]>();
  const [recommendedShops, setRecommendedShops] = useState<Shop[]>([]);
  const [mostPopularItems, setMostPopularItems] = useState<Item[]>([]);
  const [favItems, setFavItems] = useState<any[]>([]);
  const [Categories, setCategories] = useState<Category[]>();

  const [loadingRecommended, setLoadingRecommended] = useState(true);
  const [loadingCategory, setLoadingCategory] = useState(true);
  const [loadingFavItems, setLoadingFavItems] = useState(true);
  const [loadingMostPopular, setLoadingMostPopular] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);

  const fetchRecommendedShops = async () => {
    await getRecommendedShops().then((result) => {
      if (result.status === 200) {
        setRecommendedShops(result.data);
        setLoadingRecommended(false);
      }
    });
  };

  const fetchCategory = async () => {
    await getCategories().then((result) => {
      setCategories(result);
      setLoadingCategory(false);
    });
  };

  const fetchFavItems = async () => {
    await getWishList("ids").then((result) => {
      setFavItems(result);
      setLoadingFavItems(false);
    });
  };

  const fetchMostPopularItems = async () => {
    await getMostPopularItems().then(async (result) => {
      if (result.status === 200) {
        setMostPopularItems(result.data);
        setLoadingMostPopular(false);
      }
    });
  };

  useEffect(() => {
    const fetchScreenData = async () => {
      await fetchFavItems();
      await fetchRecommendedShops();
      await fetchMostPopularItems();
      await fetchCategory();
    };

    fetchScreenData();
  }, []);

  if (
    firstLoad &&
    (loadingCategory ||
      loadingFavItems ||
      loadingMostPopular ||
      loadingRecommended)
  ) {
    return (
      <View style={styles.loadingPage}>
        <ActivityIndicator size={"large"} color={COLORS.normalText} />
      </View>
    );
  } else
    return (
      <CommonScrollableBackground>
        <View>
          <ImageBackground
            source={require("../../assets/homeBanner2.jpg")}
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
            ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
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
              return (
                <ItemCard
                  item={item}
                  isFavorite={favItems.includes(item.id)}
                  isEditable={false}
                />
              );
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
    marginTop:20,
    marginVertical: 10,
    fontWeight: "bold",
    fontSize: 20,
    color: COLORS.textTitle,
    
  },
  pageContainer: {
    marginHorizontal: 20,
  },
  loadingPage: {
    backgroundColor: COLORS.commonBackground,
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
});
