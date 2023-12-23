import { View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackProps } from "../navigation/NavigationStack";
import { PostModel } from "../../models/Post";
interface Props {
  post: PostModel;
}

export default function CommentButton({ post }: Props) {
  const navigation = useNavigation<StackProps["navigation"]>();

  return (
    <View>
      <TouchableOpacity 
      onPress={() => {navigation.navigate("Comments", {
        post: post,
      })}
      }
      >
        <MaterialIcons name="comment" size={25} color={"#FFFFFFBF"} />
      </TouchableOpacity>
    </View>
  );
}
