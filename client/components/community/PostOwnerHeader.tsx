import { View, Text, Image, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { getProfile, getUserById } from "../../api/UserApi";
import { User } from "../../models/User";


export default function PostOwnerHeader() {

  const [user, setUser] = useState<User>();
  useEffect(() => {
    const fetchUser = async () => {
      await getProfile().then((result) => {
        setUser(result);
      });
    };
    fetchUser();
  }, []);

  return (
    <View style={styles.userData}>
      {user?.pfp_url === null ? (
        <Image
          style={styles.pfpImg}
          source={require("../../assets/default_profile_img.jpg")}
        />
      ) : (
        <Image source={{ uri: user?.pfp_url }} style={styles.pfpImg} />
      )}

      <Text style={styles.userName}> {user?.name} </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  userData: {
    flexDirection: "row",
    alignItems: "center",
  },
  pfpImg: {
    height: 45,
    width: 45,
    borderRadius: 45,
  },
  userName: {
    color: "#FFFFFFE0",
    fontSize: 18,
    paddingLeft:6
  },
});
