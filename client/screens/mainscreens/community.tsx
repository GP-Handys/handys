import { View, FlatList, StyleSheet, Text, Image } from "react-native";
import CreatePostButton from "../../components/community/AddPost";
import TimeStamp from "../../components/community/TimeStamp";
import HandysLogo from "../../components/HandysLogo";
import COLORS from "../../common/colors";
import ThematicBreak from "../../components/ThematicBreak";
import LikeButton from "../../components/community/LikeButton";

export default function Community() {
  const Posts = [
    {
      postTime: <TimeStamp />,
      user: "laith",
      postText: " random text",
      pfp: <HandysLogo />,
      LikeButton: <LikeButton />,
    },
    {
      postTime: <TimeStamp />,
      user: "assem",
      postText: " random text",
      pfp: <HandysLogo />,
      LikeButton: <LikeButton />,
    },
    {
      postTime: <TimeStamp />,
      user: "rayyan",
      postText: " random text",
      pfp: <HandysLogo />,
      LikeButton: <LikeButton />,
    },
    {
      postTime: <TimeStamp />,
      user: "5ara",
      postText: " random text",
      pfp: <HandysLogo />,
      LikeButton: <LikeButton />,
    },
    {
      postTime: <TimeStamp />,
      user: "dog",
      postText: " random text",
      pfp: <HandysLogo />,
      LikeButton: <LikeButton />,
    },
    {
      postTime: <TimeStamp />,
      user: "shit",
      postText: " random text",
      pfp: <HandysLogo />,
      LikeButton: <LikeButton />,
    },
    {
      postTime: <TimeStamp />,
      user: "ass",
      postText: " random text",
      pfp: <HandysLogo />,
      LikeButton: <LikeButton />,
    },
  ];

  const renderItem = ({
    item,
  }: {
    item: {
      postTime: JSX.Element;
      user: string;
      postText: string;
      pfp: JSX.Element;
      LikeButton: JSX.Element;
    };
  }) => {
    return (
      <View>
        {item.pfp}
        <LikeButton />
        <Text>{item.user} </Text>
        <Text style={{ position: "absolute", right: 0 }}> {item.postTime}</Text>
        <ThematicBreak />
      </View>
    );
  };

  return (
    <View>
      <View style={styles.itemContainer}>
        <FlatList data={Posts} renderItem={renderItem} />
      </View>
      <CreatePostButton />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomColor: "#ccc",
    padding: 16,
    backgroundColor: COLORS.commonBackground,
  },
});
