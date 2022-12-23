import { useState, createContext } from 'react';

const defaultValue = {
	opened: false,
	toggleModal: () => {},
};

export const ModalContext = createContext(defaultValue);

interface ModalContextProviderProps {
	children: React.ReactNode;
}

const ModalContextProvider: React.FC<ModalContextProviderProps> = (props) => {
	const [opened, setOpened] = useState(defaultValue.opened);

	const toggleModal = () => setOpened(!opened);

	const providerValue = {
		opened,
		toggleModal,
	};

	return (
		<ModalContext.Provider value={providerValue}>
			{props.children}
		</ModalContext.Provider>
	);
};

export default ModalContextProvider;
