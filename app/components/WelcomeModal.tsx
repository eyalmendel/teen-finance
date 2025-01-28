import { StyleSheet, Text, View, Image } from 'react-native';
import Icons from '@assets/icons';
import { COLORS } from '@config/colors';
import { STYLES } from '@config/styles';
import { TEXT } from '@config/text';
import { translate } from '@services/language';
import { horizontalScale, moderateScale, verticalScale } from '@services/scale';
import { MODAL_CONTENT } from '@mocks/modal-content';

export default function WelcomeModal() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.titleContainer}>
                    <Image source={Icons.wavingHand} style={styles.icon} />
                    <Text style={styles.titleText}>{translate('welcome')}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{MODAL_CONTENT}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: moderateScale(8),
    },
    content: {
        gap: moderateScale(32),
    },
    titleContainer: {
        gap: moderateScale(8),
        flexDirection: 'row',
    },
    titleText: {
        fontSize: TEXT.size.large,
        fontFamily: TEXT.font.assistantBold,
        color: COLORS.primary,
        ...STYLES.rightAlignedText,
    },
    textContainer: {},

    text: {
        fontFamily: TEXT.font.assistantRegular,
        fontSize: TEXT.size.default,
        lineHeight: 20,
        ...STYLES.rightAlignedText,
    },
    icon: {
        width: horizontalScale(24),
        height: verticalScale(24),
    },
});

