import {
  View,
  Text,
  Keyboard,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  CommonBackgroundWithNoSafeArea,
  CommonScrollableBackground,
} from "../../common/background";
import CustomTextInput from "../../components/CustomTextInput";
import { FontAwesome5 } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { useState } from "react";
import COLORS from "../../common/colors";
import { shopSearch } from "../../api/ShopApi";
import SearchShopCard from "../../components/search/SearchShopCard";
import { ItemSearch } from "../../api/ItemApi";
import ItemCard from "../../components/home/ItemCard";
import { Item } from "../../models/Item";
import { Shop } from "../../models/Shop";
import { getWishList } from "../../api/WishlistApi";

export default function Search(this: any) {
  const [index, setIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [shops, setShops] = useState<Shop[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [loadingShops, setLoadingShops] = useState(false);
  const [loadingItems, setLoadingItems] = useState(false);
  const [loadingFav, setLoadingFav] = useState(false);
  const [favItems, setFavItems] = useState<any[]>([]);
  const [searchedOneTime, setSearchedOneTime] = useState(false);

  async function handleSearch() {
    setSearchedOneTime(true);
    setLoadingShops(true);
    setLoadingItems(true);
    setLoadingFav(true);

    await getWishList("ids").then((result) => {
      setFavItems(result);
      setLoadingFav(false);
    });

    await shopSearch(searchQuery).then((result) => {
      setShops(result);
      setLoadingShops(false);
    });

    await ItemSearch(searchQuery).then((result) => {
      setItems(result);
      setLoadingItems(false);
    });
  }

  return (
    <CommonScrollableBackground>
      <View style={{ margin: 15, minHeight: "100%" }}>
        <CustomTextInput
          onChangeText={(query) => setSearchQuery(query)}
          placeholder="Search for a shop or item"
          multiline={false}
          left={
            <TextInput.Icon
              icon={() => (
                <FontAwesome5
                  name="search"
                  size={20}
                  color="#854627"                />
              )}
            />
          }
          right={
            <TextInput.Icon
              onPress={() => {
                Keyboard.dismiss();
                handleSearch();
              }}
              icon={() => (
                <FontAwesome5 name="arrow-right" size={20} color="#854627" />
              )}
              style={{ marginRight: 15 }}
            />
          }
          returnKeyType={"search"}
          onSubmitEditing={handleSearch}
        />
        <FontAwesome5 size={24} color="black" />

        <SegmentedControlTab
          values={["Items", "Shops"]}
          selectedIndex={index}
          onTabPress={(index) => setIndex(index)}
          tabStyle={{
            backgroundColor: COLORS.handysGrey,
            borderColor: COLORS.handysGrey,
          }}
          tabTextStyle={{ color: "white", fontSize: 14, fontWeight: "bold" }}
          activeTabStyle={{ backgroundColor: COLORS.CTAButtonBackground }}
          tabsContainerStyle={{
            height: 40,
            backgroundColor: COLORS.commonBackground,
          }}
          activeTabOpacity={5}
          borderRadius={10}
          activeTabTextStyle={{ color: "white", fontWeight: "bold" }}
        />

        {loadingItems || loadingShops || loadingFav ? (
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
            {searchedOneTime && (
              <View>
                {index === 0 ? (
                  <View>
                    {items.length > 0 ? (
                      <FlatList
                        key={"_"}
                        keyExtractor={(item) => "_" + item.id}
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
                    ) : (
                      <CommonBackgroundWithNoSafeArea>
                        <View style={styles.Emptycontainer}>
                          <Text style={styles.textIcon}>Sorry</Text>
                          <Image
                            style={styles.image}
                            source={require("../../assets/sad.png")}
                          />
                          <Text style={styles.textIcon}>
                            We can't find any result
                          </Text>
                        </View>
                      </CommonBackgroundWithNoSafeArea>
                    )}
                  </View>
                ) : (
                  <View>
                    {shops.length > 0 ? (
                      <FlatList
                        key={"#"}
                        keyExtractor={(item) => "#" + item.id}
                        data={shops}
                        renderItem={({ item }) => (
                          <SearchShopCard shop={item} />
                        )}
                        ItemSeparatorComponent={() => (
                          <View style={{ height: 20 }} />
                        )}
                        scrollEnabled={false}
                        numColumns={1}
                      />
                    ) : (
                      <CommonBackgroundWithNoSafeArea>
                        <View style={styles.Emptycontainer}>
                          <Text style={styles.textIcon}>Sorry</Text>
                          <Image
                            style={styles.image}
                            source={require("../../assets/Done-pana.png")}
                          />
                          <Text style={styles.textIcon}>
                            We can't find any result
                          </Text>
                        </View>
                      </CommonBackgroundWithNoSafeArea>
                    )}
                  </View>
                )}
              </View>
            )}
          </View>
        )}
      </View>
    </CommonScrollableBackground>
  );
}

const styles = StyleSheet.create({
  textIcon: {
    marginVertical: 20,
    color: "#854627",
    fontWeight: "500",
    fontSize: 26,
    alignSelf:'center'
  },
  Emptycontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  okay: {
    backgroundColor: COLORS.CTAButtonBackground,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 8,
  },
  image: {
    width: 300,
    height: 300,
    alignSelf:'center'
  },
});
