import {
  FlatList,
  StyleSheet,
  View,
  RefreshControl,
  Keyboard,
  InputAccessoryView,
  Platform,
} from "react-native";
import CustomTextInput from "../../components/CustomTextInput";
import { useState, useEffect } from "react";
import Post from "../../components/community/Post";
import { CommonScrollableBackground } from "../../common/background";
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
    let tempComment = comment;
    setComment("");
    Keyboard.dismiss();
    await addComment(post.id, { content: tempComment }).then(() => {});
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
    <>
      <CommonScrollableBackground
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
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

      {Platform.OS === "ios" ? (
        <InputAccessoryView>
          <CustomTextInput
            onChangeText={(text) => setComment(text)}
            value={comment}
            placeholder="Share your thoughts..."
            multiline={true}
            style={{
              borderRadius: 0,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              borderBottomLeftRadius: 0,
            }}
            right={
              <TextInput.Icon
                icon={() => (
                  <MaterialIcons name="send" size={23} color="white" />
                )}
                color={"white"}
                onPress={() => {
                  if (comment.trim() !== "") {
                    handleAddComment();
                  }
                }}
                style={{ borderWidth: 1 }}
              />
            }
          />
        </InputAccessoryView>
      ) : (
        <CustomTextInput
          onChangeText={(text) => setComment(text)}
          value={comment}
          placeholder="Share your thoughts..."
          multiline={true}
          style={{
            borderRadius: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 0,
          }}
          right={
            <TextInput.Icon
              icon={() => <MaterialIcons name="send" size={23} color="white" />}
              color={"white"}
              style={[
                { opacity: comment.trim() === "" ? 0.5 : 1 },
                { borderWidth: 1 },
              ]}
              onPress={() => {
                if (comment.trim() !== "") {
                  handleAddComment();
                }
              }}
              disabled={comment.trim() === ""}
            />
          }
        />
      )}
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
    marginLeft: 35,
    backgroundColor: "#BBB4AE",
    borderRadius: 7.5,
    borderTopLeftRadius: 0,
    paddingHorizontal: 10,
    marginTop: 4,
    paddingBottom: 5,
    alignSelf: "flex-start",
    maxWidth: "80%",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 4,
    marginVertical: 5,
  },
});
