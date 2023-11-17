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
import CreatePostButton from "../../components/community/AddPost";
import TimeStamp from "../../components/community/TimeStamp";

export default function Community() {
  return (
    <CommonBackgroundWithNoSafeArea>
            <TimeStamp/>

      <CreatePostButton />
    </CommonBackgroundWithNoSafeArea>
  );
}

const styles = StyleSheet.create({});
