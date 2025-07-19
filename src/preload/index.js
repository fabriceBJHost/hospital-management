import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
const { getAll } = require('../../databases/Models/Users')
const { getDoctors } = require('../../databases/Models/Doctors')
const { getWorkingDate } = require('../../databases/Models/WorkingDay')

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)

    contextBridge.exposeInMainWorld('session', {
      setSession: (sessionData) => ipcRenderer.invoke('login', sessionData),
      getSession: () => ipcRenderer.invoke('get-session')
    })

    /**
     * API for frame window
     */
    contextBridge.exposeInMainWorld('navigations', {
      exit: (userData) => ipcRenderer.invoke('exit', userData),
      minimize: (userData) => ipcRenderer.invoke('minimize', userData),
      maximize: (userData) => ipcRenderer.invoke('maximize', userData),
      unmaximize: (userData) => ipcRenderer.invoke('unmaximize', userData)
    })

    /**
     * API for all users
     */
    contextBridge.exposeInMainWorld('users', {
      getUsers: () => getAll(),
      insertNewUser: (request) => ipcRenderer.invoke('register', request),
      deleteUser: (request) => ipcRenderer.invoke('deleteUsers', request),
      getSingleUser: (request) => ipcRenderer.invoke('getSingleUser', request),
      updateUser: (request) => ipcRenderer.invoke('updateUser', request)
    })

    /**
     * API for all doctors
     */
    contextBridge.exposeInMainWorld('doctors', {
      getAllDoctor: () => getDoctors(),
      insertDoctor: (request) => ipcRenderer.invoke('insertDoctor', request),
      getSingleDoctor: (request) => ipcRenderer.invoke('getSingleDoctor', request)
    })

    /**
     * API for all working date
     */
    contextBridge.exposeInMainWorld('workDay', {
      getAllWorkingDate: () => getWorkingDate(),
      insertWorkingDate: (request) => ipcRenderer.invoke('insertWorkingDate', request),
      getSingleWorkingDate: (request) => ipcRenderer.invoke('getSingleWorkingDate', request)
    })
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
