import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import AppCard from '@components/AppCard';
import AppSimpleList from '@components/AppSimpleList';
import EmptyState from '@components/EmptyState';
import EstimatedTime from '@components/EstimatedTime';
import Screen from '@components/Screen';
import SubjectScreenTitle from '@components/SubjectScreenTitle';
import { COLORS } from '@config/colors';
import { STYLES } from '@config/styles';
import { MediaLearningUnit } from '@models/learning-unit';
import { getAudioUnitsBySubjectName } from '@services/data';
import { translate } from '@services/language';
import { moderateScale, verticalScale } from '@services/scale';
import { getSelectedSubjectName } from '@services/state';
import AppAudioPlayer from '@components/AppAudioPlayer';

function ListeningStyleScreen() {
    const [audioUnits, setAudioUnits] = useState<MediaLearningUnit[]>([]);

    useEffect(() => {
        setAudioLearningUnits();
    }, []);

    const setAudioLearningUnits = async (): Promise<void> => {
        const selectedSubjectName = getSelectedSubjectName();

        if (selectedSubjectName === null) {
            return;
        }

        const audioUnits = getAudioUnitsBySubjectName(selectedSubjectName);
        setAudioUnits(audioUnits);
    };

    return (
        <Screen>
            <SubjectScreenTitle template="listeningStyleScreenTitle" />

            {audioUnits?.length === 0 ? (
                <EmptyState />
            ) : (
                <AppSimpleList
                    style={styles.list}
                    data={audioUnits}
                    renderItem={(item) => (
                        <AppCard style={styles.cardContainer}>
                            <>
                                <Text
                                    style={[
                                        styles.title,
                                        STYLES.rightAlignedText,
                                    ]}
                                >
                                    {translate(item.title)}
                                </Text>

                                {item.description && (
                                    <Text
                                        style={[
                                            STYLES.defaultText,
                                            STYLES.rightAlignedText,
                                        ]}
                                    >
                                        {translate(item.description)}
                                    </Text>
                                )}
                                <EstimatedTime time={item.estimatedTime} />
                                <AppAudioPlayer
                                    sourceUri={item.sourceUrl}
                                />
                            </>
                        </AppCard>
                    )}
                ></AppSimpleList>
            )}
        </Screen>
    );
}

const styles = StyleSheet.create({
    list: {
        gap: moderateScale(16),
        paddingVertical: verticalScale(24),
    },
    cardContainer: {
        width: '98%',
    },
    boxShadow: {
        elevation: 4,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 10,
    },
    title: {
        ...STYLES.cardTitle,
        marginBlockEnd: verticalScale(8),
    },
});

export default ListeningStyleScreen;
