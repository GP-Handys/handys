import { Button } from "react-native-paper";
import { CommonBackgroundWithNoSafeArea } from "../../common/background";
import Choose from "../supportscreens/choose";
import SendTicket from '../supportscreens/sendTicket';
import DoneScreen from "../supportscreens/doneScreen";
export default function Search() {
    return (
        <CommonBackgroundWithNoSafeArea>
            <SendTicket/>
        </CommonBackgroundWithNoSafeArea>
    );
}