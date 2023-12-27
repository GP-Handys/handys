import { View, StyleSheet, Text, Image, Dimensions } from "react-native";
import PostOwnerHeader from "./PostOwnerHeader";
import TimeStamp from "./TimeStamp";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";
import { PostModel } from "../../models/Post";
interface PostProps {
  post: PostModel;
  isComment?: boolean;
}

export default function Post({ post, isComment }: PostProps) {
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
          <Text style={{ color: "white", fontSize: 12.5 }}>{post.content}</Text>
          {post.img_url && (
            <View style={styles.postImgContainer}>
              <Image style={styles.postImg} source={{ uri: post.img_url }} />
            </View>
          )}
          <View style={styles.footer}>
            <LikeButton />
            {!isComment && <CommentButton post={post} />}
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
    marginTop: 8,
    width: "90%",
    borderRadius: 8,
  },
  postImgContainer: {
    marginTop: 8,
  },
  postImg: {
    width: Dimensions.get("window").width - 20,
    height: Dimensions.get("window").width - 20,
  },
  footer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 20,
    marginLeft: 10,
    marginTop: 12,
  },
  comment: {
    marginLeft: 40,
  },
});
