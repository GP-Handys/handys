import { View, StyleSheet, Text, Image, Dimensions } from "react-native";
import PostOwnerHeader from "../../components/community/PostOwnerHeader";
import TimeStamp from "../../components/community/TimeStamp";
import LikeButton from "../../components/community/LikeButton";
import CommentButton from "../../components/community/CommentButton";
import { PostModel } from "../../models/Post";

interface PostProps {
  post: PostModel;
}

export default function Post({ post }: Readonly<PostProps>) {
  return (
    <View>
      <View style={styles.userProfile}>
        <View>
          <PostOwnerHeader userId={post.userId} />
        </View>
        <View style={{ marginTop: 15, marginRight: 10 }}>
          <TimeStamp time={post.createdAt} />
        </View>
      </View>
      <View>
        <View style={styles.mainPost}>
          <Text style={{ color: "white", fontSize: 15 }}>{post.content}</Text>
          {post.img_url && (
            <Image style={styles.postImg} source={{ uri: post.img_url }} />
          )}
          <View style={styles.footer}>
            <LikeButton />
            <CommentButton />
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  userProfile: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pfpImg: {
    height: 45,
    width: 45,
    borderRadius: 50,
  },
  mainPost: {
    height: "auto",
    marginTop: 10,
  },
  postImg: {
    marginTop: 12,
    width: Dimensions.get("window").width - 20,
    height: 400,
    resizeMode: "contain",
  },
  footer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 15,
    gap: 20,
    marginLeft: 10,
  },
  comment: {
    marginLeft: 40,
  },
});
