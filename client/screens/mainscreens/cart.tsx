import { CommonBackgroundWithSafeArea } from "../../common/background";
import { Button } from "react-native-paper";

export default function Cart() {
    return (
        <CommonBackgroundWithSafeArea>
            <Button buttonColor="orange" textColor="white">
                CLICK ME
            </Button>
        </CommonBackgroundWithSafeArea>
    );
}