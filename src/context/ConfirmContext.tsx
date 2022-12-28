import { useState, useContext, createContext, useRef } from 'react';
import { ConfirmInterface } from '../interface/ConfirmInterface';
import ConfirmModal from '../components/modal/ConfirmModal';

type ModalContextType = (data: ConfirmInterface) => Promise<boolean>;

interface ModalContextProviderProps {
	children: React.ReactNode;
}

const ConfirmContext = createContext<ModalContextType>({} as ModalContextType);

const ConfirmContextProvider: React.FC<ModalContextProviderProps> = (props) => {
	const [state, setState] = useState<ConfirmInterface>({ isOpen: false });

	const funcRef = useRef<Function>();

	const handleShow = (data: ConfirmInterface): Promise<boolean> => {
		setState({ ...data, isOpen: true });
		return new Promise((resolve) => (funcRef.current = resolve));
	};

	const hide = () => setState({ isOpen: false });

	const handleConfirm = () => {
		funcRef.current && funcRef.current(true);
		hide();
	};

	const handleClose = () => {
		funcRef.current && funcRef.current(false);
		hide();
	};

	const value: ModalContextType = handleShow;

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

export const useConfirmModal = (): ModalContextType =>
	useContext(ConfirmContext);

export default ConfirmContextProvider;
