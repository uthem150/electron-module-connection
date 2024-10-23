import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useFlow } from '../stackflow';

const NextActivity = () => {
	const { pop } = useFlow();

	return (
		<AppScreen>
			<div>Next Activity</div>
			<button
				onClick={() => {
					pop();
				}}
			>
				Prev
			</button>
		</AppScreen>
	);
};
export default NextActivity;
