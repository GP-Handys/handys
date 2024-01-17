import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import ThematicBreak from "../../components/ThematicBreak";
import PostModal from "../community/AddPostModal";
import { useState, useEffect } from "react";
import { getLikedPosts, getPosts } from "../../api/CommunityApi";
import Post from "../../components/community/Post";
import { Feather } from "@expo/vector-icons";
import COLORS from "../../common/colors";
export default function Community() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPostModalVisible, setIsPostModalVisible] = useState(false);
  const [likedPosts, setLikedPosts] = useState<any[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingLikes, setLoadingLikes] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);

  const onRefresh = () => {
    setIsRefreshing(true);
    setLoadingLikes(true);
    setLoadingPosts(true);

    fetchPosts().then(() => {
      setIsRefreshing(false);
      setLoadingPosts(false);
      setFirstLoad(false);
    });

    fetchlikedPosts().then(() => {
      setLoadingLikes(false);
      setFirstLoad(false);

    });
  };

  const fetchlikedPosts = async () => {
    await getLikedPosts().then((result) => {
      setLikedPosts(result);
      setLoadingLikes(false);
      setFirstLoad(false);
    });
  };

  const fetchPosts = async () => {
    await getPosts().then((result) => {
      setPosts(result);
      setLoadingPosts(false);
    });
  };
  useEffect(() => {
    fetchlikedPosts();
    fetchPosts();
  }, []);

  const itemSeparator = () => {
    return (
      <View style={{ marginVertical: 20 }}>
        <ThematicBreak />
      </View>
    );
  };

  if (firstLoad || loadingLikes || loadingPosts) {
    return (
      <View style={styles.loadingPage}>
        <ActivityIndicator size={"large"} color={COLORS.normalText} />
      </View>
    );
  } else
    return (
      <View
        style={{
          backgroundColor: COLORS.commonBackground,
          flex: 1,
          paddingHorizontal: 15,
        }}
      >
        {posts.length == 0 ? (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }
          >
            <View style={styles.centered}>
              <Image
                source={require("../../assets/sad.png")}
                style={styles.image}
              />
              <Text
                style={{
                  fontSize: 16,
                  alignSelf: "center",
                  fontWeight: "500",
                  marginTop: 30,
                  color: COLORS.postUser,
                }}
              >
                There are no post yet...
              </Text>
            </View>
          </ScrollView>
        ) : (
          <View>
            <FlatList
              onRefresh={onRefresh}
              refreshing={isRefreshing}
              data={posts}
              renderItem={({ item }) => (
                <Post post={item} isLiked={likedPosts.includes(item.id)} />
              )}
              ItemSeparatorComponent={itemSeparator}
            />
          </View>
        )}

        {isPostModalVisible && (
          <PostModal
            isVisible={isPostModalVisible}
            onDismiss={() => setIsPostModalVisible(false)}
          />
        )}

        <TouchableOpacity
          style={styles.Iconbutton}
          onPress={() => setIsPostModalVisible(true)}
        >
          <Feather
            name="plus-square"
            size={30}
            color="white"
            style={{ margin: 10 }}
          />
        </TouchableOpacity>
      </View>
    );
}
const styles = StyleSheet.create({
  Iconbutton: {
    position: "absolute",
    right: 10,
    bottom: 10,
    borderRadius: 10,
    backgroundColor: COLORS.CTAButtonBackground,
  },
  image: {
    width: 260,
    height: 250,
    alignSelf: "center",
  },
  centered: {
    marginTop: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingPage: {
    backgroundColor: COLORS.commonBackground,
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
});
