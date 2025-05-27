import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)

    // contextBridge.executeInMainWorld('users', {
    //   // getUser: getUser(),
    //   // postUser: (userData) => ipcRenderer.invoke('post-user', userData)
    // })

    contextBridge.exposeInMainWorld('navigations', {
      exit: (userData) => ipcRenderer.invoke('exit', userData),
      minimize: (userData) => ipcRenderer.invoke('minimize', userData),
      maximize: (userData) => ipcRenderer.invoke('maximize', userData),
      unmaximize: (userData) => ipcRenderer.invoke('unmaximize', userData),
    });
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
