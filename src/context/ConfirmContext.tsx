import { useState, createContext } from 'react';

const defaultValue: defaultValueInterface = {
	opened: false,
	toggleModal: () => {},
};

export const ConfirmContext = createContext(defaultValue);

interface defaultValueInterface {
	opened: boolean;
	toggleModal: () => void;
}

interface ModalContextProviderProps {
	children: React.ReactNode;
}

const ConfirmContextProvider: React.FC<ModalContextProviderProps> = (props) => {
	const [opened, setOpened] = useState(defaultValue.opened);

	const toggleModal = () => setOpened(!opened);

	const providerValue = {
		opened,
		toggleModal,
	};

	return (
		<ConfirmContext.Provider value={providerValue}>
			{props.children}
		</ConfirmContext.Provider>
	);
};

export default ConfirmContextProvider;
