import fs from 'react-native-fs';

export const convertImageToBase64 = async (imageUri: string): Promise<string | null> => {
  try {
    const filePath = imageUri.replace('file://', '');

    return await fs.readFile(filePath, 'base64');
  } catch (error) {
    console.error('Error converting image to base64:', error);
    return null;
  }
};
