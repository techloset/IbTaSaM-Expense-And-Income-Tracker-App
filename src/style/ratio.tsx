import {Dimensions, PixelRatio} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const widthBaseScale: number = SCREEN_WIDTH / 375;
const heightBaseScale: number = SCREEN_HEIGHT / 812;

function normalize(size: number, based: 'width' | 'height' = 'width'): number {
  const newSize =
    based === 'height' ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

// for width pixel
const widthPixel = (size: number): number => {
  return normalize(size, 'width');
};

// for height pixel
const heightPixel = (size: number): number => {
  return normalize(size, 'height');
};

// for font pixel
const fontPixel = (size: number): number => {
  return heightPixel(size);
};

// for Margin and Padding vertical pixel
const pixelSizeVertical = (size: number): number => {
  return heightPixel(size);
};

// for Margin and Padding horizontal pixel
const pixelSizeHorizontal = (size: number): number => {
  return widthPixel(size);
};

export default {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
};

// import {Dimensions} from 'react-native';
// import {PixelRatio} from 'react-native';

// const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// const widthBaseScale = SCREEN_WIDTH / 375;
// const heightBaseScale = SCREEN_HEIGHT / 812;

// function normalize(size, based = 'width') {
//   const newSize =
//     based === 'height' ? size * heightBaseScale : size * widthBaseScale;
//   return Math.round(PixelRatio.roundToNearestPixel(newSize));
// }
// //for width  pixel
// const widthPixel = size => {
//   return normalize(size, 'width');
// };
// //for height  pixel
// const heightPixel = size => {
//   return normalize(size, 'height');
// };
// //for font  pixel
// const fontPixel = size => {
//   return heightPixel(size);
// };
// //for Margin and Padding vertical pixel
// const pixelSizeVertical = size => {
//   return heightPixel(size);
// };
// //for Margin and Padding horizontal pixel
// const pixelSizeHorizontal = size => {
//   return widthPixel(size);
// };
// export default {
//   widthPixel,
//   heightPixel,
//   fontPixel,
//   pixelSizeVertical,
//   pixelSizeHorizontal,
//   SCREEN_WIDTH,
//   SCREEN_HEIGHT,
// };
