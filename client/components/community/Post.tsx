import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  StyleProp,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from "react-native";
import PostOwnerHeader from "./PostOwnerHeader";
import TimeStamp from "./TimeStamp";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";
import { PostModel } from "../../models/Post";
import { useState } from "react";
interface PostProps {
  post: PostModel;
  isComment?: boolean;
  userProfileStyle?: StyleProp<ViewStyle>;
  mainPostStyle?: StyleProp<ViewStyle>;
  footerStyle?: StyleProp<ViewStyle>;
  isLiked: boolean;
  userDataStyle?: StyleProp<ViewStyle>;
  pfpImgStyle?: StyleProp<ImageStyle>;
  userNameStyle?: StyleProp<TextStyle>;
}

export default function Post({
  post,
  isComment,
  isLiked,
  userProfileStyle,
  mainPostStyle,
  footerStyle,
  userDataStyle,
  pfpImgStyle,
  userNameStyle,
}: PostProps) {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setlikeCount] = useState(post.votes);

  function handleIsLiked(newValue:boolean){
    setLiked(newValue)
  }

  function handleLikeCount(value:number){
    post.votes=value
    setlikeCount(value)
  }

  return (
    <View>
      <View style={[styles.userProfile, userProfileStyle]}>
        <View>
          <PostOwnerHeader
            userId={post.userId}
            userDataStyle={userDataStyle}
            pfpImgStyle={pfpImgStyle}
            userNameStyle={userNameStyle}
          />
        </View>
        <View style={{ marginTop: 10, marginRight: 10 }}>
          <TimeStamp time={post.createdAt} />
        </View>
      </View>
      <View>
        <View style={[styles.mainPost, mainPostStyle]}>
          <Text style={{ color: "white", fontSize: 12.5 }}>{post.content}</Text>
          {post.img_url && (
            <View style={styles.postImgContainer}>
              <Image style={styles.postImg} source={{ uri: post.img_url }} />
            </View>
          )}
        </View>
        <View style={[styles.footer, footerStyle]}>
          {!isComment && <LikeButton postId={post.id} isLiked={liked} likeCount={likeCount} handleIsLiked={handleIsLiked} handleLikeCount={handleLikeCount}/>}
          {!isComment && <CommentButton post={post} isLiked={liked} />}
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
    gap: 15,
    marginLeft: 10,
    marginTop: 12,
  },
  comment: {
    marginLeft: 40,
  },
});
