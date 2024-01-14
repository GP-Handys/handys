import { View, Text } from "react-native";
import moment from "moment";
import COLORS from "../../common/colors";

interface TimeStampProps {
  time: Date;
}
export default function TimeStamp({ time }: TimeStampProps) {
  const formattedTime = moment(time, "YYYY-MM-DD HH:mm:ss")
    .add(3, "hours")
    .fromNow();

  return (
    <View>
      <Text style={{ color: COLORS.postContent, fontSize: 12.11 }}>
        {formattedTime}
      </Text>
    </View>
  );
}
