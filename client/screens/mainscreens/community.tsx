import { View, FlatList, StyleSheet, Text, Image } from "react-native";
import TimeStamp from "../../components/community/TimeStamp";
import ThematicBreak from "../../components/ThematicBreak";
import LikeButton from "../../components/community/LikeButton";
import AddPost from "../../components/community/AddPost";
import COLORS from "../../common/colors";

export default function Community() {
  const posts = [
    {
      id: "laith",
      postText: " random text",
      pfp: require("../../assets/logo.png"),
    },
    {
      id: "assem",
      postText: " random text",
      pfp: require("../../assets/logo.png"),
    },
    {
      id: "rayyan",
      postText: " random text",
      pfp: require("../../assets/logo.png"),
    },
    {
      id: "5ara",
      postText: " random text",
      pfp: require("../../assets/logo.png"),
    },
    {
      id: "dog",
      postText: " random text",
      pfp: require("../../assets/logo.png"),
    },
    {
      id: "shit", 
      postText: " random text",
      pfp: require("../../assets/logo.png"),
    },
    {
      id: "ass",
      postText: " random text",
      pfp: require("../../assets/logo.png"),
    },
  ];

  const onePost = ({ item }) => (
    <View>
      <View>
        <Image source={item.pfp} />
      </View>
      <Text> {item.id}</Text>
      <View>
        <LikeButton />
      </View>
      <View>
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
});
