import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import './lang/locale';
import '@stackflow/plugin-basic-ui/index.css';
import { Stack } from './stackflow';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<Stack />
	</React.StrictMode>,
);
