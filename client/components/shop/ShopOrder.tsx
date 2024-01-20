import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackProps } from "../navigation/NavigationStack";
import { getUserById } from "../../api/UserApi";
import COLORS from "../../common/colors";

interface Props {
  userId: number;
  orderId: number;
}

export default function ShopOrder({ userId, orderId }: Props) {
  const navigation = useNavigation<StackProps["navigation"]>();
  const [user, setUser] = useState<any>();

  const fetchUserDataById = async () => {
    await getUserById(userId).then((res) => {
      setUser(res);
    });
  };

  useEffect(() => {
    fetchUserDataById();
  }, []);

  return (
    <TouchableOpacity
      style={styles.mainContainer}
      onPress={() => {
        navigation.navigate("ShopOrderItemsScreen", {
          user: user,
          orderId: orderId,
        });
      }}
    >
      {user && (
        <View style={styles.imageContainer}>
          {user.pfp_url == null ? (
            <Image
              source={require("../../assets/default_profile_img.jpg")}
              style={styles.image}
            />
          ) : (
            <Image source={{ uri: user.pfp_url ?? "" }} style={styles.image} />
          )}
        </View>
      )}
      <View style={styles.textContainer}>
        <View>
          <Text style={styles.userName}>{user?.name}</Text>
          <View>
            <Text style={styles.userName}>Order #{orderId}</Text>
          </View>
        </View>

        <MaterialIcons
          name="keyboard-arrow-right"
          size={30}
          color={COLORS.normalText}
          style={{
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
          }}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    marginTop: 20
  },
  imageContainer: {
    paddingLeft: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.normalText,
    marginTop: 5,
    paddingRight: 5,
  },
});
