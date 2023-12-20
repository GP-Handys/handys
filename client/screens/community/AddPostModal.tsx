import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Text,
  Image,
} from "react-native";
import { CommonBackgroundWithSafeArea } from "../../common/background";
import { MaterialIcons } from "@expo/vector-icons";
import ThematicBreak from "../../components/ThematicBreak";
import COLORS from "../../common/colors";
import PostOwnerHeader from "../../components/community/PostOwnerHeader";
import CustomTextInput from "../../components/CustomTextInput";
import pickImageAndStore from "../../storage/store";
import { addPost } from "../../api/CommunityApi";
import { getProfile } from "../../api/UserApi";

interface PostModalProps {
  isVisible: boolean;
  onDismiss: () => void;
}

export default function PostModal({
  isVisible,
  onDismiss,
}: Readonly<PostModalProps>) {
  const [postImageUrl, setPostImageUrl] = useState<any>(null);
  const [postImgPicked, setPostImgPicked] = useState(false);
  const [postText, setPostText] = useState("");
  const [user, setUser] = useState({} as any);
  const handleAddPost = async () => {
    await addPost({ content: postText, img_url: postImageUrl }).then(() => {
      setPostImageUrl(null);
      setPostText("");
      onDismiss();
    });
  };
  useEffect(() => {
    const fetchProfile = async () => {
      await getProfile().then((result) => {
        setUser(result);
      });
    };
    fetchProfile();
  }, []);

  return (
    <View>
      <Modal animationType="slide" transparent={false} visible={isVisible}>
        <CommonBackgroundWithSafeArea>
          <View style={{ backgroundColor: COLORS.commonBackground }}>
            <View style={styles.ModalHeader}>
              <TouchableOpacity onPress={onDismiss} style={styles.CloseButton}>
                <MaterialIcons name="close" size={23} color="white" />
              </TouchableOpacity>
              <Text style={styles.HeaderText}> Create post</Text>
              <TouchableOpacity
                onPress={handleAddPost}
                style={[
                  styles.PostButton,
                  {
                    opacity: postText ? 1 : 0.5,
                    position: "absolute",
                    right: 0,
                  },
                ]}
                disabled={!postText}
              >
                <Text style={styles.InnerPostButton}>Post</Text>
              </TouchableOpacity>
            </View>
            <ThematicBreak />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 20,
              marginTop: 15,
            }}
          >
            <PostOwnerHeader userId={user.id} />
            <TouchableOpacity>
              <MaterialIcons
                name="insert-photo"
                size={40}
                color="#FFFFFF83"
                onPress={async () => {
                  const imgId = await pickImageAndStore(
                    "posts",
                    setPostImageUrl
                  );
                  if (imgId) {
                    setPostImgPicked(true);
                  }
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 5, paddingLeft: 10 }}>
            <CustomTextInput
              placeholder={"Share your thoughts!"}
              multiline={true}
              bgColor={COLORS.commonBackground}
              onChangeText={(text) => {
                setPostText(text);
              }}
            />
          </View>
          {postImgPicked && (
            <TouchableOpacity
              onPress={async () => {
                const imgId = await pickImageAndStore("posts", setPostImageUrl);
                if (imgId) {
                  setPostImgPicked(true);
                }
              }}
            >
              <Image
                source={{ uri: postImageUrl }}
                style={styles.postImgUploaded}
              />
            </TouchableOpacity>
          )}
        </CommonBackgroundWithSafeArea>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  ModalHeader: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    marginHorizontal: 15,
  },
  CloseButton: {
    width: 30,
    position: "absolute",
    left: 0,
  },
  HeaderText: {
    fontSize: 20,
    color: "white",
  },
  PostButton: {
    borderWidth: 1,
    borderRadius: 20,
    width: 86,
    alignItems: "center",
    height: 40,
    backgroundColor: "#F6977F",
    justifyContent: "center",
  },
  InnerPostButton: {
    color: "black",
    alignItems: "center",
    fontWeight: "700",
    fontSize: 18,
  },
  postImgUploaded: {
    width: 350,
    height: 250,
    resizeMode: "contain",
    alignSelf: "center",
  },
});