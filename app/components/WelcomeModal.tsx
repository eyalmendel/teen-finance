import { StyleSheet, Text, View } from 'react-native';
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
                <Text style={styles.titleText}>{translate('welcome')}</Text>
                <View>
                    <Text style={styles.text}>{MODAL_CONTENT}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: horizontalScale(8),
        paddingBottom: horizontalScale(32),
        paddingRight: verticalScale(32),
        paddingLeft: verticalScale(16),
    },
    content: {
        gap: moderateScale(16),
    },
    titleText: {
        fontSize: TEXT.size.large,
        fontFamily: TEXT.font.assistantBold,
        color: COLORS.primary,
        ...STYLES.rightAlignedText,
    },
    text: {
        fontFamily: TEXT.font.assistantRegular,
        fontSize: TEXT.size.default,
        lineHeight: 20,
        ...STYLES.rightAlignedText,
    },
});
