import { CommonBackgroundWithSafeArea } from "../../common/background";
import { Button } from "react-native-paper";

export default function Profile() {
    return (
        <CommonBackgroundWithSafeArea>
            <Button buttonColor="purple" textColor="white">
                CLICK ME
            </Button>
        </CommonBackgroundWithSafeArea>
    );
}