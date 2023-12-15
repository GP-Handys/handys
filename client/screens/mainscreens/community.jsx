import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import ThematicBreak from "../../components/ThematicBreak";
import PostModal from "../../components/community/PostModal";
import { useState, useEffect } from "react";
import { getPosts } from "../../api/CommunityApi";
import Post from "../../components/community/Post";
import COLORS from "../../common/colors";
import { MaterialIcons } from "@expo/vector-icons";

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPostModalVisible, setPostModalVisible] = useState(false);

  const handleDismiss = () => {
    setPostModalVisible(false);
  };

  const handlePress = () => {
    console.log("Button pressed");
    setPostModalVisible(true);
  };

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
      {isPostModalVisible && (
        <PostModal isVisible={isPostModalVisible} onDismiss={handleDismiss} />
      )}
      <TouchableOpacity style={styles.Iconbutton} onPress={handlePress}>
        <MaterialIcons name="add-circle" size={50} color="#F6977F" />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  Iconbutton: {
    position: "absolute",
    width: 48,
    height: 48,
    bottom: 25,
    right: 20,
    alignItems: "center",
  },
});
