import React, { FC } from 'react';
import { FlatList, Image, Platform, Pressable, StyleSheet } from 'react-native';

interface EmojiPickerProps {
  onCloseModal: () => void;
  onSelect: (image: string) => void;
}

const emojies = [
  require('../assets/images/emoji1.png'),
  require('../assets/images/emoji2.png'),
  require('../assets/images/emoji3.png'),
  require('../assets/images/emoji4.png'),
  require('../assets/images/emoji5.png'),
  require('../assets/images/emoji6.png'),
];

const EmojiList: FC<EmojiPickerProps> = ({ onSelect, onCloseModal }) => {
  const selectEmoji = (item: string) => {
    onSelect(item);
    onCloseModal();
  };

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      data={emojies}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => {
        return (
          <Pressable onPress={() => selectEmoji(item)}>
            <Image source={item} key={index} style={styles.image} />
          </Pressable>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});

export default EmojiList;
