import { StringKey, STRINGS } from 'app/config/strings';

export const translate = (
    key: StringKey | null,
    params: StringKey[] | null = null,
): string => {
    if (key === null) {
        return '';
    }

    const translated = STRINGS[key] ?? null;
    if (translated === null) {
        return key;
    }

    return params !== null ? fillParams(translated, params) : translated;
};

const fillParams = (template: string, values: StringKey[]): string =>
    template.replace(/\{(\d+)\}/g, (match, key) =>
        values[key] !== undefined ? STRINGS[values[key]] : match,
    );
