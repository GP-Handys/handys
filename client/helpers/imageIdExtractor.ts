export default function extractImageId(id: string) {
    const arr = id.split("/")
    return arr[arr.length - 1]
  }