import { Button } from "react-native-paper";
import { CommonBackgroundWithNoSafeArea } from "../../common/background";

export default function Community() {
    return (
        <CommonBackgroundWithNoSafeArea>
            <Button buttonColor="red" textColor="white">
                CLICK ME
            </Button>
        </CommonBackgroundWithNoSafeArea>
    );
}