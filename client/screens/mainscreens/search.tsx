import { Button } from "react-native-paper";
import { CommonBackgroundWithNoSafeArea } from "../../common/background";
import Choose from "../supportscreens/choose";
import SendTicket from '../supportscreens/sendTicket';
export default function Search() {
    return (
        <CommonBackgroundWithNoSafeArea>
            <SendTicket/>
        </CommonBackgroundWithNoSafeArea>
    );
}