import { useState, useContext, createContext } from 'react';

import ModalForm from '../components/modal/ModalForm';

import { ModalInterface } from '../interface/ModalInterface';

type ModalContextType = (data?: ModalInterface) => void;

interface ModalContextProviderProps {
	children: React.ReactNode;
}

interface modalStateProps extends ModalInterface {
	isOpen: boolean;
}

const ModalContext = createContext<ModalContextType>({} as ModalContextType);

const ModalContextProvider: React.FC<ModalContextProviderProps> = (props) => {
	const [modalState, setModalState] = useState<modalStateProps>({
		isOpen: false,
	});

	const handleModal: ModalContextType = (data) =>
		setModalState({ ...data, isOpen: true });

	const closeModal = () => setModalState({ isOpen: false });

	const providerValue = handleModal;

	return (
		<ModalContext.Provider value={providerValue}>
			{props.children}
			{modalState.isOpen && <ModalForm {...modalState} onClose={closeModal} />}
		</ModalContext.Provider>
	);
};

export const useModal = () => useContext(ModalContext);

export default ModalContextProvider;
