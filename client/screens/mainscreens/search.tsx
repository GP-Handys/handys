import { View, Text } from "react-native";
import {
  CommonBackgroundWithSafeArea,
  CommonScrollableBackground,
} from "../../common/background";
import CustomTextInput from "../../components/CustomTextInput";
import { FontAwesome5 } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { useState } from "react";
import COLORS from "../../common/colors";
import { shopSearch } from "../../api/ShopApi";
import ShopCard from "../../components/home/ShopCard";


export default function Search(this: any) {
  const [index, setIndex] = useState(0);
  const [searchQuery , setSearchQuery] = useState("")
  const [shops,setShops]=useState([])
  const [items,setItems]=useState([])


  async function handleSearch(){
    setShops(await shopSearch(searchQuery))
  }

  return (
    <CommonScrollableBackground>
      <View style={{ margin: 15}}>
        <CustomTextInput
          onChangeText={(query)=>setSearchQuery(query)}
          placeholder="search for shop , item or category"
          multiline={false}
          left={
            <TextInput.Icon
              icon={() => <FontAwesome5 name="search" size={24} color="grey" />}
            />
          }
          right={
            <TextInput.Icon 
              onPress={handleSearch}
              icon={() => (
                <FontAwesome5 name="arrow-right" size={30} color="grey"/>
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
      

      {index === 0 ? (
        <View>
        <Text>items</Text>
      </View>
        
      ) : (
        <View style={{display:"flex", flexWrap:"wrap" ,flexDirection:"row", justifyContent:"center",gap:40}}>
          {shops.map((shop: any) => (
              <ShopCard key={shop.id} shop={shop} />
            ))}

        </View>
      )}
      </View>
    </CommonScrollableBackground>
  );
}
