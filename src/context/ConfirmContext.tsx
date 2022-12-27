import { useState, useContext, createContext, useRef } from 'react';
import { ConfirmInterface } from '../interface/ConfirmInterface';
import ConfirmModal from '../components/modal/ConfirmModal';

interface ModalContextInterface {
	showConfirmation: (data: ConfirmInterface) => Promise<boolean>;
}

interface ModalContextProviderProps {
	children: React.ReactNode;
}

const ConfirmContext = createContext<ModalContextInterface>(
	{} as ModalContextInterface
);

const ConfirmContextProvider: React.FC<ModalContextProviderProps> = (props) => {
	const [state, setState] = useState<ConfirmInterface>({ isOpen: false });

	const funcRef = useRef<Function>();

	const handleShow = (data: ConfirmInterface): Promise<boolean> => {
		setState({ ...data, isOpen: true });
		return new Promise((resolve) => {
			funcRef.current = resolve;
		});
	};

	const handleConfirm = () => {
		funcRef.current && funcRef.current(true);
		setState({ isOpen: false });
	};

	const handleClose = () => {
		funcRef.current && funcRef.current(false);
		setState({ isOpen: false });
	};

	const value: ModalContextInterface = {
		showConfirmation: handleShow,
	};

	return (
		<ConfirmContext.Provider value={value}>
			{props.children}
			<ConfirmModal
				{...state}
				onClose={handleClose}
				onConfirm={handleConfirm}
			/>
		</ConfirmContext.Provider>
	);
};

export const useConfirmModal = (): ModalContextInterface =>
	useContext(ConfirmContext);

export default ConfirmContextProvider;

// Doczytać artykuł
// https://medium.com/@royeeshemesh/customizable-confirmation-dialog-in-react-js-using-hooks-context-api-and-typescript-2ab52a46228
