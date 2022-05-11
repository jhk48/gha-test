import { useState, SyntheticEvent, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { AppProviders, Modal } from '@components/index';
import { GLOBAL_SCROLLBAR_WIDTH } from '@constants/index';
import { CloseModalFn } from '@types';

type OpenModalFn = (e: SyntheticEvent, children: ReactNode) => void;
type ToggleModalFn = (e: SyntheticEvent) => void;

interface UseModalReturnType {
	isOpen: boolean;
	openModal: OpenModalFn;
	closeModal: CloseModalFn;
	toggleModal: ToggleModalFn;
}

export function useModal(): UseModalReturnType {
	const bodyElement = document.body;
	const modalRootElem = document.getElementById('modal-root') as Element;
	const [isOpen, setIsOpen] = useState(false);

	const closeModal = (e: SyntheticEvent, stopBubble = true) => {
		if (stopBubble && e.target !== e.currentTarget) return;
		bodyElement.style.overflow = '';
		bodyElement.style.paddingRight = '';
		e.stopPropagation();
		ReactDOM.unmountComponentAtNode(modalRootElem);
		setIsOpen(false);
	};

	const openModal = (e: SyntheticEvent, children: ReactNode) => {
		e.stopPropagation();
		bodyElement.style.overflow = 'hidden';
		bodyElement.style.paddingRight = `${GLOBAL_SCROLLBAR_WIDTH}px`;
		ReactDOM.render(
			<AppProviders>
				<Modal closeFunction={closeModal}>{children}</Modal>
			</AppProviders>,
			modalRootElem
		);
		setIsOpen(true);
	};

	const toggleModal = (e: SyntheticEvent) => {
		e.stopPropagation();
		setIsOpen(prev => !prev);
	};

	return { isOpen, openModal, closeModal, toggleModal };
}
