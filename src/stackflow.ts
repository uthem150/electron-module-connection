import { stackflow } from '@stackflow/react';
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';
import { basicUIPlugin } from '@stackflow/plugin-basic-ui';
import MainActivity from './activities/Main';
import NextActivity from './activities/Next';

const activities = {
	MainActivity,
	NextActivity,
};

export const { Stack, useFlow } = stackflow({
	transitionDuration: 350,
	activities,
	initialActivity: () => 'MainActivity',
	plugins: [
		basicRendererPlugin(),
		basicUIPlugin({
			theme: 'cupertino',
		}),
	],
});
