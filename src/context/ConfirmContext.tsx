import { useState, useContext, createContext, useRef } from 'react';
import { ConfirmInterface } from '../interface/ConfirmInterface';
import ConfirmModal from '../components/modal/ConfirmModal';

type ConfirmModalContextType = (data: ConfirmInterface) => Promise<boolean>;

interface ModalContextProviderProps {
	children: React.ReactNode;
}

const ConfirmContext = createContext<ConfirmModalContextType>(
	{} as ConfirmModalContextType
);

const ConfirmContextProvider: React.FC<ModalContextProviderProps> = (props) => {
	const [state, setState] = useState<ConfirmInterface>({ isOpen: false });

	const functionRef = useRef<Function>();

	const handleShow = (data: ConfirmInterface): Promise<boolean> => {
		setState({ ...data, isOpen: true });
		return new Promise((resolve) => (functionRef.current = resolve));
	};

	const hide = () => setState({ isOpen: false });

	const handleConfirm = () => {
		functionRef.current && functionRef.current(true);
		hide();
	};

	const handleClose = () => {
		functionRef.current && functionRef.current(false);
		hide();
	};

	const providerValue: ConfirmModalContextType = handleShow;

	return (
		<ConfirmContext.Provider value={providerValue}>
			{props.children}

			<ConfirmModal
				{...state}
				onClose={handleClose}
				onConfirm={handleConfirm}
			/>
		</ConfirmContext.Provider>
	);
};

export const useConfirmModal = (): ConfirmModalContextType =>
	useContext(ConfirmContext);

export default ConfirmContextProvider;
