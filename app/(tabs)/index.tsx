import { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';

import { launchImageLibraryAsync } from 'expo-image-picker';
import IconButton from '@/components/IconButton';
import CircleButton from '@/components/CircleButton';
import EmojiPicker from '@/components/EmojiPicker';
import EmojiList from '@/components/EmojiList';
import EmojiSticker from '@/components/EmojiSticker';

export default function Index() {
  const [currentImage, setCurrentImage] = useState<undefined | string>(undefined);
  const [isAdditionalButtonsShown, setIsAdditionalButtonsShown] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState<string | undefined>(undefined);

  const pickImageAsync = async () => {
    let result = await launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setCurrentImage(result.assets[0].uri);
      setIsAdditionalButtonsShown(true);
    } else {
      alert('You need to choose image');
    }
  };

  const onReset = () => {
    setCurrentImage(undefined);
    setIsAdditionalButtonsShown(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={currentImage} />
        {pickedEmoji && <EmojiSticker emoji={pickedEmoji} size={24} />}
      </View>

      {isAdditionalButtonsShown ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon='refresh' label='Reset' onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon='save-alt' label='Save' onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button label='Choose a photo' onPress={pickImageAsync} />
          <Button
            label='Use this photo'
            theme='secondary'
            onPress={() => {
              setIsAdditionalButtonsShown(true);
            }}
          />
        </View>
      )}
      {isModalVisible && (
        <EmojiPicker isVisible={isModalVisible} onClose={onClose}>
          <EmojiList onCloseModal={onClose} onSelect={setPickedEmoji} />
        </EmojiPicker>
      )}
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
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
