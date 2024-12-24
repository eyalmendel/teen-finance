import { COLORS } from '@config/colors';
import { STYLES } from '@config/styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { horizontalScale, moderateScale, verticalScale } from '@services/scale';
import { useModal } from 'app/hooks/useModal';
import React from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

export default function AppModal() {
    const { isShown, hideModal, content } = useModal();

    if (!isShown) {
        return null;
    }

    return (
        <Modal visible={isShown} onRequestClose={hideModal}>
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Pressable style={styles.closeButton} onPress={hideModal}>
                        <MaterialCommunityIcons
                            name="close-circle-outline"
                            size={24}
                            color={COLORS.primary}
                        />
                    </Pressable>
                    {content}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.black,
        opacity: 0.4,
    },
    modal: {
        paddingHorizontal: horizontalScale(16),
        paddingVertical: verticalScale(16),
        borderRadius: moderateScale(24),
        backgroundColor: COLORS.eggWhite,
        ...STYLES.boxShadow,
    },
    closeButton: {
        justifyContent: 'flex-start',
    },
});
