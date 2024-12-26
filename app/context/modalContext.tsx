import { createContext } from 'react';

export type ModalContextType = {
    isShown: boolean;
    showModal: (content: JSX.Element, isCloseable: boolean) => void;
    hideModal: () => void;
    isCloseable: boolean;
    content: JSX.Element | null;
};

export const ModalContext = createContext<ModalContextType>({
    isShown: false,
    showModal: (content: JSX.Element, isCloseable: boolean = true) => {},
    hideModal: () => {},
    isCloseable: true,
    content: null,
});

ModalContext.displayName = 'ModalContext';
