import { View, StyleSheet, Text, Image } from "react-native";
import PostOwnerHeader from "../../components/community/PostOwnerHeader";
import TimeStamp from "../../components/community/TimeStamp";
import LikeButton from "../../components/community/LikeButton";
import CommentButton from "../../components/community/CommentButton";
import { PostModel } from "../../models/Post";

interface PostProps {
  post: PostModel;
}

export default function Post({ post }: PostProps) {
  return (
    <View>
      <View>
        <PostOwnerHeader userId={post.userId} />
        <TimeStamp time={post.createdAt} />
      </View>
      <View>
        <View style={styles.mainPost}>
          <Text style={{ color: "white", fontSize: 12 }}>{post.content}</Text>
          {post.img_url && (
            <View style={styles.postImgContainer}>
              <Image style={styles.postImg} source={{ uri: post.img_url }} />
            </View>
          )}
          <View style={styles.footer}>
            <View style={styles.like}>
              <LikeButton />
            </View>
            <View style={styles.comment}>
              <CommentButton />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  footer: {
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
