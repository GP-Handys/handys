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
            <View>
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
  userProfile: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
  },
  imgContainer: {
    height: 45,
    width: 45,
    borderRadius: 50,
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  pfpImg: {
    height: 45,
    width: 45,
    borderRadius: 50,
  },
  userName: {
    marginLeft: 15,
    marginTop: 15,
    color: "#FFFFFFE0",
    fontSize: 14,
    fontStyle: "italic",
    borderWidth: 1,
  },
  mainPost: {
    height: "auto",
    width: "90%",
    marginLeft: 19,
    marginTop: 8,
  },
  postImgContainer: {
    marginTop: 12,
    borderWidth: 0.8,
    width: "100%",
    borderRadius: 8,
  },
  postImg: {
    height: 250,
    width: "100%",
    borderRadius: 8,
  },
  footer: {
    flexDirection: "row",
    height: 40,
    marginTop: 15,
    marginRight: 155,
    paddingRight: 25,
    marginBottom: 10,
  },
  comment: {
    marginLeft: 40,
  },
});
