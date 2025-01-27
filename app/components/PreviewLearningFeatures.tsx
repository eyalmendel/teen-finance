import React, { useEffect, useState } from 'react';
import { horizontalScale, moderateScale, verticalScale } from '@services/scale';
import { LearningPreview } from '@models/learning-preview';
import PreviewCard from '@components/PreviewCard';
import { StyleSheet, Text } from 'react-native';
import { STYLES } from '@config/styles';
import { translate } from '@services/language';
import Icons from '@assets/icons';
import AppSimpleList from '@components/AppSimpleList';
import AppImage from '@components/AppImage';

const LEARNING_PREVIEW: LearningPreview[] = [
    {
        id: 0,
        name: 'dailyChallenge',
        icon: Icons.dailyChallenge,
    },
    {
        id: 1,
        name: 'WhatsNew',
        icon: Icons.WhatsNew,
    },
];

function PreviewLearningFeatures() {
    return (
        <AppSimpleList
            style={styles.featureList}
            data={LEARNING_PREVIEW}
            renderItem={(item) => (
                <PreviewCard
                    style={styles.PreviewCardContainer}
                    onPress={() => console.log('Feature')}
                >
                    <>
                        <Text style={styles.PreviewCardTitle}>
                            {translate(item.name)}
                        </Text>
                        <AppImage
                            style={styles.image}
                            source={item.icon}
                            contentFit="contain"
                        />
                    </>
                </PreviewCard>
            )}
        />
    );
}

const styles = StyleSheet.create({
    PreviewCardContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: moderateScale(16),
    },
    image: {
        width: horizontalScale(120),
        height: verticalScale(120),
        aspectRatio: 1,
        flexShrink: 0,
    },
    PreviewCardTitle: {
        ...STYLES.cardTitle,
        ...STYLES.rightAlignedText,
        width: horizontalScale(91),
        height: verticalScale(40),
        //marginTop: 50,
    },
    featureList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: moderateScale(16),
    },
});

export default PreviewLearningFeatures;
