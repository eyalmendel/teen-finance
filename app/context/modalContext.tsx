import { createContext } from 'react';

export type ModalContextType = {
    isShown: boolean;
    showModal: (content: JSX.Element) => void;
    hideModal: () => void;
    content: JSX.Element | null;
};

export const ModalContext = createContext<ModalContextType>({
    isShown: false,
    showModal: (content: JSX.Element) => {},
    hideModal: () => {},
    content: null,
});

ModalContext.displayName = 'ModalContext';
