import { View, FlatList, StyleSheet, TouchableOpacity ,Text} from "react-native";
import ThematicBreak from "../../components/ThematicBreak";
import PostModal from "../../components/community/PostModal";
import { useState, useEffect } from "react";
import { getPosts } from "../../api/CommunityApi";
import Post from "../../components/community/Post";
import { MaterialIcons } from "@expo/vector-icons";
import COLORS from "../../common/colors";

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
      <View style={{marginVertical:10}}>
        <ThematicBreak />
      </View>
    );
  };

  return (
    <View style={{ backgroundColor: COLORS.commonBackground ,flex:1,paddingHorizontal:15}}>

        {posts.length==0 && (
          <Text style={{fontSize:25,alignSelf:"center",fontWeight:"400",marginTop:30,color:"white"}}>There are no post yet...</Text>
        )}

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
          <MaterialIcons name="add-circle" size={55} color="#F6977F" />
        </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  Iconbutton: {
    position: "absolute",
    right:20,
    bottom:25
  },
});
