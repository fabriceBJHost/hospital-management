import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
const Store = require('electron-store').default
const {
  login,
  register,
  deleteUsers,
  getSingleUser,
  updateUsers
} = require('../../databases/Models/Users')
const { insertDoctor, getSingleDoctor } = require('../../databases/Models/Doctors')
const { getSingleWorkingDate, insertWorkingDays } = require('../../databases/Models/WorkingDay')

/**
 * Initialize electron-store
 */
const store = new Store() // ✅ only works if Store is a function
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    minHeight: 670,
    minWidth: 900,
    show: false,
    frame: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true,
      contextIsolation: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.maximize()
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Exemple : ajout d'un utilisateur
// ipcMain.handle('post-user', async (event, userData) => {
//   // Insérer userData dans SQLite par exemple
//   // Exemple (à adapter) :
//   const result = await db.insertUser(userData);
//   return { success: true, userId: result.lastID };
// });

/**
 * function to exit app
 */
ipcMain.handle('exit', async (event, userData) => {
  if (userData) {
    app.quit()
  }
})

/**
 * function to minimize app
 */
ipcMain.handle('minimize', async (event, userData) => {
  if (userData) {
    mainWindow.minimize()
  }
})

/**
 * function to maximize app
 */
ipcMain.handle('maximize', async (event, userData) => {
  if (userData) {
    mainWindow.maximize()
  }
})

/**
 * function to unmaximize
 */
ipcMain.handle('unmaximize', async (event, userData) => {
  if (userData) {
    mainWindow.unmaximize()
  }
})

/**
 * Session management using electron-store
 * This allows us to store session data like user information, tokens, etc.
 */
ipcMain.handle('login', async (event, sessionData) => {
  const { username, password } = sessionData
  const result = await login(username, password)

  if (result && !result.errorPassword && !result.errorUsername) {
    // Success: store session
    const sessionData = {
      user: {
        id: result.id,
        username: result.username,
        role: result.role, // assuming user has role
        images: result.images || null // assuming user has images
      },
      token: result.id + '-' + Date.now() // fake example token
    }
    return { success: true, session: sessionData }
  } else {
    // return the error object to renderer
    return { success: false, ...result }
  }
})

/**
 * Get session data
 * This can be used to retrieve session information anywhere in the app.
 */
ipcMain.handle('get-session', () => {
  return store.get('session')
})

/**
 * Clear session data
 * This can be used to clear session information, for example on logout.
 */
ipcMain.handle('clear-session', () => {
  store.delete('session')
})

/**
 * function to register new user
 */
ipcMain.handle('register', async (event, request) => {
  const { username, password, role, image } = request

  const response = await register(username, password, role, image)

  return response
})

/**
 * function to delete user
 */
ipcMain.handle('deleteUsers', async (event, request) => {
  const { id } = request

  const response = await deleteUsers(id)

  return response
})

/**
 * function to get single users
 */
ipcMain.handle('getSingleUser', async (event, request) => {
  const { id } = request

  const response = await getSingleUser(id)

  return response
})

/**
 * function to update users
 */
ipcMain.handle('updateUser', async (event, request) => {
  const { username, password, role, image, id } = request

  const response = await updateUsers(username, password, role, image, id)

  return response
})

/**
 * function to insert doctor
 */
ipcMain.handle('insertDoctor', async (event, request) => {
  const { first_name, last_name, images, password, specialization, phone, email } = request

  const response = await insertDoctor(
    first_name,
    last_name,
    images,
    password,
    specialization,
    phone,
    email
  )

  return response
})

/**
 * function to get single doctor
 */
ipcMain.handle('getSingleDoctor', async (event, request) => {
  const { id } = request

  const response = await getSingleDoctor(id)

  return response
})

/**
 * insert working date function
 */
ipcMain.handle('insertWorkingDate', async (event, request) => {
  const { working_date, doctor_id } = request

  const response = await insertWorkingDays(working_date, doctor_id)

  return response
})

/**
 * function to get single working date
 */
ipcMain.handle('getSingleWorkingDate', async (event, request) => {
  const { id } = request

  const response = await getSingleWorkingDate(id)

  return response
})
