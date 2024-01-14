import { Image } from "react-native";

export default function Logo() {
  return <Image source={require("../assets/Logo2.png")} 
    style={{ width: 250, height: 150, resizeMode: "contain" }}
  />;
}
