import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import ThematicBreak from "../../components/ThematicBreak";
import PostModal from "../community/AddPostModal";
import { useState, useEffect } from "react";
import { getPosts } from "../../api/CommunityApi";
import Post from "../../components/community/Post";
import { MaterialIcons } from "@expo/vector-icons";
import COLORS from "../../common/colors";

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPostModalVisible, setIsPostModalVisible] = useState(false);

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
      <View style={{ marginVertical: 20 }}>
        <ThematicBreak />
      </View>
    );
  };

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
              source={require("../../assets/content-creation-monochromatic.png")}
              style={styles.image}
            />
            <Text
              style={{
                fontSize: 16,
                alignSelf: "center",
                fontWeight: "500",
                marginTop: 30,
                color: "white",
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
            renderItem={({ item }) => <Post post={item} />}
            ItemSeparatorComponent={itemSeparator}
            keyExtractor={(item) => item.id}
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
        <MaterialIcons name="add-circle" size={55} color="#F6977F" />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  Iconbutton: {
    position: "absolute",
    right: 20,
    bottom: 20,
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
});
