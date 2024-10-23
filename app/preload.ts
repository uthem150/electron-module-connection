import { contextBridge, ipcRenderer } from 'electron';

// 웹 애플리케이션의 window 객체에 특정 기능 노출
contextBridge.exposeInMainWorld('versions', {
	node: process.versions.node,
	electron: process.versions.electron,
	chrome: process.versions.chrome,
});

// 프론트엔드에서 window.fs.saveData(data)를 호출하면
// ipcRenderer를 통해 'save-data' 채널로 데이터를 메인 프로세스에 보냄
contextBridge.exposeInMainWorld('fs', {
	saveData: (data: string) => ipcRenderer.send('save-data', data),
});

contextBridge.exposeInMainWorld('electron', {
	send: (channel: string, data: any) => ipcRenderer.send(channel, data),
	receive: (channel: string, func: (...args: any[]) => void) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
});
