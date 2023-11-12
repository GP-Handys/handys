import { Button } from "react-native-paper";
import { CommonBackgroundWithNoSafeArea } from "../../common/background";


export default function Search() {
    return (
        <CommonBackgroundWithNoSafeArea>
            <Button buttonColor="green" textColor="black">
                CLICK ME
            </Button>
        </CommonBackgroundWithNoSafeArea>
    );
}