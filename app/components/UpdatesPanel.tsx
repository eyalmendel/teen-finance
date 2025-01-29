import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { horizontalScale, moderateScale, verticalScale } from '@services/scale';
import { LearningPreview } from '@models/learning-preview';
import { useModal } from '@hooks/useModal';
import { STYLES } from '@config/styles';
import { translate } from '@services/language';
import Icons from '@assets/icons';
import AppImage from '@components/AppImage';
import WelcomeModal from '@components/WelcomeModal';
import PreviewCard from '@components/PreviewCard';
import AppModal from './AppModal';

const LEARNING_PREVIEW: LearningPreview[] = [
    {
        id: 0,
        name: 'dailyChallenge',
        icon: Icons.dailyChallenge,
        isAvailable: false,
    },
    {
        id: 1,
        name: 'whatsNew',
        icon: Icons.whatsNew,
        isAvailable: true,
    },
];

function UpdatesPanel() {
    const { showModal } = useModal();

    const handlePress = (): void => {
        showModal(<WelcomeModal />, true);
    };

    return (
        <View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.featureList}
            >
                {LEARNING_PREVIEW.map((item) => (
                    <PreviewCard
                        key={item.id}
                        style={styles.content}
                        onPress={handlePress}
                        disabled={!item.isAvailable}
                    >
                        <>
                            {!item.isAvailable && (
                                <AppImage
                                    style={styles.comingSoon}
                                    source={Icons.comingSoon}
                                />
                            )}
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
                ))}
            </ScrollView>
            <AppModal />
        </View>
    );
}

const styles = StyleSheet.create({
    featureList: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: moderateScale(16),
        marginBottom: verticalScale(32),
        paddingHorizontal: horizontalScale(8),
    },
    content: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: moderateScale(10),
        justifyContent: 'space-between',
    },
    image: {
        width: horizontalScale(120),
        height: verticalScale(120),
        aspectRatio: 1,
    },
    PreviewCardTitle: {
        ...STYLES.cardTitle,
        ...STYLES.rightAlignedText,
        width: horizontalScale(91),
        height: verticalScale(40),
    },

    comingSoon: {
        width: '60%',
        gap: 10,
        position: 'absolute',
        opacity: 0.2,
    },
});

export default UpdatesPanel;
