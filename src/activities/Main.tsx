import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useFlow } from '../stackflow';
import { useCallback } from 'react';
import Payment from '../components/common/modules/Payment';

const MainActivity = () => {
	const { push } = useFlow();

	const onClickSave = useCallback(() => {
		// fs가 정의되어 있을 경우에만 saveData를 참조
		if (typeof (window as any).fs?.saveData === 'function') {
			(window as any).fs.saveData('Hello, World!'); // saveData가 함수일 경우 호출하여 'Hello, World!'라는 문자열 저장
		} else {
			console.error('fs.saveData is not available');
		}
	}, []);

	return (
		<AppScreen>
			<div>Main Activity</div>
			<button
				onClick={() => {
					push('NextActivity', {});
				}}
			>
				Next
			</button>

			<button onClick={onClickSave}>저장</button>

			<h1>웹소켓 연결</h1>
			<Payment />
		</AppScreen>
	);
};

export default MainActivity;
