import { View, Text, Image, StyleSheet } from "react-native";
import { GeneratedImage } from "../../models/GeneratedImage";

interface Props {
  generatedImage: GeneratedImage;
}

export default function History({ generatedImage }: Props) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: generatedImage.image_url }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.prompt}>{generatedImage.prompt}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
  imageContainer: {
    paddingLeft: 15,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
  },
  prompt: {
    fontSize: 14,
    fontWeight: "500",
    color: "white",
    marginTop: 5,
    paddingRight: 5,
  },
});
