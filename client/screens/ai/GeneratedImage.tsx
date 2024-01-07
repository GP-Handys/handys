import { CommonScrollableBackground } from "../../common/background";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import COLORS from "../../common/colors";
import React, { useState } from "react";
import { StackParamList } from "../../components/navigation/NavigationStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator } from "react-native-paper";
import CustomTextInput from "../../components/CustomTextInput";

type StackProps = NativeStackScreenProps<StackParamList>;

export default function GeneratedImageScreen({ route }: any) {
  const prompt = route.params.prompt;
  const [image, setImage] = useState();
  const [generating, isGenerating] = useState(true);

  return (
    <CommonScrollableBackground>
      <View style={{ marginTop: "25%", marginHorizontal: 20 }}>
        <CustomTextInput
          placeholder="Type your Prompt.."
          multiline={true}
          maxLength={100}
        />
      </View>
      <View>
        <Image source={{ uri: "facebook.com" }} style={style.image} />
      </View>
      <View style={{ marginBottom: 40, marginHorizontal: 10 }}>
        <TouchableOpacity style={style.generateAgain}>
          <Text style={{ color: "white", fontWeight: "600", fontSize: 16 }}>
            Download
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.generateAgain}>
          <Text style={{ color: "black", fontWeight: "600", fontSize: 16 }}>
            Generate Again
          </Text>
        </TouchableOpacity>
      </View>
    </CommonScrollableBackground>
  );
}

const style = StyleSheet.create({
  image: {
    resizeMode: "cover",
    width: 150,
    height: 150,
    borderRadius: 9,
    alignItems: "center",
    padding: 15,
    backgroundColor: COLORS.handysGrey,
  },
  cardFont: {
    fontSize: 19,
    color: "white",
    fontWeight: "500",
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginTop: "15%",
  },
  generateAgain: {
    backgroundColor: COLORS.CTAButtonBackground,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 8,
    marginTop: "25%",
  },
  download: {
    backgroundColor: COLORS.handysGrey,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 8,
    marginTop: "25%",
  },
});
