import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import ThematicBreak from "../../components/ThematicBreak";
import PostModal from "../../components/community/PostModal";
import { useState, useEffect } from "react";
import { getPosts } from "../../api/CommunityApi";
import Post from "../../components/community/Post";
import { MaterialIcons } from "@expo/vector-icons";
import { CommonBackgroundWithNoSafeArea } from "../../common/background";

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPostModalVisible, setPostModalVisible] = useState(false);

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
    <CommonBackgroundWithNoSafeArea>
      <FlatList
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        data={posts}
        renderItem={({ item }) => <Post post={item} />}
        ItemSeparatorComponent={itemSeparator}
        keyExtractor={(item) => item.id}
      />
      {isPostModalVisible && (
        <PostModal
          isVisible={isPostModalVisible}
          onDismiss={() => setPostModalVisible(false)}
        />
      )}
      <TouchableOpacity
        style={styles.Iconbutton}
        onPress={() => setPostModalVisible(true)}
      >
        <MaterialIcons name="add-circle" size={50} color="#F6977F" />
      </TouchableOpacity>
    </CommonBackgroundWithNoSafeArea>
  );
}
const styles = StyleSheet.create({
  Iconbutton: {
    bottom: 25,
    right: 20,
    position: "absolute",
  },
});
