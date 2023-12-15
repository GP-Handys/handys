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
import ThematicBreak from "../ThematicBreak";
import COLORS from "../../common/colors";
import PostOwnerHeader from "./PostOwnerHeader";
import CustomTextInput from "../CustomTextInput";
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
  const [postImageUrl, setPostImageUrl] = useState<any | null>(null);
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
    <View style={styles.Iconbutton}>
      <Modal animationType="slide" transparent={false} visible={isVisible}>
        <CommonBackgroundWithSafeArea>
          <View style={styles.ModalBackGround}>
            <View style={styles.ModalHeadrer}>
              <TouchableOpacity onPress={onDismiss} style={styles.CloseButton}>
                <MaterialIcons name="close" size={23} color="white" />
              </TouchableOpacity>

              <Text style={styles.HeaderText}> Create post</Text>

              <TouchableOpacity
                onPress={handleAddPost}
                style={[styles.PostButton, { opacity: postText ? 1 : 0.5 }]}
                disabled={!postText}
              >
                <Text style={styles.InnerPostButton}>Post</Text>
              </TouchableOpacity>
            </View>
            <ThematicBreak />
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 7 }}
          >
            <View style={{ marginBottom: 4, width: 120, marginLeft: 10 }}>
              <PostOwnerHeader userId={user.id} />
            </View>
            <TouchableOpacity style={{ marginLeft: 295, position: "absolute" }}>
              <MaterialIcons
                name="insert-photo"
                size={30}
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
  Iconbutton: {
    position: "absolute",
    width: 48,
    height: 48,
    bottom: 25,
    right: 20,
    alignItems: "center",
  },
  ModalBackGround: {
    backgroundColor: COLORS.commonBackground,
  },
  ModalHeadrer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    marginTop: -25,
    marginBottom: 10,
  },
  CloseButton: {
    width: 30,
    marginLeft: 20,
  },
  HeaderText: {
    fontSize: 20,
    width: 150,
    color: "white",
    marginLeft: 50,
    paddingRight: 25,
  },
  PostButton: {
    borderWidth: 1,
    borderRadius: 20,
    width: 86,
    alignItems: "center",
    height: 38,
    backgroundColor: "#F6977F",
    marginLeft: 20,
  },
  InnerPostButton: {
    color: "black",
    alignItems: "center",
    fontWeight: "700",
    marginTop: 5,
    fontSize: 15,
  },
  postImgUploaded: {
    width: 350,
    height: 250,
    marginTop: 8,
    marginLeft: 5,
  },
});
