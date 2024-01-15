import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
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
  const [phone_number, setPhone_number] = useState("null");
  const ShopNameLength = 30;
  const descLength = 300;

  const [shopImageUrl, setShopImageUrl]: any = useState(null);
  const [shopImageUrlPicked, setShopImageUrlPicked] = useState(false);

  async function handleCreateShop() {
    CreateShopHelper(name, link, bio, shopImageUrl, navigation,phone_number);
  }

  async function handlePickImage() {
    const shopId = await pickImageAndStore("shops", setShopImageUrl);
    if (shopId) {
      setShopImageUrlPicked(true);
    }
  }

  return (
    <CommonScrollableBackground>
      <View style={{ margin: 15 }}>
        <Text style={style.font}>Upload image</Text>

        {shopImageUrlPicked ? (
          <View
            style={{
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <Image source={{ uri: shopImageUrl }} style={style.uploadedIMG} />

            <TouchableOpacity style={style.changeIMG} onPress={handlePickImage}>
              <Text style={style.blackFont}>Change image</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity style={style.uploadIMG} onPress={handlePickImage}>
              <Feather name="upload" size={30} color="white" />
            </TouchableOpacity>
          </View>
        )}

        <View style={{ marginTop: 5, marginBottom: 20, alignSelf: "stretch" }}>
          <ThematicBreak />
        </View>

        <View style={{ gap: 10 }}>
          <Text style={style.font}>Shop name</Text>
          <CustomTextInput
            placeholder={"Enter shop name"}
            onChangeText={(text) => setName(text)}
            maxLength={ShopNameLength}
          />
          <Text style={style.lengthCounterFont}>
            {name.length}/{ShopNameLength}
          </Text>
        </View>
        <View style={{ gap: 10,marginBottom:10 }}>
          <Text style={style.font}>Phone number</Text>
          <CustomTextInput
            placeholder={"07********"}
            onChangeText={(text) => setPhone_number((text))}
            maxLength={10}
            mode={"tel"}
          />
        </View>
        <View style={{ gap: 10 }}>
          <Text style={style.font}>Social Media link</Text>
          <CustomTextInput
            placeholder={"Your Social Media link"}
            onChangeText={(text: any) => setLink(text)}
          />
        </View>
        <View style={{ marginTop: 15, gap: 10 }}>
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
          <Text style={style.blackFont}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </CommonScrollableBackground>
  );
}

const style = StyleSheet.create({
  font: { fontSize: 20, fontWeight: "500", color: COLORS.darkBrown },
  lengthCounterFont: {
    color: COLORS.normalText,
    fontSize: 15,
    alignSelf: "flex-end",
  },
  ConfirmButton: {
    backgroundColor: COLORS.CTAButtonBackground,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    height: 60,
    borderRadius: 8,
    marginBottom: 40,
  },
  uploadIMG: {
    backgroundColor: COLORS.brown,
    width: 120,
    height: 120,
    borderRadius: 120,
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 30,
  },
  blackFont: { color: "white", fontWeight: "bold", fontSize: 18.44 },
  uploadedIMG: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    borderRadius: 300,
  },
  changeIMG: {
    height: 40,
    backgroundColor: COLORS.CTAButtonBackground,
    marginTop: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});
