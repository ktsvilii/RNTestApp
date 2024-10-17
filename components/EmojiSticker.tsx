import { Image } from 'expo-image';
import { FC } from 'react';
import { View } from 'react-native';

interface EmojiStickerProps {
  emoji: string;
  size: number;
}

const EmojiSticker: FC<EmojiStickerProps> = ({ emoji, size }) => {
  return (
    <View style={{ top: -350 }}>
      <Image source={emoji} style={{ height: size, width: size }} />
    </View>
  );
};

export default EmojiSticker;
