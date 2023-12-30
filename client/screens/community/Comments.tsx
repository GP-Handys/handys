import {
  FlatList,
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  Keyboard,
} from "react-native";
import CustomTextInput from "../../components/CustomTextInput";
import { useState, useEffect } from "react";
import Post from "../../components/community/Post";
import {
  CommonBackgroundWithSafeArea,
} from "../../common/background";
import ThematicBreak from "../../components/ThematicBreak";
import { addComment, getComments } from "../../api/CommunityApi";
import { TextInput } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

export default function Comments({ route }: any) {
  const { post } = route.params;
  const { isLiked } = route.params;
  const [comment, setComment] = useState("");
  const [Comments, setComments] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleAddComment = async () => {
    await addComment(post.id, { content: comment }).then(() => {
      setComment("");
      Keyboard.dismiss();
    });
  };
  const onRefresh = () => {
    setIsRefreshing(true);
    fetchComments().then(() => {
      setIsRefreshing(false);
    });
  };
  const fetchComments = async () => {
    await getComments(post.id).then((result) => {
      setComments(result);
    });
  };
  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <CommonBackgroundWithSafeArea>
      
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        >
          <Post post={post} isComment={false} isLiked={isLiked}  />
          <View style={{ marginTop: 10 }}>
            <ThematicBreak />
          </View>
          <View style={{ marginHorizontal: 18, marginTop: 5 }}>
            <FlatList
              data={Comments}
              renderItem={({ item }) => <Post post={item} isComment={true} isLiked={false}
              mainPostStyle={{marginRight:25,borderWidth:1,borderColor:"black"}} 
              userProfileStyle={{marginRight:25,borderWidth:1,borderColor:"black"}} 
              footerStyle={{borderWidth:1}} 
              
              />}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <ThematicBreak />}
            />
          </View>
        </ScrollView>
  
      <CustomTextInput
        onChangeText={(text) => setComment(text)}
        value={comment}
        placeholder="Add a comment"
        multiline={true}
        right={
          <TextInput.Icon
            icon={() => <MaterialIcons name="send" size={23} color="white" />}
            color={"white"}
            onPress={handleAddComment}
          />
        }
      />
    </CommonBackgroundWithSafeArea>
  );
}
