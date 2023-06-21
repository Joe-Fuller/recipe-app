import * as FileSystem from "expo-file-system";

const downloadImage = async (imageUrl, imageName) => {
  try {
    const downloadDest = `${FileSystem.documentDirectory}${imageName}.jpg`;

    const downloadResumable = FileSystem.createDownloadResumable(
      imageUrl,
      downloadDest
    );

    const { uri } = await downloadResumable.downloadAsync();

    return uri; // Return the file path to the downloaded image
  } catch (error) {
    console.error("Failed to download image:", error);
    return null;
  }
};

export default downloadImage;
