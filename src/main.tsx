import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { NotificationsProvider } from '@mantine/notifications';

import ModalContextProvider from './context/ModalContext';
import OfferContextProvider from './context/OfferContext';
import ConfirmContextProvider from './context/ConfirmContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<NotificationsProvider>
			<OfferContextProvider>
				<ModalContextProvider>
					<ConfirmContextProvider>
						<App />
					</ConfirmContextProvider>
				</ModalContextProvider>
			</OfferContextProvider>
		</NotificationsProvider>
	</React.StrictMode>
);
