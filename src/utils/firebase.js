const { Storage } = require('@google-cloud/storage')
const firebaseAdmin = require('firebase-admin')
const config = require('../config')
const firebaseConfig = config.firebase

const init = () => {
  return new Promise((resolve, reject) => {
    if (!firebaseAdmin.apps.length) {
      try {
        firebaseAdmin.initializeApp({
          credential: firebaseAdmin.credential.cert(firebaseConfig.serviceAccount),
          databaseURL: config.firebase.databaseURL
        })
      } catch (e) {
        reject(e)
      }
    }

    resolve(firebaseAdmin)
  })
}

const initFirestore = () => {
  return new Promise((resolve, reject) => {
    init().then((firebaseAdmin) => {
      const firestore = firebaseAdmin.firestore()
      const settings = config.firebase.firestore

      if (!firestore.settings) {
        firestore.settings(settings)
      }

      resolve(firestore)
    }).catch(error => reject(error))
  })
}

const initStorage = () => {
  return new Promise((resolve, reject) => {
    const storage = new Storage({
      projectId: firebaseConfig.serviceAccount.project_id,
      keyFilename: firebaseConfig.serviceAccount.private_key
    })

    const bucket = storage.bucket(firebaseConfig.storage.bucket_url)
    resolve(bucket)
  })
}

const createOrUpdateDocument = (collectionKey, data, document) => {
  return new Promise((resolve, reject) => {
    initFirestore().then((firestore) => {
      firestore.collection(collectionKey).doc(document).set(data).then((res) => {
        const info = {
          response: res,
          collectionKey: collectionKey,
          document: document,
          data: data
        }

        resolve(info)
      }).catch(error => reject(error))
    })
  })
}

const getDocument = (collectionKey, document) => {
  return new Promise((resolve, reject) => {
    initFirestore().then((firestore) => {
      firestore.collection(collectionKey).doc(document).get().then(function (doc) {
        if (doc.exists) {
          const res = {
            status: 200,
            doc: doc.data()
          }

          resolve(res)
        } else {
          const res = {
            status: 404,
            doc: null
          }

          resolve(res)
        }
      }).catch(function (error) {
        const err = {
          status: 500,
          error: error
        }

        reject(err)
      })
    }).catch(error => reject(error))
  })
}

const deleteDocument = (collectionKey, document) => {
  return new Promise((resolve, reject) => {
    initFirestore().then((firestore) => {
      firestore.collection(collectionKey).doc(document).delete().then((res) => {
        const info = {
          response: res,
          collectionKey: collectionKey,
          document: document
        }

        resolve(info)
      }).catch(error => reject(error))
    })
  })
}

const uploadFile = (file) => {
  return new Promise((resolve, reject) => {
    initStorage().then(bucket => {
      if (!file) {
        const errorResponse = {
          status: false,
          message: 'No image file.'
        }

        reject(errorResponse)
      }

      const newFileName = `${file.originalname}_${Date.now()}`
      const fileUpload = bucket.file(newFileName)
      const blobStream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype
        }
      })

      blobStream.on('error', (error) => {
        const errorResponse = {
          status: false,
          error: error,
          message: 'Something is wrong! Unable to upload at the moment.'
        }

        reject(errorResponse)
      })

      blobStream.on('finish', () => {
        // The public URL can be used to directly access the file via HTTP.
        const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`
        resolve(url)
      })

      blobStream.end(file.buffer)
    })
  })
}

module.exports = {
  createOrUpdateDocument,
  getDocument,
  deleteDocument,
  uploadFile
}
