import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonBackgroundWithSafeArea } from "../../common/background";

export default function Home() {
  return (
    <CommonBackgroundWithSafeArea>
      <Button
        onPress={async () => {
          console.log(await AsyncStorage.getItem("Authorization"));
        }}
      >
        CLICK ME
      </Button>
    </CommonBackgroundWithSafeArea>
  );
}
