import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { CommonScrollableBackground } from "../../common/background";
import { Feather } from "@expo/vector-icons";
import CustomTextInput from "../../components/CustomTextInput";
import { useState } from "react";
import COLORS from "../../common/colors";
import CreateShopHelper from "../../helpers/Profile/CreateShop";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../components/navigation/NavigationStack";
import pickImageAndStore from "../../storage/store";
import ThematicBreak from "../../components/ThematicBreak";

type StackProps = NativeStackScreenProps<StackParamList>;

export default function CreateShop({ navigation }: StackProps) {
  const [name, setName] = useState("");
  const [link, setLink] = useState(null);
  const [bio, setBio] = useState("");
  const ShopNameLength = 30;
  const descLength = 300;

  const [shopImageUrl, setShopImageUrl]: any = useState(null);
  const [shopImageUrlPicked, setShopImageUrlPicked] = useState(false);

  async function handleCreateShop() {
    CreateShopHelper(name, link, bio, shopImageUrl, navigation);
  }

  async function handlePickImage() {
    const shopId = await pickImageAndStore("shops", setShopImageUrl);
    if (shopId) {
      setShopImageUrlPicked(true);
    }
  }

  return (
    <CommonScrollableBackground>
      <View style={{ marginHorizontal: 15 }}>
        <Text style={style.font}>Upload image</Text>

        {shopImageUrlPicked ? (
          <TouchableOpacity
            style={{
              alignItems: "center",
            }}
            onPress={handlePickImage}
          >
            <Image source={{ uri: shopImageUrl }} style={{width:300 , height:400 , resizeMode:"contain"}}/>
            <Text style={style.font}>Click on Image to change it</Text>
          </TouchableOpacity>
        ) : (
          <View>
            <TouchableOpacity style={style.uploadIMG} onPress={handlePickImage}>
              <Feather name="upload" size={30} color="white" />
            </TouchableOpacity>
          </View>
        )}

        <View style={{ marginTop: 5, marginBottom: 10, alignSelf: "stretch" }}>
          <ThematicBreak />
        </View>

        <View>
          <Text style={[style.font, { marginTop: 15, marginBottom: 10 }]}>
            Shop name
          </Text>
          <CustomTextInput
            placeholder={"Enter shop name"}
            onChangeText={(text) => setName(text)}
            maxLength={ShopNameLength}
          />
          <Text style={style.lengthCounterFont}>
            {name.length}/{ShopNameLength}
          </Text>
        </View>
        <View style={{ gap: 10 }}>
          <Text style={style.font}>Social Media link</Text>
          <CustomTextInput
            placeholder={"Your Social Media link"}
            onChangeText={(text: any) => setLink(text)}
          />
        </View>
        <View style={{ marginTop: 15, gap: 15 }}>
          <Text style={style.font}>Shop description</Text>
          <CustomTextInput
            placeholder={"Your Shop desciption"}
            onChangeText={(text: any) => setBio(text)}
            minHeight={200}
            multiline={true}
          />
          <Text style={style.lengthCounterFont}>
            {bio.length}/{descLength}
          </Text>
        </View>
      </View>
      <View style={{ marginHorizontal: 38 }}>
        <TouchableOpacity
          onPress={handleCreateShop}
          style={style.ConfirmButton}
        >
          <Text style={style.confirm}>confirm</Text>
        </TouchableOpacity>
      </View>
    </CommonScrollableBackground>
  );
}

const style = StyleSheet.create({
  font: { fontSize: 20, fontWeight: "500", color: "white" },
  lengthCounterFont: {
    color: "#FFFFFF80",
    fontSize: 15,
    alignSelf: "flex-end",
    marginTop: 10,
  },
  ConfirmButton: {
    backgroundColor: COLORS.CTAButtonBackground,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    height: 60,
    borderRadius: 8,
    marginBottom: 40,
  },
  uploadIMG: {
    backgroundColor: "#585858",
    width: 120,
    height: 120,
    borderRadius: 120,
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 30,
  },
  confirm: { color: "black", fontWeight: "bold", fontSize: 18.44 },
});
