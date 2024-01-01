import { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { getLikedPosts, getPostsForUserId } from "../../api/CommunityApi";
import Post from "../../components/community/Post";
import { PostModel } from "../../models/Post";
import ThematicBreak from "../../components/ThematicBreak";
import COLORS from "../../common/colors";
import { CommonScrollableBackground } from "../../common/background";

export default function MyPostsScreen() {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [likedPosts, setLikedPosts] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchlikedPosts = async () => {
    await getLikedPosts().then((result) => {
      setLikedPosts(result);
      setLoading(false);
    });
  };

  const fetchUserPosts = async () => {
    await getPostsForUserId().then((res) => {
      if (res.status === 200) {
        setPosts(res.data);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    fetchUserPosts();
    fetchlikedPosts();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingPage}>
        <ActivityIndicator size={"large"} color="white" />
      </View>
    );
  } else {
    return (
      <CommonScrollableBackground>
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <Post post={item} isLiked={likedPosts.includes(item.id)} />
          )}
          ItemSeparatorComponent={() => (
            <View style={{ marginVertical: 20 }}>
              <ThematicBreak />
            </View>
          )}
          scrollEnabled={false}
          style={{ paddingHorizontal: 15 }}
        />
      </CommonScrollableBackground>
    );
  }
}

const styles = StyleSheet.create({
  loadingPage: {
    backgroundColor: COLORS.commonBackground,
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
});
