import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import url from 'url';
import './IpcHandler'; // IpcHandler.ts에서 정의한 IPC 이벤트 리스너가 Electron의 메인 프로세스에서 실행되도록

let mainWindow: BrowserWindow | null; // 여기에서 타입을 명시적으로 지정

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'), // preload.js 로드
			contextIsolation: true,
			nodeIntegration: false,
		},
	});

	// 앱이 실행되는 시점에 __dirname은 빌드된 파일의 위치인 dist/app을 기준으로 설정됨
	// console.log('__dirname:', __dirname); // __dirname: D:\web\react-electron-app\dist\app
	// console.log('Resolved path:', path.join(__dirname, '../build/index.html')); // Resolved path: D:\web\react-electron-app\dist\build\index.html
	// console.log('Resolved path (alternative):', path.join(__dirname, '../../build/index.html')); // Resolved path (alternative): D:\web\react-electron-app\build\index.html

	/*
	 * ELECTRON_START_URL을 직접 제공할경우 해당 URL을 로드합니다.
	 * 만일 URL을 따로 지정하지 않을경우 (프로덕션빌드) React 앱이
	 * 빌드되는 build 폴더의 index.html 파일을 로드합니다.
	 * */
	const startUrl =
		process.env.ELECTRON_START_URL ||
		url.format({
			pathname: path.join(__dirname, '/../../build/index.html'),
			protocol: 'file:',
			slashes: true,
		});
	/*
	 * startUrl에 배정되는 url을 맨 위에서 생성한 BrowserWindow에서 실행시킵니다.
	 * */
	mainWindow.loadURL(startUrl);
	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}
app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});
