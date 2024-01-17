import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Linking,
  Image,
  ActivityIndicator,
} from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import COLORS from "../../common/colors";
import ThematicBreak from "../../components/ThematicBreak";
import { Shop } from "../../models/Shop";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { getUserById } from "../../api/UserApi";

export default function ShopContactScreen({ route }: any) {
  const shop: Shop = route.params.shop;
  const [loading, setLoading] = useState(true);
  const [user, setUser]: any = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      await getUserById(shop.userId)
        .then(async (result) => {
          setUser(result);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingPage}>
        <ActivityIndicator size={"large"} color={COLORS.normalText} />
      </View>
    );
  } else
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.touchableStyle}>
          <Text style={{ color: "black", fontSize:18 }}>Owner: </Text>
          {user.pfp_url === null ? (
            <Image
              source={require("../../assets/default_profile_img.jpg")}
              style={styles.profileIMG}
            />
          ) : (
            <Image source={{ uri: user.pfp_url }} style={styles.profileIMG} />
          )}
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ color: "black", fontSize: 18 }}>{user.name}</Text>
          </View>
        </View>
        <View style={{ marginVertical: 20, width: "100%" }}>
          <ThematicBreak marginHorizontal={25} />
        </View>

        <TouchableOpacity style={styles.touchableStyle}>
          <FontAwesome5 name="phone-alt" size={25} color={"#EEEEEE"} />
          <Text style={styles.buttonText}>{shop.phone_number}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.touchableStyle}
          onPress={async () => {
            let websiteUrl = shop.socialMediaLink;
            if (websiteUrl != null) {
              if (
                !websiteUrl.startsWith("https://") ||
                !websiteUrl.startsWith("http://")
              ) {
                websiteUrl = "http://" + websiteUrl;
              }
              await Linking.openURL(websiteUrl).catch((error) =>
                console.error("Error opening website:", error)
              );
            }
          }}
        >
          <MaterialCommunityIcons name="web" size={30} color={"#EEEEEE"} />
          <Text style={styles.buttonText}>Shop Site</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.commonBackground,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  touchableStyle: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: COLORS.handysGrey,
    height: 60,
    width: "100%",
    borderRadius: 9,
    gap: 10,
    paddingLeft: 15,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "black",
  },
  loadingPage: {
    backgroundColor: COLORS.commonBackground,
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  profileIMG: { width: 35, height: 35, borderRadius: 35 },
});
