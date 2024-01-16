import {
  View,
  StyleSheet,
  Text,
  Image,
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
import COLORS from "../../common/colors";

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

  function handleIsLiked(newValue: boolean) {
    setLiked(newValue);
  }

  function handleLikeCount(value: number) {
    post.votes = value;
    setlikeCount(value);
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
          <Text style={{ color: "#5B2F19", fontSize: 14, marginLeft: 5 }}>
            {post.content}
          </Text>
          {post.img_url && (
            <View style={[styles.postImgContainer]}>
              <Image
                style={styles.postImg}
                source={{ uri: post.img_url }}
                resizeMode="cover"
              />
            </View>
          )}
        </View>
        <View style={[styles.footer, footerStyle]}>
          {!isComment && (
            <LikeButton
              postId={post.id}
              isLiked={liked}
              likeCount={likeCount}
              handleIsLiked={handleIsLiked}
              handleLikeCount={handleLikeCount}
            />
          )}
          {!isComment && <CommentButton post={post} isLiked={liked} />}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  userProfile: {
    color: COLORS.postUser,
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
    marginEnd: 15,
  },
  postImgContainer: {
    marginTop: 8,
    borderRadius: 5,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  postImg: {
    width: 340,
    height: 340,
    borderRadius: 5,
    alignSelf: "center",
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
