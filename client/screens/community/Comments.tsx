import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Touchable,
  TouchableOpacity,
} from "react-native";
import CustomTextInput from "../../components/CustomTextInput";
import { useState } from "react";
import Post from "../../components/community/Post";
import {
  CommonBackgroundWithSafeArea,
  CommonScrollableBackground,
} from "../../common/background";
import ThematicBreak from "../../components/ThematicBreak";
import { getComments } from "../../api/CommunityApi";
import { useEffect } from "react";
import { TextInput } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

export default function Comments({ route }: any) {
  const { post } = route.params;
  const [comments, setComments] = useState("");
  const [submittedComments, setSubmittedComments] = useState("");

  const handleAddComment = () => {
    setSubmittedComments(comments);
    setComments("");
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
        <Text>{submittedComments}</Text>
      </CommonScrollableBackground>

      <CustomTextInput
        onChangeText={(text) => setComments(text)}
        value={comments}
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
