import { CommonScrollableBackground } from "../../common/background";
import {
  Image,
  View,
  Text,
  StyleSheet,
  Pressable,
  RefreshControl,
} from "react-native";
import COLORS from "../../common/colors";
import { Feather } from "@expo/vector-icons";
import { UserShop } from "../../components/profile/UserShop";
import ThematicBreak from "../../components/ThematicBreak";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { getProfile } from "../../api/UserApi";
import { getShops } from "../../api/ShopApi";
import React, { useState, useEffect } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { StackParamList } from "../../components/navigation/NavigationStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator } from "react-native-paper";

type StackProps = NativeStackScreenProps<StackParamList>;

export default function Profile({ navigation }: StackProps) {
  const [user, setUser]: any = useState({});
  const [url, setUrl] = useState();
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileImg = async (link: any) => {
      const storage = getStorage();
      const storageRef = ref(storage, "users/" + link);

      if (link != null)
        await getDownloadURL(storageRef).then((url: any) => {
          setUrl(url);
        });
    };

    const fetchShops = async (id: any) => {
      await getShops(id)
        .then((result) => {
          setShops(result);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    const fetchProfile = async () => {
      await getProfile().then(async (result) => {
        setUser(result);
        fetchProfileImg(result.pfp_url);
        fetchShops(result.id);
      });
    };

    navigation.addListener("focus",fetchProfile)

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
            <Image source={{ uri: url }} style={style.profileIMG} />
          )}

          <Text style={style.font}>{user.name}</Text>

          <View
            style={{ marginTop: 17, marginBottom: 20, alignSelf: "stretch" }}
          >
            <ThematicBreak />
          </View>

          <Pressable style={style.editProfile}>
            <Feather name="edit" size={32} color={"white"} />
            <Text style={{ fontSize: 18, fontWeight: "500", color: "white" }}>
              Edit Profile
            </Text>
          </Pressable>

          {/*user shops */}
          <View style={style.lable}>
            <Text style={style.lableFont}>Your shops</Text>
          </View>

          <View style={{ gap: 20, paddingVertical: 15 }}>
            {shops.map((shop: any) => (
              <UserShop key={shop.id} shop={shop} />
            ))}

            <Pressable
              style={style.createShop}
              onPress={() => {
                navigation.navigate("CreateShopScreen");
              }}
            >
              <Text style={style.createNewShopFont}>+ Create new Shop</Text>
            </Pressable>
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
            <View style={style.card}>
              <MaterialCommunityIcons
                name="note-text-outline"
                size={28}
                color="white"
              />
              <Text style={style.cardFont}>My Posts</Text>
            </View>
            <View style={style.card}>
              <Entypo name="shopping-bag" size={24} color="white" />
              <Text style={style.cardFont}>Orders</Text>
            </View>
          </View>
          <View style={style.otherGrid}>
            <View style={style.card}>
              <FontAwesome5 name="heart" size={24} color="white" />
              <Text style={style.cardFont}>Favorites</Text>
            </View>
            <View style={style.card}>
              <MaterialIcons name="headset-mic" size={24} color="white" />
              <Text style={style.cardFont}>Support</Text>
            </View>
          </View>
        </View>

        <Pressable style={style.logout}>
          <MaterialIcons
            name="logout"
            size={28}
            color={"white"}
            style={{ paddingTop: 11 }}
          />
          <Text style={style.font}>Logout</Text>
        </Pressable>
      </CommonScrollableBackground>
    );
}

const style = StyleSheet.create({
  font: { fontSize: 24, color: "white", fontWeight: "600", paddingTop: 10 },
  profileIMG: { width: 120, height: 120, borderRadius: 120 },
  editProfile: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.handysGrey,
    height: 60,
    width: 320,
    alignSelf: "center",
    borderRadius: 9,
    gap: 12,
    paddingLeft: 15,
    marginBottom: 15,
  },
  createShop: {
    height: 60,
    width: 320,
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 9,
    borderColor: COLORS.handysGrey,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  createNewShopFont: {
    fontSize: 18,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.75)",
  },
  lableFont: {
    fontSize: 24,
    fontWeight: "500",
    color: "white",
  },
  lable: {
    alignSelf: "flex-start",
    paddingLeft: 15,
  },
  card: {
    width: 140,
    height: 90,
    borderRadius: 9,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: COLORS.handysGrey,
  },
  otherGrid: { flexDirection: "row", gap: 30 },
  logout: {
    width: 316,
    height: 50,
    backgroundColor: "#BA1200",
    borderRadius: 5,
    alignSelf: "center",
    marginVertical: 20,
    paddingLeft: 30,
    gap: 27,
    flexDirection: "row",
  },
  cardFont: {
    fontSize: 19,
    color: "white",
    fontWeight: "500",
  },
  cardsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 25,
    paddingTop: 10,
  },
  loadingPage: {
    backgroundColor: COLORS.commonBackground,
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
});
