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
import MostPopularItem from "../../components/home/MostPopularItem";
import { Shop } from "../../models/Shop";
import { useEffect, useState } from "react";
import { Item } from "../../models/Item";
import { getRecommendedShops } from "../../api/ShopApi";
import { getMostPopularItems } from "../../api/ItemApi";

export default function Home() {
  const [recommendedShops, setRecommendedShops] = useState<Shop[]>([]);
  const [mostPopularItems, setMostPopularItems] = useState<Item[]>([]);

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
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.sectionTitle}
        >
          <View style={{ marginRight: 23 }}>
            <CategoryCard />
          </View>
          <View style={{ marginRight: 23 }}>
            <CategoryCard />
          </View>
          <View style={{ marginRight: 23 }}>
            <CategoryCard />
          </View>
          <View style={{ marginRight: 23 }}>
            <CategoryCard />
          </View>
          <View style={{ marginRight: 23 }}>
            <CategoryCard />
          </View>
          <View style={{ marginRight: 23 }}>
            <CategoryCard />
          </View>
          <View style={{ marginRight: 23 }}>
            <CategoryCard />
          </View>
          <View style={{ marginRight: 23 }}>
            <CategoryCard />
          </View>
        </ScrollView>

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
        <View style={styles.mostPopularContainer}>
          <MostPopularItem />
          <MostPopularItem />
          <MostPopularItem />
          <MostPopularItem />
          <MostPopularItem />
          <MostPopularItem />
          <MostPopularItem />
          <MostPopularItem />
          <MostPopularItem />
        </View>
      </View>
    </CommonScrollableBackground>
  );
}

const styles = StyleSheet.create({
  banner: {
    width: "100%",
    paddingBottom: 24,
    alignContent:"center",
    alignItems:"center",
    justifyContent:"center"
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
    marginVertical:10,
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  
  mostPopularContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  pageContainer:{
    marginHorizontal: 30,
  }
});
