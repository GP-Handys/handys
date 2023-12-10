import { View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function CommentButton() {
  return (
    <View>
      <TouchableOpacity>
        <MaterialIcons name="comment" size={23} color={"#FFFFFFBF"} />
      </TouchableOpacity>
    </View>
  );
}
