import { Button } from "react-native-paper";
import { CommonBackgroundWithNoSafeArea } from "../../common/background";


export default function Profile() {
    return (
        <CommonBackgroundWithNoSafeArea>
            <Button buttonColor="purple" textColor="white">
                CLICK ME
            </Button>
        </CommonBackgroundWithNoSafeArea>
    );
}