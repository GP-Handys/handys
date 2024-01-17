import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator
} from "react-native";
import COLORS from "../../common/colors";
import React, { useEffect, useState } from "react";
import { StackProps } from "../../components/navigation/NavigationStack";
import { useNavigation } from "@react-navigation/native";
import { generateImage } from "../../api/Ai";

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
          <ActivityIndicator size={"large"} color={COLORS.normalText} />
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
          style={[styles.generateAgain, { opacity: isGenerating ? 0.5 : 1 }]}
          onPress={() => navigation.pop()}
          disabled={isGenerating}
        >
          <Text style={{ color: "white", fontWeight: "600", fontSize: 16 }}>
            Generate Again
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
});
