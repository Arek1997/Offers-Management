import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import ModalContextProvider from './context/ModalContext';
import OfferContextProvider from './context/OfferContext';
import ConfirmContextProvider from './context/ConfirmContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ModalContextProvider>
			<OfferContextProvider>
				<ConfirmContextProvider>
					<App />
				</ConfirmContextProvider>
			</OfferContextProvider>
		</ModalContextProvider>
	</React.StrictMode>
);
