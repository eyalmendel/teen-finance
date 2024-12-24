import React, { useState } from 'react';

import { ModalContext } from '@context/modalContext';

type ModalProviderProps = {
    children: JSX.Element;
};

export default function ModalProvider({ children }: ModalProviderProps) {
    const [isShown, setIsShown] = useState<boolean>(false);
    const [content, setContent] = useState<JSX.Element | null>(null);

    const showModal = (content: JSX.Element): void => {
        setIsShown(true);
        setContent(content);
    };

    const hideModal = (): void => {
        setContent(null);
        setIsShown(false);
    };

    const value = {
        isShown,
        showModal,
        hideModal,
        content,
    };

    return (
        <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
    );
}
