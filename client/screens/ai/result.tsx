import { CommonScrollableBackground } from "../../common/background";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import COLORS from "../../common/colors";
import React, { useState, useEffect } from "react";
import { StackParamList } from "../../components/navigation/NavigationStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator } from "react-native-paper";
import CustomTextInput from "../../components/CustomTextInput";

type StackProps = NativeStackScreenProps<StackParamList>;

export default function Profile({ navigation }: StackProps) {
  const [picture1, setPicture1] = useState(require("../../assets/crafter.png"));
  const [picture2, setPicture2] = useState(require("../../assets/crafter.png"));
  const [picture3, setPicture3] = useState(require("../../assets/crafter.png"));
  const [picture4, setPicture4] = useState(require("../../assets/crafter.png"));

  return (
    <CommonScrollableBackground>
      <View style={{ marginTop: "25%", marginHorizontal: 20 }}>
        <CustomTextInput placeholder="Type your Prompt.." multiline={true} maxLength={100} />
      </View>
      <View style={style.cardsContainer}>
        <View style={style.otherGrid}>
          <Image source={picture1} style={style.card} />

          <Image source={picture2} style={style.card} />
        </View>
        <View style={style.otherGrid}>
          <Image source={picture3} style={style.card} />

          <Image source={picture4} style={style.card} />
        </View>
      </View>

      <View style={{ marginBottom: 40, marginHorizontal: 10 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Profile");
          }}
          style={style.generateAgain}
        >
          <Text style={{ color: "black", fontWeight: "600", fontSize: 16 }}>
            Generate Again
          </Text>
        </TouchableOpacity>
      </View>
    </CommonScrollableBackground>
  );
}

const style = StyleSheet.create({
  card: {
    resizeMode: "cover",
    width: 150,
    height: 150,
    borderRadius: 9,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: COLORS.handysGrey
  },
  otherGrid: { flexDirection: "row", gap: 20 },

  cardFont: {
    fontSize: 19,
    color: "white",
    fontWeight: "500"
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginTop: "15%"
  },
  generateAgain: {
    backgroundColor: COLORS.CTAButtonBackground,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 8,
    marginTop:"25%"
  }
});