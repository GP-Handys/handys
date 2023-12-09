import { View, Text } from "react-native";
import moment from "moment";

interface TimeStampProps {
time: Date;

}
export default function TimeStamp({time}: TimeStampProps) {
  const formattedTime = moment(time, "YYYY-MM-DD HH:mm:ss")
    .add(3, "hours")
    .fromNow();

  return (
    <View>
      <Text style={{ color: "#FFFFFA80", fontSize: 13.11 }}>{formattedTime}</Text>
    </View>
  );
}
