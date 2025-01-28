import React, { useState } from 'react';
import { horizontalScale, moderateScale, verticalScale } from '@services/scale';
import { LearningPreview } from '@models/learning-preview';
import PreviewCard from '@components/PreviewCard';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { STYLES } from '@config/styles';
import { translate } from '@services/language';
import Icons from '@assets/icons';
import AppSimpleList from '@components/AppSimpleList';
import AppImage from '@components/AppImage';
import WelcomeModal from '@components/WelcomeModal';
import { COLORS } from '@config/colors';

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
    const [isModalVisible, setModalVisible] = useState(false);

    const handlePress = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            <AppSimpleList
                style={styles.featureList}
                data={LEARNING_PREVIEW}
                renderItem={(item) => (
                    <PreviewCard style={styles.container} onPress={handlePress}>
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
                )}
            />

            <Modal
                transparent={true}
                visible={isModalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={closeModal}
                        >
                            <AppImage
                                source={Icons.cancel}
                                style={styles.closeIcon}
                            />
                        </TouchableOpacity>
                        <WelcomeModal />
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        //position: 'relative',
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
    featureList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        gap: moderateScale(16),
    },
    comingSoon: {
        //width: horizontalScale(154),
        width: '60%',
        gap: 10,
        position: 'absolute',
        opacity: 0.2,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.20)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: horizontalScale(335),
        borderRadius: moderateScale(28),
        backgroundColor: COLORS.eggWhite,
        paddingTop: horizontalScale(8),
        paddingBottom: horizontalScale(32),
        paddingRight: verticalScale(32),
        paddingLeft: verticalScale(8),
        alignItems: 'flex-end',
    },
    closeButton: {
        zIndex: 10,
        alignSelf: 'flex-start',
    },
    closeIcon: {
        width: horizontalScale(24),
        height: verticalScale(24),
    },
});

export default PreviewLearningFeatures;
