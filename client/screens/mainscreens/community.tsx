import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Pressable,
  Alert,
  TouchableOpacity,
} from "react-native";
import { CommonBackgroundWithNoSafeArea } from "../../common/background";
import CreatePostButton from "../../components/community/createPost";

export default function Community() {
  return (
    <CommonBackgroundWithNoSafeArea>
      <CreatePostButton />
    </CommonBackgroundWithNoSafeArea>
  );
}

const styles = StyleSheet.create({});
