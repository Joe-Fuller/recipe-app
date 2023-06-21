import * as FileSystem from "expo-file-system";

const downloadImage = async (imageUrl, imageName) => {
  console.log("1");
  const downloadDest = `${FileSystem.documentDirectory}/${imageName}.jpg`;
  console.log("in downloadImage");

  try {
    const { uri } = await FileSystem.downloadAsync(imageUrl, downloadDest);
    console.log("Image downloaded:", uri);
  } catch (error) {
    console.error("Failed to download image:", error);
  }
};

export default downloadImage;
