import { View, StyleSheet, Text, Image } from "react-native";
import PostOwnerHeader from "../../components/community/PostOwnerHeader";
import TimeStamp from "../../components/community/TimeStamp";
import LikeButton from "../../components/community/LikeButton";
import CommentButton from "../../components/community/CommentButton";
import { PostModel } from "../../models/Post";
import { Dimensions } from "react-native";

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
          <Text style={{ color: "white", fontSize: 15 }}>{post.content}</Text>
          {post.img_url && (
              <Image style={styles.postImg} source={{ uri: post.img_url }} />
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
  mainPost: {
    height: "auto",
    marginTop: 10,
  },
  postImg: {
    marginTop: 12,
    width: Dimensions.get('window').width-20,
    height:400,
    borderRadius: 8,
    resizeMode:"contain"
  },
  footer: {
    flexDirection: "row",
    height: 40,
    paddingRight: 25,
    marginTop:15
  },
  comment: {
    marginLeft: 40,
  },
});
