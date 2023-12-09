import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default async function retrieveImageUrlWithPath(path: string, setUrl: any): Promise<any | undefined> {
  const storage = getStorage();
  const storageRef = ref(storage, path);
  await getDownloadURL(storageRef).then((url: any) => {
    setUrl(url);
  });
  return undefined;
}