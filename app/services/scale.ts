import { Dimensions } from 'react-native';

const _BASE_WIDTH = 375;
const _BASE_HEIGHT = 734;

const { width, height } = Dimensions.get('window');

export const horizontalScale = (size: number) => (width / _BASE_WIDTH) * size;

export const verticalScale = (size: number) => (height / _BASE_HEIGHT) * size;

export const moderateScale = (size: number, factor: number = 0.5) =>
    size + (horizontalScale(size) - size) * factor;
