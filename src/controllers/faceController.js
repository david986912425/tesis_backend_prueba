const app = require("../firebase/firebase");
const { subirArchivo , subirImagenReport } = require("../helpers/subir.archivo");
const { uuid } = require('uuidv4');
const moment = require("moment");


let db = app.firestore();
const agregarClient = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.foto) {
      return res.status(400).json({
        success: false,
        msg: "No se encontro foto",
      });
    }

    const pathCompleto = await subirArchivo(
      req.files,
      ["png", "jpg", "jpeg", "gif"],
      "Fotos"
    );
    const urlSinToken = pathCompleto.split('&')[0];
    const fechaActual = moment().format('DD/MM/YYYY HH:mm:ss');
    const payload = {
    id: uuid(),
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    url: urlSinToken,
    created_at : fechaActual,
    active: true,
    };

    const docRef = db.collection("usuarios").doc();
    await docRef.set(payload);

    return res.status(200).json({
        success: true,
        message: 'Se agregó correctamente'
    });

  } catch (error) {
    console.log(new Error(error));
    return res.status(500).json({
      success: false,
      msg: "Error al agregar el cliente",
    });
  }
};
const getClient = async (req, res) => {
  try {
    const querySnapshot = await db.collection("usuarios").get();
    const datos = [];

    querySnapshot.forEach((doc) => {
      datos.push({
        id: doc.data().id,
        name: doc.data().name,
        email: doc.data().email,
        passowrd: doc.data().passowrd,
        url: doc.data().url,
        descriptors: doc.data().descriptors,
        created_at : doc.data().created_at,
        active: doc.data().active,
      });
    });

    return res.status(200).json({
      success: true,
      data : datos
  });
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
const addreport = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.fotoReport) {
      return res.status(400).json({
        success: false,
        msg: "No se encontro foto",
      });
    }
    console.time();
    const pathCompleto = await subirImagenReport(
      req.files,
      ["png", "jpg", "jpeg", "gif"],
      "Reportes"
    );
    console.timeEnd();
    const urlReportSinToken = pathCompleto.split('&')[0];
    const fechaActual = moment().format('DD/MM/YYYY HH:mm:ss')
    const payload = {
      id: uuid(),
      name: req.body.name,
      fotoReport: urlReportSinToken,
      fechaIngreso : fechaActual,
      status: true,
      };
  
      const docRef = db.collection("report").doc();
      await docRef.set(payload);

      return res.status(200).json({
        success: true,
        message: 'Se agregó correctamente'
      });

  } catch (error) {
    console.log(new Error(error));
    return res.status(500).json({
      success: false,
      msg: "Error al agregar el reporte",
    });
  }
}
const getreport = async (req, res) => {
  try {
    const querySnapshot = await db.collection("report").get();
    const datos = [];

    querySnapshot.forEach((doc) => {
      datos.push({
        id: doc.data().id,
        name: doc.data().name,
        fotoReport: doc.data().fotoReport,
        fechaIngreso: doc.data().fechaIngreso,
        status: doc.data().status,
      });
    });

    return res.status(200).json({
      success: true,
      data : datos
  });
  } catch (error) {
    console.log(new Error(error));
    return res.status(500).json({
      success: false,
      msg: "Error para traer los datos de reporte",
    });
  }
}
module.exports = {
    agregarClient, 
    getClient,
    addreport,
    getreport
}