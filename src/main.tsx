import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import ModalContextProvider from './context/ModalContext';
import OfferContextProvider from './context/OfferContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ModalContextProvider>
			<OfferContextProvider>
				<App />
			</OfferContextProvider>
		</ModalContextProvider>
	</React.StrictMode>
);
