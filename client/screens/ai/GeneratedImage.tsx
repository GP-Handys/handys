import { CommonScrollableBackground } from "../../common/background";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
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
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.imageView}>
        {false ? (
          <ActivityIndicator size={"large"} color="white" />
        ) : (
          <Image source={{ uri: "https://firebasestorage.googleapis.com/v0/b/handys-1.appspot.com/o/items%2F008E22D3-DC4C-43D6-898C-2B8D5F095366.jpg?alt=media&token=5f7fd35f-4634-49b3-a4bd-27b4d85318df" }} style={styles.image} />
        )}
      </View>
      <View>
        <TouchableOpacity style={styles.download}>
          <Text style={{ color: "white", fontWeight: "600", fontSize: 16 }}>
            Generate Again
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.generateAgain}>
          <Text style={{ color: "black", fontWeight: "600", fontSize: 16 }}>
            Download
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.commonBackground,
    flex: 1,
    justifyContent: "center",
  },
  imageView: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
    marginTop: -100
  },
  image: {
    width: 350,
    height: 350,
    borderRadius: 9,
    padding: 15,
    backgroundColor: COLORS.handysGrey,
  },
  generateAgain: {
    backgroundColor: COLORS.CTAButtonBackground,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 8,
    marginHorizontal: 50,
  },
  download: {
    backgroundColor: COLORS.handysGrey,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 8,
    marginBottom: 15,
    marginHorizontal: 50,
  },
});
