import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { FC } from 'react';

const PlaceholderImage = require('@/assets/images/background-image.png');

interface ImageViewerProps {
  imgSource?: string;
}

const ImageViewer: FC<ImageViewerProps> = ({ imgSource }) => {
  return <Image source={imgSource ?? PlaceholderImage} style={styles.image} />;
};

export default ImageViewer;

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
