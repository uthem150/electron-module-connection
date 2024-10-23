import { app, ipcMain } from 'electron';
import path from 'path';
import fs from 'fs';

// ipcMain 이벤트 리스너를 정의하여 데이터를 JSON 파일로 data.json 파일에 저장

ipcMain.on('save-data', (event, data) => {
	// 로컬 환경에서 앱 전용 데이터 저장 경로
	const jsonPath = path.join(app.getPath('userData'), 'data.json');

	fs.writeFile(jsonPath, JSON.stringify(data, null, 2), (err: any) => {
		if (err) {
			event.reply('save-data-reply', { success: false, error: err });
			return;
		} else {
			event.reply('save-data-reply', { success: true });
			console.log(jsonPath, 'Data saved');
		}
	});
});
