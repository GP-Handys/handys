import {
  View,
  Text,
  Image,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from "react-native";
import { useState, useEffect } from "react";
import { getUserById } from "../../api/UserApi";
import { User } from "../../models/User";

interface PostOwnerHeaderProps {
  userId: number;
  userDataStyle?: StyleProp<ViewStyle>;
  pfpImgStyle?: StyleProp<ImageStyle>;
  userNameStyle?: StyleProp<ViewStyle>;
}

export default function PostOwnerHeader({
  userId,
  userDataStyle,
  pfpImgStyle,
  userNameStyle,
}: PostOwnerHeaderProps) {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const fetchUser = async () => {
      const result = await getUserById(userId);
      setUser(result);
    };
    fetchUser();
  }, [userId]);

  return (
    <View style={[styles.userData, userDataStyle]}>
      {user?.pfp_url === null ? (
        <Image
          style={[styles.pfpImg, pfpImgStyle]}
          source={require("../../assets/default_profile_img.jpg")}
        />
      ) : (
        <Image
          source={{ uri: user?.pfp_url }}
          style={[styles.pfpImg, pfpImgStyle]}
        />
      )}

      <Text style={[styles.userName, userNameStyle]}> {user?.name} </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  userData: {
    // borderWidth:1,
    flexDirection: "row",
    alignItems: "center",
  },
  pfpImg: {
    height: 35,
    width: 35,
    borderRadius: 40,
  },
  userName: {
    color: "#FFFFFFE0",
    fontSize: 16,
    paddingLeft: 6,
    // borderWidth:1,
  },
});
