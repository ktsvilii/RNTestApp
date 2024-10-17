import { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';

import { launchImageLibraryAsync } from 'expo-image-picker';

export default function Index() {
  const [currentImage, setCurrentImage] = useState<undefined | string>(undefined);

  const pickImageAsync = async () => {
    let result = await launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setCurrentImage(result.assets[0].uri);
      return console.log(result);
    } else {
      alert('You need to choose image');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={currentImage} />
      </View>

      <View style={styles.footerContainer}>
        <Button label='Choose a photo' onPress={pickImageAsync} />
        <Button label='Use this photo' theme='secondary' />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 28,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
