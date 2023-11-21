import { View, FlatList, StyleSheet, Text, Image } from "react-native";
import TimeStamp from "../../components/community/TimeStamp";
import ThematicBreak from "../../components/ThematicBreak";
import LikeButton from "../../components/community/LikeButton";
import AddPost from "../../components/community/AddPost";
import COLORS from "../../common/colors";

export default function Community() {
  const posts = [
    {
      userId: "laith",
      postText: " random text",
      pfp: require("../../assets/pic1.jpg"),
    },
    {
      userId: "assem",
      postText: " random text",
      pfp: require("../../assets/pic1.jpg"),
    },
    {
      userId: "rayyan",
      postText: " random text",
      pfp: require("../../assets/pic1.jpg"),
    },
    {
      userId: "5ara",
      postText: " random text",
      pfp: require("../../assets/pic1.jpg"),
    },
    {
      userId: "dog",
      postText: " random text",
      pfp: require("../../assets/pic1.jpg"),
    },
    {
      userId: "shit",
      postText: " random text",
      pfp: require("../../assets/pic1.jpg"),
    },
    {
      userId: "ass",
      postText: " random text",
      pfp: require("../../assets/pic1.jpg"),
    },
  ];

  type ItemPros = { item: any };
  const onePost = ({ item }: ItemPros) => (
    <View>
      <Text style={styles.userId}> {item.userId}</Text>
      <View style={styles.user}>
        <View style={styles.imgContainer}>
          <Image style={styles.pfpImg} source={item.pfp} />
        </View>
      </View>
      <View>
        <LikeButton />
      </View>
      <View style={styles.timeStamp}>
        <TimeStamp />
      </View>
      <Text>{item.postText}</Text>
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
    <View style={styles.listtt}>
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
  listtt: {
    backgroundColor: COLORS.commonBackground,
  },
  timeStamp: {
    position: "absolute",
    left: 275,
    top: 15,
  },
  user: {},
  imgContainer: {
    flexDirection: "column",
    height: 39,
    width: 39,
    aspectRatio: 1 * 1,
    left: 25,
    borderWidth: 1.5,
    right: 5,
    borderRadius: 7,
  },

  pfpImg: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    borderRadius: 7,
    borderColor: "red",
  },
  userId: {
    fontSize: 14,
    left: 60,
    top: 15,
    color: "white",
  },
});
