import React from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';

type TypeWithId = {
    id: string | number;
};

type Props<T extends TypeWithId> = {
    data: Array<T>;
    renderItem: (item: T) => JSX.Element;
    style?: ViewStyle;
    numColumns?: number;
    keyExtractor?: (item: T) => string | number;
};

function _defaultKeyExtractor<T extends TypeWithId>(item: T): string | number {
    return item.id;
}

export default function AppSimpleList<T extends TypeWithId>({
    data,
    style,
    renderItem,
    numColumns = 1,
    keyExtractor = _defaultKeyExtractor,
}: Props<T>) {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.list, style]}
        >
            {data?.map((item: T, index: number) => (
                <View
                    style={{ width: `${100 / numColumns}%` }}
                    key={keyExtractor(item) ?? index}
                >
                    {renderItem(item)}
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    list: {
        width: '100%',
    },
});
