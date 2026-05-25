import { ImageSourcePropType } from 'react-native';

/**
 * Add files under assets/placeholders/ with these names when ready:
 * - banner-fest.png
 * - genie-hero.png
 * - coupon-bg.png
 */
export const PLACEHOLDER_IMAGE_NAMES = [
  'banner-fest.png',
  'genie-hero.png',
  'coupon-bg.png',
] as const;

const loaded: Record<string, ImageSourcePropType> = {
  burger: require('../../assets/burger/burger.jpg'),
  burger2: require('../../assets/burger/burger2.jpg'),
  pizza: require('../../assets/pizza/pizza.jpg'),
  pizza2: require('../../assets/pizza/pizza2.jpg'),
  chinese: require('../../assets/chinese/chinese.jpg'),
  chinese2: require('../../assets/chinese/chinese2.jpg'),
  indian: require('../../assets/indian/indian.jpg'),
  indian2: require('../../assets/indian/indian2.jpg'),
  pasta: require('../../assets/pasta/pasta.jpg'),
  pasta2: require('../../assets/pasta/pasta2.jpg'),
  tacos: require('../../assets/tacos/tacos.jpg'),
  taco2: require('../../assets/tacos/taco2.jpg'),
  croissant: require('../../assets/french/crossiant.jpg'),
};

export function getFoodImage(key: string): ImageSourcePropType | undefined {
  return loaded[key];
}
