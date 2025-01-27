import React from 'react';
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
        isAvailable: false,
    },
    {
        id: 1,
        name: 'WhatsNew',
        icon: Icons.WhatsNew,
        isAvailable: false,
    },
];

function PreviewLearningFeatures() {
    return (
        <AppSimpleList
            style={styles.featureList}
            data={LEARNING_PREVIEW}
            renderItem={(item) => (
                <PreviewCard
                    style={styles.container}
                    onPress={() => console.log('Feature')}
                >
                    <>
                        {/* {!item.isAvailable && (
                            <AppImage
                                style={styles.comingSoon}
                                source={Icons.comingSoon}
                            />
                        )} */}
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
    container: {
        position: 'relative',
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
    comingSoon: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        opacity: 0.2,
    },
});

export default PreviewLearningFeatures;
