import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonBackgroundWithNoSafeArea } from "../../common/background";

export default function Home() {
  return (
    <CommonBackgroundWithNoSafeArea>
      <Button
        onPress={async () => {
          console.log(await AsyncStorage.getItem("Authorization"));
        }}
      >
        CLICK ME
      </Button>
    </CommonBackgroundWithNoSafeArea>
  );
}
