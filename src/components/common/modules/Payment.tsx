import { useEffect, useState } from 'react';

const Payment = () => {
	const [socket, setSocket] = useState<WebSocket | null>(null); // WebSocket 객체를 저장할 상태
	const [isConnected, setIsConnected] = useState(false);

	// WebSocket 연결 설정
	useEffect(() => {
		const webSocket = new WebSocket('ws://localhost:1516/'); // 컴포넌트가 마운트될 때 WebSocket을 생성하고 연결
		setSocket(webSocket);

		// WebSocket 이벤트 핸들러 설정

		// WebSocket 연결이 성공적으로 이루어졌을 때 호출됨
		webSocket.onopen = () => {
			console.log('WebSocket 연결됨');
			setIsConnected(true);
		};

		// WebSocket 연결이 종료되었을 때 호출됨
		webSocket.onclose = () => {
			console.log('WebSocket 연결 종료');
			setIsConnected(false);
		};

		// WebSocket에서 오류가 발생했을 때 호출됨
		webSocket.onerror = (error) => {
			console.error('WebSocket 오류', error);
		};

		// 서버로부터 메시지를 수신했을 때 호출됨
		webSocket.onmessage = (message) => {
			console.log('메시지 수신:', message.data);
			// 응답 처리 (필요에 따라 로직 추가)
		};

		return () => {
			webSocket.close(); // 컴포넌트 언마운트 시 WebSocket 연결 종료
		};
	}, []);

	// 결제 요청 함수
	const sendPaymentRequest = () => {
		// 열려 있는 상태일 때만 요청 전송
		if (socket && socket.readyState === WebSocket.OPEN) {
			const paymentData = {
				KIS_ICApproval: {
					inTranCode: 'NV', // 거래 코드
					inTradeType: 'D1', // 거래 타입
					inInstallment: '00', // 할부 없음
					inTranAmt: '1004', // 거래 금액
					inSignYN: 'Y', // 서명 필요 여부
					inSignFileName: 'C:/KISSign.bmp', // 서명 파일 경로
				},
			};
			const reqSpec = JSON.stringify(paymentData);
			socket.send(reqSpec); // 결제 요청 데이터 전송
			console.log('결제 요청 전송');
		}
	};

	// 결제 취소 함수
	const cancelPayment = () => {
		if (socket && socket.readyState === WebSocket.OPEN) {
			const cancelData = { KIS_Agent_Stop: {} }; // 결제 취소 데이터
			socket.send(JSON.stringify(cancelData)); // 결제 취소 요청 전송
			console.log('결제 취소 요청 전송');
		}
	};

	// WebSocket 연결 종료 함수
	const disconnectSocket = () => {
		if (socket && socket.readyState === WebSocket.OPEN) {
			socket.close(); // WebSocket 연결 종료
			console.log('WebSocket 연결 종료 요청');
		}
	};

	return (
		<div>
			<h2>결제 시스템</h2>

			<button onClick={sendPaymentRequest} disabled={!isConnected}>
				결제 요청
			</button>

			<button onClick={cancelPayment} disabled={!isConnected}>
				결제 취소
			</button>

			<button onClick={disconnectSocket} disabled={!isConnected}>
				연결 종료
			</button>
		</div>
	);
};

export default Payment;
