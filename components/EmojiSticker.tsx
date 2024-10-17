import { FC } from 'react';
import { ImageSourcePropType } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface EmojiStickerProps {
  emoji: string;
  size: number;
}

const EmojiSticker: FC<EmojiStickerProps> = ({ emoji, size }) => {
  const scale = useSharedValue(size);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      scale.value *= 2;
    });

  const tripleTap = Gesture.Tap()
    .numberOfTaps(3)
    .onStart(() => {
      scale.value /= 2;
    });

  const gestures = Gesture.Exclusive(tripleTap, doubleTap);

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scale.value),
      height: withSpring(scale.value),
    };
  });

  const drag = Gesture.Pan().onChange(event => {
    translateX.value += event.changeX;
    translateY.value += event.changeY;
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    };
  });

  return (
    <GestureDetector gesture={drag}>
      <Animated.View style={[containerStyle, { top: -350 }]}>
        <GestureDetector gesture={gestures}>
          <Animated.Image
            source={emoji as ImageSourcePropType}
            resizeMode='contain'
            style={[imageStyle, { width: size, height: size }]}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
};

export default EmojiSticker;
