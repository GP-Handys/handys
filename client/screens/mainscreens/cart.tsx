import { Button } from "react-native-paper";
import { CommonBackgroundWithNoSafeArea } from "../../common/background";

export default function Cart() {
    return (
        <CommonBackgroundWithNoSafeArea>
            <Button buttonColor="orange" textColor="white">
                CLICK ME
            </Button>
        </CommonBackgroundWithNoSafeArea>
    );
}