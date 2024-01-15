import { CommonScrollableBackground } from "../../common/background";
import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList
} from "react-native";
import COLORS from "../../common/colors";
import {
  Entypo,
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons
} from "@expo/vector-icons";
import { UserShop } from "../../components/profile/UserShop";
import ThematicBreak from "../../components/ThematicBreak";
import { getShopsForUserId } from "../../api/ShopApi";
import React, { useState, useEffect } from "react";
import { StackProps } from "../../components/navigation/NavigationStack";
import { ActivityIndicator } from "react-native-paper";
import { getProfile } from "../../api/UserApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const navigation = useNavigation<StackProps["navigation"]>();
  const [user, setUser]: any = useState({});
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      await getProfile().then(async (result) => {
        setUser(result);
        fetchShops(result.id);
      });
    };

    const fetchShops = async (id: any) => {
      await getShopsForUserId(id)
        .then((result) => {
          setShops(result);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    navigation.addListener("focus", fetchProfile);
  }, []);

  if (loading) {
    return (
      <View style={style.loadingPage}>
        <ActivityIndicator size={"large"} color="white" />
      </View>
    );
  } else
    return (
      <CommonScrollableBackground>
        {/* page container */}
        <View style={{ paddingHorizontal: 40, alignItems: "center" }}>
          {/* user informations */}

          {user.pfp_url === null ? (
            <Image
              source={require("../../assets/default_profile_img.jpg")}
              style={style.profileIMG}
            />
          ) : (
            <Image source={{ uri: user.pfp_url }} style={style.profileIMG} />
          )}

          <Text style={style.font}>{user.name}</Text>

          <View
            style={{ marginTop: 15, marginBottom: 20, alignSelf: "stretch" }}
          >
            <ThematicBreak />
          </View>

          <TouchableOpacity
            style={style.editProfile}
            onPress={() => {
              navigation.navigate("EditProfile", {
                user: user
              });
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <FontAwesome5 name="edit" size={24} color="white" />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                  color: "white",
                  marginLeft: "5%"
                }}
              >
                Edit Profile
              </Text>
            </View>
          </TouchableOpacity>

          {/*user shops */}
          <View style={style.lable}>
            <Text style={style.lableFont}>Your shops</Text>
          </View>

          <View style={{ paddingHorizontal: 15, width: "100%" }}>
            {shops.length && (
              <FlatList
                scrollEnabled={false}
                style={{
                  alignSelf: "center",
                  marginTop: 10,
                  width: "100%"
                }}
                data={shops}
                renderItem={({ item }) => <UserShop shop={item} />}
                ItemSeparatorComponent={() => {
                  return <View style={{ marginVertical: 5 }} />;
                }}
              />
            )}
          </View>
          <View style={{ gap: 20, paddingVertical: 15 }}>
            <TouchableOpacity
              style={style.createShop}
              onPress={() => {
                navigation.navigate("CreateShopScreen");
              }}
            >
              <Text style={style.createNewShopFont}>+ Create shop</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{ marginTop: 5, marginBottom: 18, alignSelf: "stretch" }}
          >
            <ThematicBreak />
          </View>

          {/* Other */}
          <View style={style.lable}>
            <Text style={style.lableFont}>Other</Text>
          </View>
        </View>

        <View style={style.cardsContainer}>
          <View style={style.otherGrid}>
            <TouchableOpacity
              style={style.card}
              onPress={() => navigation.navigate("MyPostsScreen")}
            >
              <MaterialCommunityIcons
                name="note-text-outline"
                size={28}
                color="white"
              />
              <Text style={style.cardFont}>My Posts</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.card}
              onPress={() => navigation.navigate("MyOrdersScreen")}
            >
              <Entypo name="shopping-bag" size={24} color="white" />
              <Text style={style.cardFont}>Orders</Text>
            </TouchableOpacity>
          </View>
          <View style={style.otherGrid}>
            <TouchableOpacity
              style={style.card}
              onPress={() => navigation.navigate("WishlistScreen")}
            >
              <FontAwesome5 name="heart" size={24} color="white" />
              <Text style={style.cardFont}>Favorites</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.card}
              onPress={() => navigation.navigate("SendTicketScreen")}
            >
              <MaterialIcons name="headset-mic" size={24} color="white" />
              <Text style={style.cardFont}>Support</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={async () => {
            await AsyncStorage.removeItem("Authorization");
            navigation.reset({
              index: 0,
              routes: [{ name: "OnboardingScreensContainer" }]
            });
          }}
          style={style.logout}
        >
          <MaterialIcons
            name="logout"
            size={28}
            color={"white"}
            style={{ paddingTop: 11 }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              color: "white",
              alignSelf: "center"
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </CommonScrollableBackground>
    );
}

const style = StyleSheet.create({
  font: {
    fontSize: 24,
    color: COLORS.darkBrown,
    fontWeight: "600",
    paddingTop: 10
  },
  profileIMG: {
    width: 120,
    height: 120,
    borderRadius: 60
  },
  editProfile: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.brown,
    height: 60,
    width: 280,
    alignSelf: "center",
    borderRadius: 12,
    paddingLeft: 15,
    marginBottom: 15
  },
  createShop: {
    height: 60,
    width: 280,
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 9,
    borderColor: COLORS.brown,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center"
  },
  createNewShopFont: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.darkBrown
  },
  lableFont: {
    fontSize: 24,
    fontWeight: "500",
    color: COLORS.darkBrown
  },
  lable: {
    alignSelf: "flex-start"
  },
  card: {
    width: 120,
    height: 90,
    borderRadius: 9,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: COLORS.handysGrey
  },
  otherGrid: { flexDirection: "row", gap: 25 },
  logout: {
    width: 280,
    height: 50,
    backgroundColor: "#BA1200",
    borderRadius: 5,
    alignSelf: "center",
    marginVertical: 20,
    paddingLeft: 30,
    gap: 20,
    flexDirection: "row"
  },
  cardFont: {
    fontSize: 19,
    color: "white",
    fontWeight: "500"
  },
  cardsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    paddingTop: 10
  },
  loadingPage: {
    backgroundColor: COLORS.commonBackground,
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    flex: 1
  }
});
