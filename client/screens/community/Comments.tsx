import {
  FlatList,
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  Keyboard,
  SafeAreaView,
} from "react-native";
import CustomTextInput from "../../components/CustomTextInput";
import { useState, useEffect } from "react";
import Post from "../../components/community/Post";
import { CommonBackgroundWithSafeArea , CommonScrollableBackground} from "../../common/background";
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
      setComments(result.reverse());
    });
  };
  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <>
    <CommonScrollableBackground>
        <View style={{ marginLeft: 10 }}>
          <Post post={post} isComment={false} isLiked={isLiked} />
        </View>
        <View style={{ marginTop: 10 }}>
          <ThematicBreak />
        </View>
        <View style={{ marginHorizontal: 7, marginTop: 7 }}>
          <FlatList
            data={Comments}
            renderItem={({ item }) => (
              <Post
                post={item}
                isComment={true}
                isLiked={false}
                mainPostStyle={styles.mainPostStyle}
                userProfileStyle={styles.userProfileStyle}     
                userDataStyle={styles.userDataStyle}
                pfpImgStyle={styles.pfpImgStyle}
                userNameStyle={styles.userNameStyle}
              />
            )}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <ThematicBreak />}
          />
        </View>
     </CommonScrollableBackground>
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
     </>
     
  );
}

const styles = StyleSheet.create({
  pfpImgStyle: {
    height: 27,
    width: 27,
    borderRadius: 27,
  },
  userDataStyle: {
    marginLeft: 10,
  },

  userProfileStyle: {
    marginTop: 5,
  },
  userNameStyle: {
    fontSize: 11.5,
  },
  mainPostStyle: {
    flex: 1,
    marginLeft: 18,
    backgroundColor: "#FFFFFF10",
    borderRadius: 16,
    paddingHorizontal: 10,
    marginTop: 5,
    paddingBottom: 5,
  },
});
