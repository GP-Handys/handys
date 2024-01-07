import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import COLORS from "../../common/colors";
import React, { useEffect, useState } from "react";
import { StackParamList } from "../../components/navigation/NavigationStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { generateImage } from "../../api/Ai";

type StackProps = NativeStackScreenProps<StackParamList>;

export default function GeneratedImageScreen({ route }: any) {
  const navigation = useNavigation<StackProps["navigation"]>();
  const prompt = route.params.prompt;
  const [imageUrl, setImageUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(true);

  const handleGenerateImage = async () => {
    await generateImage(prompt).then((result) => {
      if (result.status == 200) {
        setImageUrl(result.data);
        setIsGenerating(false);
      }
    });
  };

  useEffect(() => {
    handleGenerateImage();
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.imageView}>
        {isGenerating ? (
          <ActivityIndicator size={"large"} color="white" />
        ) : (
          <Image
            source={{
              uri: imageUrl,
            }}
            style={styles.image}
          />
        )}
      </View>
      <View>
        <TouchableOpacity
          style={styles.download}
          onPress={() => navigation.pop()}
        >
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
    marginTop: -100,
  },
  image: {
    resizeMode: "contain",
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
