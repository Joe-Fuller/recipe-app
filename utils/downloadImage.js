import RNFS from "react-native-fs";

const imagePath = `${RNFS.DocumentDirectoryPath}/images`;

const createImageDirectory = async () => {
  try {
    await RNFS.mkdir(imagePath);
    console.log("Image directory created successfully");
  } catch (error) {
    console.log("Failed to create image directory:", error);
  }
};

const downloadImage = async (imageUrl, imageName) => {
  const destinationPath = `${imagePath}/${imageName}`;

  try {
    const downloadResult = await RNFS.downloadFile({
      fromUrl: imageUrl,
      toFile: destinationPath,
    });

    if (downloadResult.statusCode === 200) {
      console.log("Image downloaded successfully");
    } else {
      console.log("Failed to download image:", downloadResult.statusCode);
    }
  } catch (error) {
    console.log("Error while downloading image:", error);
  }
};

export default { createImageDirectory, downloadImage };
