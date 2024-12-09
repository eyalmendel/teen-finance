import { StringKey, STRINGS } from 'app/config/strings';

export const translate = (key: StringKey | null): string => {
    if (key === null) {
        return '';
    }

    const translated = STRINGS[key] ?? null;
    if (translated === null) {
        return key;
    }

    return translated;
};
