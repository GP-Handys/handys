import { View, Text, Image, StyleSheet } from "react-native";
import { GeneratedImage } from "../../models/GeneratedImage";

interface Props {
    generatedImage: GeneratedImage
}

export default function History({ generatedImage }: Props) {
  return (
    <View style={styles.mainContainer}>
      <Image source={{ uri: generatedImage.image_url }} />
      <Text>{generatedImage.prompt}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "row",
  },
});
