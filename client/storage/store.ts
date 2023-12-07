import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import extractImageId from "../helpers/imageIdExtractor";

export default async function pickImageAndStore(basePath: string) {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });
  if (!result.canceled) {
    const storage = getStorage();
    const storageRef = ref(
      storage,
      basePath + "/" + extractImageId(result.assets[0].uri)
    );
    const img = await fetch(result.assets[0].uri);
    const bytes = await img.blob();
    await uploadBytes(storageRef, bytes);
    console.log(extractImageId(result.assets[0].uri));
  }
}