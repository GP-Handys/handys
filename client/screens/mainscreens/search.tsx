import { View, Text, Dimensions, Keyboard } from "react-native";
import { CommonScrollableBackground } from "../../common/background";
import CustomTextInput from "../../components/CustomTextInput";
import { FontAwesome5 } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { useState } from "react";
import COLORS from "../../common/colors";
import { shopSearch } from "../../api/ShopApi";
import SearchShopCard from "../../components/search/SearchShopCard";
import { ActivityIndicator } from "react-native-paper";

export default function Search(this: any) {
  const [index, setIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [shops, setShops] = useState([]);
  const [items, setItems] = useState([]);
  const [loadingShops, setLoadingShops] = useState(false);
  const [loadingItems, setLoadingItems] = useState(false);

  async function handleSearch() {
    setLoadingShops(true);
    //setLoadingItems(true)

    await shopSearch(searchQuery).then((result) => {
      setShops(result);
      setLoadingShops(false);
    });

    // await itemsSearch(searchQuery).then((result)=>{
    //   setItems(result)
    //   setLoadingItems(false)
    // })
  }

  // if (loadingItems || loadingShops) {
  //   return (
  //
  //   );
  // } else

  return (
    <CommonScrollableBackground>
      <View
        style={{ margin: 15,minHeight:"100%"}}
      >
        <CustomTextInput
          onChangeText={(query) => setSearchQuery(query)}
          placeholder="search for shop , item or category"
          multiline={false}
          left={
            <TextInput.Icon
              icon={() => <FontAwesome5 name="search" size={24} color="grey" />}
            />
          }
          right={
            <TextInput.Icon
              onPress={() => {
                Keyboard.dismiss();
                handleSearch();
              }}
              icon={() => (
                <FontAwesome5 name="arrow-right" size={30} color="grey" />
              )}
              style={{ marginRight: 15 }}
            />
          }
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
          tabTextStyle={{ color: "white", fontSize: 18, fontWeight: "bold" }}
          activeTabStyle={{ backgroundColor: COLORS.CTAButtonBackground }}
          tabsContainerStyle={{
            height: 45,
            backgroundColor: COLORS.commonBackground,
          }}
          activeTabOpacity={5}
          borderRadius={10}
          activeTabTextStyle={{ color: "black", fontWeight: "bold" }}
        />

        {loadingItems || loadingShops ? (
          <View
            style={{
              alignItems: "center",
              flex: 1,
              marginTop:"50%"
            }}
          >
            <ActivityIndicator size={"large"} color="white" />
          </View>
        ) : (
          <View style={{marginTop:15}}>
            {index === 0 ? (
              <View>
                <Text>items</Text>
              </View>
            ) : (
              <View style={{ gap: 15 }}>
                {shops.map((shop: any) => (
                  <SearchShopCard key={shop.id} shop={shop} />
                ))}
              </View>
            )}
          </View>
        )}
      </View>
    </CommonScrollableBackground>
  );
}
