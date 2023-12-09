import { View, FlatList } from "react-native";
import ThematicBreak from "../../components/ThematicBreak";
import AddPost from "../../components/community/AddPost";
import { useState, useEffect } from "react";
import { getPosts } from "../../api/CommunityApi";
import Post from "../../components/community/Post";
import COLORS from "../../common/colors";

export default function Community() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      await getPosts().then((result) => {
        setPosts(result);
      });
    };
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
    <View style={{backgroundColor: COLORS.commonBackground}}>
    <FlatList
        data={posts.reverse()}
        renderItem={({ item }) => <Post post={item} />}
        ItemSeparatorComponent={itemSeparator}
        keyExtractor={(item) => item.id}
      />
      <AddPost />
    </View>
    
  );
}
