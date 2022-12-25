import { useState, createContext } from 'react';

import { OfferInterface } from '../interface/OfferInterface';

const defaultValue: defaultValueInterface = {
	opened: false,
	edit: false,
	editableItem: {
		id: '',
		title: '',
		text: '',
	},
	toggleModal: () => {},
};

export const ModalContext = createContext(defaultValue);

type toggleModalFunction = (
	isEdit: boolean,
	dataToEdit?: OfferInterface
) => void;

interface defaultValueInterface {
	opened: boolean;
	edit: boolean;
	editableItem: OfferInterface;
	toggleModal: toggleModalFunction;
}

interface ModalContextProviderProps {
	children: React.ReactNode;
}

const ModalContextProvider: React.FC<ModalContextProviderProps> = (props) => {
	const [opened, setOpened] = useState(defaultValue.opened);
	const [edit, setEdit] = useState(defaultValue.edit);
	const [editableItem, setEditableItem] = useState<OfferInterface>(
		defaultValue.editableItem
	);

	const toggleModal: toggleModalFunction = (isEdit, dataToEdit) => {
		setOpened(!opened);
		setEdit(isEdit);

		if (isEdit) {
			setEditableItem((prevState) => {
				return {
					...prevState,
					id: dataToEdit!.id,
					title: dataToEdit!.title,
					text: dataToEdit!.text,
				};
			});
		}
	};

	const providerValue = {
		opened,
		edit,
		editableItem,
		toggleModal,
	};

	return (
		<ModalContext.Provider value={providerValue}>
			{props.children}
		</ModalContext.Provider>
	);
};

export default ModalContextProvider;
