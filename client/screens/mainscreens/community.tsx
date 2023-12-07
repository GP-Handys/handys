import { View, FlatList, StyleSheet, Text, Image } from "react-native";
import TimeStamp from "../../components/community/TimeStamp";
import ThematicBreak from "../../components/ThematicBreak";
import LikeButton from "../../components/community/LikeButton";
import AddPost from "../../components/community/AddPost";
import COLORS from "../../common/colors";
import CommentButton from "../../components/community/CommentButton";
import UserProfile from "../../components/community/UserProfile";

export default function Community() {
  const posts = [
    {
      userId: "Innovative crafts",
      postText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      pfp: require("../../assets/pic1.jpg"),
      postPfp: require("../../assets/pic1.jpg"),
    },
    {
      userId: "assem ",
      postText:
        "assem assem assem assem assem assem assem assem assem assem assem assem assem assem assem assem assem assem assem assem assem assem assem assem assem assem assem assem assem assem assem assem assem assem assem assem assem assem assem assem assem assem ",
      pfp: require("../../assets/pic1.jpg"),
    },
    {
      userId: "rayyan",
      postText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      pfp: require("../../assets/pic1.jpg"),
      postPfp: require("../../assets/pic1.jpg"),
    },
    {
      userId: "yousef",
      postText: " random text",
      pfp: require("../../assets/pic1.jpg"),
    },
    {
      userId: "ammar",
      postText: " random text",
      pfp: require("../../assets/pic1.jpg"),
    },
    {
      userId: "abdallah",
      postText: " random text",
      pfp: require("../../assets/pic1.jpg"),
    },
    {
      userId: "jesus",
      postText: " random text",
      pfp: require("../../assets/pic1.jpg"),
    },
  ];

  type ItemPros = { item: any };
  const onePost = ({ item }: ItemPros) => (
    <View>
      <View style={styles.userProfile}>
       <UserProfile />
        <Text style={styles.userName}> {item.userId}</Text>
      </View>
      <View style={styles.timeStamp}>
        <TimeStamp />
      </View>
      <View style={styles.mainPost}>
        <Text style={{ color: "white", fontSize: 12 }}>{item.postText}</Text>
        {item.postPfp && (
          <View style={styles.postImgContainer}>
            <Image style={styles.postImg} source={item.postPfp} />
          </View>
        )}
      </View>
      <View style={styles.interActive}>
        <View style={styles.like}>
          <LikeButton />
        </View>
        <View style={styles.comment}>
          <CommentButton />
        </View>
      </View>
    </View>
  );

  const itemSeparator = () => {
    return (
      <View>
        <ThematicBreak />
      </View>
    );
  };

  return (
    <View style={styles.community}>
      <FlatList
        data={posts}
        renderItem={onePost}
        ItemSeparatorComponent={itemSeparator}
      />
      <AddPost />
    </View>
  );
}

const styles = StyleSheet.create({
  community: {
    backgroundColor: COLORS.commonBackground,
  },
  timeStamp: {
    position: "absolute",
    left: 275,
    top: 15,
  },
  userProfile: {
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
    fontSize: 14,
    fontStyle: "italic",
  },
  mainPost: {
    height: "auto",
    width: "auto",
    marginLeft: 65,
    marginRight: 20,
    right: 5,
  },
  postImgContainer: {
    marginTop: 20,
  },
  postImg: {
    height: 150,
    width: 250,
  },
  interActive: {
    flexDirection: "row",
    height: 50,
    top: 23,
    marginLeft: 1,
  },
  like: {
    left: 55,
  },
  comment: {
    left: 80,
  },
});
