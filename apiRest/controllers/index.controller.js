const { reset } = require('nodemon');
const { Pool } = require('pg');
//const JSON_books= JSON.stringify(books);



const fs = require("fs");
 //   NOMBRE_ARCHIVO = "archivo.txt";
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'admin123',
    database: 'apiRest',
    port: '5432'
});
// metodo de devolucion de data
const getingreso = async (req, res) => {
   const response = await pool.query('SELECT * FROM ingreso ORDER BY id ASC');
    //console.log(response.rows); // mostrar por consola
    //res.send('users');//mostrar por navegador
    res.status(200).json(response.rows);
};

//Metodo de insert a BD
const createorden = async (req, res) => {
    const { area,nombres, apellidos, correo, tipoDocumento, numeroDocumento, fechaNacimiento, sexo, seguroMedico, antecedentesPersonales, diagnostico, numeroMedico, fechaExamen, horaExamen, numerordenexamen, grupoPrueba, nombrePrueba, codigoTest, nombreTest, medicoReferente,numerocedulaMedico, nombresMedico, correoMedico} = req.body;
    
    const response = await pool.query('INSERT INTO ingreso (area,nombres, apellidos, correo, tipoDocumento, numeroDocumento, fechaNacimiento, sexo, seguroMedico, antecedentesPersonales, diagnostico, numeroMedico, fechaExamen, horaExamen, numerordenexamen, grupoPrueba, nombrePrueba, codigoTest, nombreTest, medicoReferente,numerocedulaMedico, nombresMedico, correoMedico) VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11, $12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22, $23)', [area,nombres, apellidos, correo, tipoDocumento, numeroDocumento, fechaNacimiento, sexo, seguroMedico, antecedentesPersonales, diagnostico, numeroMedico, fechaExamen, horaExamen, numerordenexamen, grupoPrueba, nombrePrueba, codigoTest, nombreTest, medicoReferente,numerocedulaMedico, nombresMedico, correoMedico]);
     //  res.send('orden guardada con exito..')
   
     
    
};

const createarchivo =  (req, res)=> {
    const books =[];
    const timestamp = new Date(Date.now());
    const year = timestamp.getFullYear().toString();
    const month = timestamp.getMonth() < 10 ? '0' + timestamp.getMonth().toString() : timestamp.getMonth().toString();
    const day = timestamp.getDate() < 10 ? '0' + timestamp.getDate().toString() : timestamp.getDate().toString();
    const hour = timestamp.getHours() < 10 ? '0' + timestamp.getHours().toString() : timestamp.getHours().toString();
    const minutes = timestamp.getMinutes() < 10 ? '0' + timestamp.getMinutes().toString() : timestamp.getMinutes().toString();
    const seconds = timestamp.getSeconds() < 10 ? '0' + timestamp.getSeconds().toString() : timestamp.getSeconds().toString();
   const mili =timestamp.getMilliseconds() < 10 ? '0' + timestamp.getMilliseconds().toString() : timestamp.getMilliseconds().toString();
 
   const {area,nombres, apellidos, correo, tipoDocumento, numeroDocumento, fechaNacimiento, sexo, seguroMedico, antecedentesPersonales, diagnostico, numeroMedico, fechaExamen, horaExamen, numerordenexamen, grupoPrueba, nombrePrueba, codigoTest, nombreTest, medicoReferente,numerocedulaMedico, nombresMedico, correoMedico}=req.body;
   let newBook = req.body;
  //console.log(newBook)
  
   books.push(newBook);
  
  const data = JSON.parse(JSON.stringify(books));
  //console.log(data);
  //console.log(data[0].area);
   const filename =`${data[0].numerordenexamen}-${year}${month}${day}-${hour}${minutes}-${seconds}-${mili}.txt`
  const dat=`${data[0].area}-${data[0].nombres}-${data[0].apellidos}-${data[0].correo}-${data[0].tipoDocumento}-${data[0].numeroDocumento}-${data[0].fechaNacimiento}-${data[0].sexo}-${data[0].seguroMedico}-${data[0].antecedentesPersonales}-${data[0].diagnostico}-
-${data[0].numeroMedico}-${data[0].fechaExamen}-${data[0].horaExamen}-${data[0].numerordenexamen}-${data[0].grupoPrueba}-${data[0].nombrePrueba}-${data[0].codigoTest}-${data[0].nombreTest}-${data[0].medicoReferente}-${data[0].numerocedulaMedico}-${data[0].nombresMedico}-${data[0].correoMedico}`
 //console.log(dat);
  fs.writeFileSync(`${filename}`,`${dat}`)
 // res.send('archivo generado con exito..');
  if(fs.existsSync(filename)){
    const response = await pool.query('INSERT INTO ingreso (area,nombres, apellidos, correo, tipoDocumento, numeroDocumento, fechaNacimiento, sexo, seguroMedico, antecedentesPersonales, diagnostico, numeroMedico, fechaExamen, horaExamen, numerordenexamen, grupoPrueba, nombrePrueba, codigoTest, nombreTest, medicoReferente,numerocedulaMedico, nombresMedico, correoMedico) VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11, $12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22, $23)', [area,nombres, apellidos, correo, tipoDocumento, numeroDocumento, fechaNacimiento, sexo, seguroMedico, antecedentesPersonales, diagnostico, numeroMedico, fechaExamen, horaExamen, numerordenexamen, grupoPrueba, nombrePrueba, codigoTest, nombreTest, medicoReferente,numerocedulaMedico, nombresMedico, correoMedico]);
   //  res.send('orden guardada con exito..')
  }

  res.send('recibido');

 
  
 };
   

module.exports = {
    
    createorden,
    getingreso,
    createarchivo
};