
const app = require("../firebase/firebase");
let storagedb = app.storage();
const { uuid } = require('uuidv4');
const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta) => {
    return new Promise((resolve, reject) => {
        const { foto } = files;
        const nombreCortado = foto.name.split('.');       
        const extension = nombreCortado[nombreCortado.length - 1];
        // Validar la extensión
        if (!extensionesValidas.includes(extension)) {
            reject(`La extensión ${extension} no está permitida. Las extensiones válidas son: ${extensionesValidas.join(', ')}`);
        }
        const storageRef = storagedb.ref(`${carpeta}/${nombreCortado[0]}`);
        const metadata = {
            contentType: foto.mimetype // Establecer el tipo de contenido del archivo
        };

        storageRef.put(foto.data, metadata)
        .then(() => {
            storageRef.getDownloadURL()
                .then((url) => {
                    resolve(url);
                })
                .catch((error) => {
                    reject(error);
                });
        })
        .catch((error) => {
            reject(error);
        });
    });
};

const subirImagenReport = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta) => {
    return new Promise((resolve, reject) => {
        const { fotoReport } = files;
        const nombreCortado = fotoReport.name.split('.');       
        const extension = nombreCortado[nombreCortado.length - 1];
        if (!extensionesValidas.includes(extension)) {
            reject(`La extensión ${extension} no está permitida. Las extensiones válidas son: ${extensionesValidas.join(', ')}`);
        }
        const storageRef = storagedb.ref(`${carpeta}/${uuid()}`);
        const metadata = {
            contentType: fotoReport.mimetype // Establecer el tipo de contenido del archivo
        };

        storageRef.put(fotoReport.data, metadata)
        .then(() => {
            storageRef.getDownloadURL()
                .then((url) => {
                    resolve(url);
                })
                .catch((error) => {
                    reject(error);
                });
        })
        .catch((error) => {
            reject(error);
        });
    });
}

module.exports = {
    subirArchivo,
    subirImagenReport
}
