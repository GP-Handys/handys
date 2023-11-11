import { CommonBackgroundWithSafeArea } from "../../common/background";
import { Button } from "react-native-paper";

export default function Community() {
    return (
        <CommonBackgroundWithSafeArea>
            <Button buttonColor="red" textColor="white">
                CLICK ME
            </Button>
        </CommonBackgroundWithSafeArea>
    );
}