import { View, Text } from "react-native";
import moment from "moment";

export default function TimeStamp() {
  const formattedTime = moment().startOf("day").fromNow();

  return (
    <View>
      <Text style={{ color: "#FFFFFA", fontSize: 13.11 }}>{formattedTime}</Text>
    </View>
  );
}
