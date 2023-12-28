import { FlatList, StyleSheet, View } from "react-native";
import CustomTextInput from "../../components/CustomTextInput";
import { useState, useEffect } from "react";
import Post from "../../components/community/Post";
import {
  CommonBackgroundWithSafeArea,
  CommonScrollableBackground,
} from "../../common/background";
import ThematicBreak from "../../components/ThematicBreak";
import { addComment, getComments } from "../../api/CommunityApi";
import { TextInput } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

export default function Comments({ route }: any) {
  const { post } = route.params;
  const [comment, setComment] = useState("");
  const [Comments, setComments] = useState([]);

  const handleAddComment = async () => {
    await addComment(post.id, { content: comment }).then(() => {
      setComment("");
      console.log(comment);
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
    <CommonBackgroundWithSafeArea>
      <CommonScrollableBackground>
        <Post post={post} isComment={false} />
        <View style={{ marginTop: 10 }}>
          <ThematicBreak />
        </View>
        <View style={{ marginHorizontal: 18, marginTop: 5 }}>
          <FlatList
            data={Comments}
            renderItem={({ item }) => <Post post={item} isComment={true} />}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <ThematicBreak />}
            refreshing={true}
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
    </CommonBackgroundWithSafeArea>
  );
}
