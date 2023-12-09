import { View, Text, Image, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { getUserById } from "../../api/UserApi";
import { User } from "../../models/User";

interface PostOwnerHeaderProps {
  userId: number;
}

export default function PostOwnerHeader({
  userId,
}: Readonly<PostOwnerHeaderProps>) {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const fetchUser = async () => {
      await getUserById(userId).then((result) => {
        setUser(result);
      });
    };
    fetchUser();
  }, []);
  return (
    <View style={styles.userData}>
      <View style={styles.imgContainer}>
        {/* source={{uri:user?.pfp_url} */}
        <Image
          style={styles.pfpImg}
          source={require("../../assets/pic1.jpg")}
        />
      </View>
      <Text style={styles.userName}> {user?.name} </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  userData: {
    flexDirection: "row",
    alignSelf: "flex-start",
    alignContent: "space-around",
  },
  imgContainer: {
    aspectRatio: 1 * 1,
    left: 12,
    height: 45,
    width: 45,
    borderRadius: 50,
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    top: 7,
  },
  pfpImg: {
    height: 45,
    width: 45,
    borderRadius: 50,
  },
  userName: {
    left: 15,
    top: 15,
    color: "#FFFFFFE0",
    fontSize: 16,
  },
});
