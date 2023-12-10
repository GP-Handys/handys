import { View, FlatList } from "react-native";
import ThematicBreak from "../../components/ThematicBreak";
import AddPost from "../../components/community/AddPost";
import { useState, useEffect } from "react";
import { getPosts } from "../../api/CommunityApi";
import Post from "../../components/community/Post";
import COLORS from "../../common/colors";

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchPosts().then(() => {
      setIsRefreshing(false);
    });
  };
  const fetchPosts = async () => {
    await getPosts().then((result) => {
      setPosts(result.reverse());
    });
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  const itemSeparator = () => {
    return (
      <View>
        <ThematicBreak />
      </View>
    );
  };

  return (
    <View style={{ backgroundColor: COLORS.commonBackground }}>
      <FlatList
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        data={posts}
        renderItem={({ item }) => <Post post={item} />}
        ItemSeparatorComponent={itemSeparator}
        keyExtractor={(item) => item.id}
      />
      <AddPost />
    </View>
  );
}
