import { ImageRequireSource, ImageStyle, StyleSheet } from 'react-native';
import React from 'react';
import { Image, ImageProps } from 'expo-image';

type Props = {
    source: ImageRequireSource | string;
    style?: ImageStyle | ImageStyle[];
};

export default function AppImage({
    source,
    style,
    ...rest
}: Props & ImageProps) {
    return <Image source={source} style={[styles.image, style]} {...rest} />;
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
    },
});
