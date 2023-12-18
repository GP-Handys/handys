import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import extractImageId from "../helpers/imageIdExtractor";

export default async function pickImageAndStore(basePath: string, setUrl: any): Promise<string | null> { 
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 0,
  });
  if (!result.canceled) {
    const imgId = extractImageId(result.assets[0].uri);
    const storage = getStorage();
    const storageRef = ref(
      storage,
      basePath + "/" + imgId
    );
    const img = await fetch(result.assets[0].uri);
    const bytes = await img.blob();
    await uploadBytes(storageRef, bytes);
    await getDownloadURL(storageRef).then((url: any) => {
      setUrl(url);
    });
    return imgId;
  }
  return null;
}
