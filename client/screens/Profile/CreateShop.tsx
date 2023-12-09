import { View, Text, Pressable, StyleSheet } from "react-native";
import { CommonScrollableBackground } from "../../common/background";
import { Feather } from "@expo/vector-icons";
import CustomTextInput from "../../components/CustomTextInput";
import { useState } from "react";
import COLORS from "../../common/colors";
import CreateShopHelper from "../../helpers/Profile/CreateShop";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../components/navigation/NavigationStack";

type StackProps = NativeStackScreenProps<StackParamList>;

export default function CreateShop({ navigation }: StackProps) {
  const [name, setName] = useState("");
  const [link, setLink] = useState(null);
  const [bio, setBio] = useState("");
  const ShopNameLength = 30;
  const descLength = 300;

  async function handleCreateShop() {
    CreateShopHelper(name, link, bio, null, navigation);
  }

  return (
    <CommonScrollableBackground>
      <View style={{ marginHorizontal: 30}}>
        <Text style={style.font}>Upload image</Text>
        <Pressable style={style.uploadIMG}>
          <Feather name="upload" size={30} color="white" />
        </Pressable>

        <Text style={style.font}>Shop name</Text>

        <View style={{ marginTop: 15 }}>
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
        <Pressable
          onPress={handleCreateShop}
          style={({ pressed }) => [
            style.ConfirmButton,
            {
              opacity: pressed ? 0.6 : 1,
            },
          ]}
        >
          <Text style={style.confirm}>confirm</Text>
        </Pressable>
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
