import { CommonBackgroundWithSafeArea } from "../../common/background";
import { Button } from "react-native-paper";

export default function Search() {
    return (
        <CommonBackgroundWithSafeArea>
            <Button buttonColor="green" textColor="black">
                CLICK ME
            </Button>
        </CommonBackgroundWithSafeArea>
    );
}