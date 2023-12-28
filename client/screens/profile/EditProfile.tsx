import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { CommonScrollableBackground } from "../../common/background";
import { Feather } from "@expo/vector-icons";
import CustomTextInput from "../../components/CustomTextInput";
import { useEffect, useState } from "react";
import COLORS from "../../common/colors";
import { StackProps } from "../../components/navigation/NavigationStack";
import pickImageAndStore from "../../storage/store";
import ThematicBreak from "../../components/ThematicBreak";
import { useNavigation } from "@react-navigation/native";
import EditProfileHelper from "../../helpers/Profile/EditProfileHelper";
import { getProfile } from "../../api/UserApi";

export default function EditProfile() {
  const navigation = useNavigation<StackProps["navigation"]>();

  const [user, setUser]: any = useState();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [Confirmassword, setConfirmPassword] = useState("");
  const UserNameLength = 25;

  const [userImageUrl, setUserImageUrl]: any = useState(null);
  const [userImageUrlPicked, setUserImageUrlPicked] = useState(false);

  async function handleEditProfile() {
    EditProfileHelper(
      name,
      password,
      Confirmassword,
      userImageUrl,
      1,
      navigation
    );
  }

  async function handlePickImage() {
    const userId = await pickImageAndStore("users", setUserImageUrl);
    if (userId) {
      setUserImageUrlPicked(true);
    }
  }

  useEffect(() => {
    const fetchProfile = async () => {
      await getProfile().then(async (result) => {
        setUser(result);
        setName(result.name);
        setUserImageUrl(result.pfp_url);
        if (result.php_url != null) {
          setUserImageUrlPicked(true);
        }
      });
    };

    fetchProfile();
  }, []);

  return (
    <CommonScrollableBackground>
      <View style={{ margin: 15 }}>
        <Text style={style.font}>Upload image</Text>

        {userImageUrlPicked ? (
          <View
            style={{
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <Image source={{ uri: userImageUrl }} style={style.uploadedIMG} />

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
          <Text style={style.font}>Name</Text>
          <CustomTextInput
            placeholder={"Enter your new name"}
            onChangeText={(text) => setName(text)}
            maxLength={UserNameLength}
          />
          <Text style={style.lengthCounterFont}>
            {name?.length}/{UserNameLength}
          </Text>
        </View>

        <View style={{ gap: 10 }}>
          <Text style={style.font}>Password</Text>
          <CustomTextInput
            placeholder={"Your password"}
            onChangeText={(text: any) => setPassword(text)}
          />
        </View>
        <View style={{ marginTop: 15, gap: 10 }}>
          <Text style={style.font}>confirm password</Text>
          <CustomTextInput
            placeholder={"Confirm password"}
            onChangeText={(text: any) => setConfirmPassword(text)}
          />
        </View>
      </View>
      <View style={{ marginHorizontal: 38 }}>
        <TouchableOpacity
          onPress={handleEditProfile}
          style={style.ConfirmButton}
        >
          <Text style={style.blackFont}>Confirm</Text>
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
  blackFont: { color: "black", fontWeight: "bold", fontSize: 18.44 },
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
