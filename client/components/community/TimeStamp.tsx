import { View, Text } from "react-native";
import moment from "moment";

export default function TimeStamp() {
  const formattedTime = moment("2023-11-17 17:08:31", "YYYY-MM-DD HH:mm:ss")
    .add(3, "hours")
    .fromNow();

  return (
    <View>
      <Text style={{ color: "#FFFFFA80", fontSize: 13.11 }}>{formattedTime}</Text>
    </View>
  );
}
