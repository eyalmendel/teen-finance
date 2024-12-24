import { useContext } from 'react';

import { ModalContext, ModalContextType } from '@context/modalContext';

export const useModal = (): ModalContextType => useContext(ModalContext);
