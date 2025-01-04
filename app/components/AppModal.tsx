import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    Modal,
    Pressable,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

import { COLORS } from '@config/colors';
import { STYLES } from '@config/styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { horizontalScale, moderateScale, verticalScale } from '@services/scale';
import { useModal } from 'app/hooks/useModal';

export default function AppModal() {
    const { isShown, isCloseable, hideModal, content } = useModal();
    const navigation = useNavigation();

    const handleRequestClose = (): void => {
        hideModal();
        if (!isCloseable) {
            navigation.goBack();
        }
    };

    return (
        <Modal
            visible={isShown}
            onRequestClose={handleRequestClose}
            transparent={true}
            statusBarTranslucent={true}
        >
            <TouchableOpacity
                style={[
                    styles.overlay,
                    !isCloseable ? styles.disabledOverlay : null,
                ]}
                onPress={hideModal}
            >
                <View style={styles.modal}>
                    {isCloseable && (
                        <Pressable
                            style={styles.closeButton}
                            onPress={hideModal}
                        >
                            <MaterialCommunityIcons
                                name="close-circle-outline"
                                size={24}
                                color={COLORS.primary}
                            />
                        </Pressable>
                    )}
                    {content}
                </View>
            </TouchableOpacity>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        paddingHorizontal: horizontalScale(20),
    },
    disabledOverlay: {
        pointerEvents: 'none',
    },
    modal: {
        width: '100%',
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
