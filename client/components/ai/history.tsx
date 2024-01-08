import { View, Text, Image, StyleSheet } from "react-native";

interface Props {
  imageUrl: string;
  prompt: string;
}

export default function History({ imageUrl, prompt }: Props) {
  return (
    <View style={styles.mainContainer}>
      <Image source={{ uri: imageUrl }} />
      <Text>{prompt}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "row",
  },
});
