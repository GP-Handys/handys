import { Button } from "react-native-paper";
import { CommonBackgroundWithSafeArea } from "../../common/background";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
