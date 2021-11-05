const { reset } = require('nodemon');
const { Pool } = require('pg');
//const JSON_books= JSON.stringify(books);



const fs = require("fs");
const { resolve } = require('path');
const { rejects } = require('assert');
const e = require('express');
//   NOMBRE_ARCHIVO = "archivo.txt";
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'admin123',
    database: 'apiRest',
    port: '5432'
});
// metodo de devolucion de data



//fecha actual

const timestamp = new Date(Date.now());
const year = timestamp.getFullYear().toString();
const month = timestamp.getMonth() < 10 ? '0' + timestamp.getMonth().toString() : timestamp.getMonth().toString();
const day = timestamp.getDate() < 10 ? '0' + timestamp.getDate().toString() : timestamp.getDate().toString();
const hour = timestamp.getHours() < 10 ? '0' + timestamp.getHours().toString() : timestamp.getHours().toString();
const minutes = timestamp.getMinutes() < 10 ? '0' + timestamp.getMinutes().toString() : timestamp.getMinutes().toString();
const seconds = timestamp.getSeconds() < 10 ? '0' + timestamp.getSeconds().toString() : timestamp.getSeconds().toString();
const mili = timestamp.getMilliseconds() < 10 ? '0' + timestamp.getMilliseconds().toString() : timestamp.getMilliseconds().toString();


const getingresoById = async (req, res) => {

    
      const numerordenexamen= parseInt(req.params.numerordenexamen);

    
    const response = await pool.query('SELECT * FROM ingreso WHERE numerordenexamen = $1', [numerordenexamen]);
    const data = JSON.parse(JSON.stringify(response.rows));
 
    //console.log(data[0].tipoDocumento)
 
    const dat1 = `${data[0].area}|${data[0].nombres}|${data[0].apellidos}|${data[0].correo}|${data[0].tipodocumento}|${data[0].numerodocumento}|${data[0].fechanacimiento}|${data[0].sexo}|${data[0].seguromedico}|${data[0].antecedentespersonales}|${data[0].diagnostico}|
|${data[0].numeromedico}|${data[0].fechaexamen}|${data[0].horaexamen}|${data[0].numerordenexamen}|${data[0].grupoprueba}|${data[0].nombreprueba}|${data[0].codigotest}|${data[0].nombretest}|${data[0].medicoreferente}|${data[0].numerocedulamedico}|${data[0].nombresmedico}|${data[0].correomedico}`
    
    const filename = `${data[0].numerordenexamen}-${year}${month}${day}-${hour}${minutes}-${seconds}-${mili}.txt`
    fs.writeFileSync( `${filename}`,`${dat1}`)
    res.send('archivo reenviado  con exito..');
  
 
   
};


const getingreso = async (req, res) => {
    const response = await pool.query('select c.name,c.lastname,c.secondlastname,c.birthday,c.identifier,c.fecha,c.code,c.sex,c.observation,e.productoid,e.productoname from cabecera c inner join cuerpo e on c.code= e.codigo_code');
    res.status(200).json(response);
};

//Metodo de insert a BD
const addOrden = async (req,res) => {
 
        
        const { area, nombres, apellidos, correo, tipoDocumento, numeroDocumento, fechaNacimiento, sexo, seguroMedico, antecedentesPersonales, diagnostico, numeroMedico, fechaExamen, horaExamen, numerordenexamen, grupoPrueba, nombrePrueba, codigoTest, nombreTest, medicoReferente, numerocedulaMedico, nombresMedico, correoMedico } = req.body;

        const response = await pool.query('INSERT INTO ingreso (area,nombres, apellidos, correo, tipoDocumento, numeroDocumento, fechaNacimiento, sexo, seguroMedico, antecedentesPersonales, diagnostico, numeroMedico, fechaExamen, horaExamen, numerordenexamen, grupoPrueba, nombrePrueba, codigoTest, nombreTest, medicoReferente,numerocedulaMedico, nombresMedico, correoMedico) VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11, $12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22, $23)', [area, nombres, apellidos, correo, tipoDocumento, numeroDocumento, fechaNacimiento, sexo, seguroMedico, antecedentesPersonales, diagnostico, numeroMedico, fechaExamen, horaExamen, numerordenexamen, grupoPrueba, nombrePrueba, codigoTest, nombreTest, medicoReferente, numerocedulaMedico, nombresMedico, correoMedico]);
      
    
       
        
       const ingreso= new Promise  (async()=>{
        try{
            const numerordenexamen= parseInt(req.body.numerordenexamen);
          
            const response = await  pool.query('SELECT * FROM ingreso WHERE numerordenexamen = $1', [numerordenexamen]);
              
                   data = JSON.parse(JSON.stringify(response.rows))
                   const filename = `${data[0].numerordenexamen}-${year}${month}${day}-${hour}${minutes}-${seconds}-${mili}.txt`
                   const dat2 = `${data[0].area}|${data[0].nombres}|${data[0].apellidos}|${data[0].correo}|${data[0].tipodocumento}|${data[0].numerodocumento}|${data[0].fechanacimiento}|${data[0].sexo}|${data[0].seguromedico}|${data[0].antecedentespersonales}|${data[0].diagnostico}|
                   |${data[0].numeromedico}|${data[0].fechaexamen}|${data[0].horaexamen}|${data[0].numerordenexamen}|${data[0].grupoprueba}|${data[0].nombreprueba}|${data[0].codigotest}|${data[0].nombretest}|${data[0].medicoreferente}|${data[0].numerocedulamedico}|${data[0].nombresmedico}|${data[0].correomedico}`
       
                   
   
               if(data[0].estado==='ingresado'){ 
            
               
                   fs.writeFileSync(`C:\Users\-${filename}`,`${dat2}`)

                   res.send('Se ha  creado con el exito la orden:' +req.body.numerordenexamen)
                   
               if(fs.existsSync(filename)){
                   
                   const numerordenexamen= parseInt(req.body.numerordenexamen);
                   console.log(numerordenexamen)
                const response = await  pool.query(`UPDATE  ingreso SET estado =${estado} WHERE numerordenexamen = $1`, [numerordenexamen]);
               }
            }
        }catch(err){

        }
       

    
           
    });
   
      
};

const createFile = async (req, res) => {
    const books = [];
   

    const { area, nombres, apellidos, correo, tipoDocumento, numeroDocumento, fechaNacimiento, sexo, seguroMedico, antecedentesPersonales, diagnostico, numeroMedico, fechaExamen, horaExamen, numerordenexamen, grupoPrueba, nombrePrueba, codigoTest, nombreTest, medicoReferente, numerocedulaMedico, nombresMedico, correoMedico } = req.body;
    const response = await pool.query('INSERT INTO ingreso (area,nombres, apellidos, correo, tipoDocumento, numeroDocumento, fechaNacimiento, sexo, seguroMedico, antecedentesPersonales, diagnostico, numeroMedico, fechaExamen, horaExamen, numerordenexamen, grupoPrueba, nombrePrueba, codigoTest, nombreTest, medicoReferente,numerocedulaMedico, nombresMedico, correoMedico) VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11, $12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22, $23)', [area, nombres, apellidos, correo, tipoDocumento, numeroDocumento, fechaNacimiento, sexo, seguroMedico, antecedentesPersonales, diagnostico, numeroMedico, fechaExamen, horaExamen, numerordenexamen, grupoPrueba, nombrePrueba, codigoTest, nombreTest, medicoReferente, numerocedulaMedico, nombresMedico, correoMedico]);

   
    let newBook = req.body;
    

    books.push(newBook);
    
    const data = JSON.parse(JSON.stringify(books));
    console.log(data)
    const filename = `${data[0].numerordenexamen}-${year}${month}${day}-${hour}${minutes}-${seconds}-${mili}.txt`
    const dat = `${data[0].area}|${data[0].nombres}|${data[0].apellidos}|${data[0].correo}|${data[0].tipoDocumento}|${data[0].numeroDocumento}|${data[0].fechaNacimiento}|${data[0].sexo}|${data[0].seguroMedico}|${data[0].antecedentesPersonales}|${data[0].diagnostico}|
|${data[0].numeroMedico}|${data[0].fechaExamen}|${data[0].horaExamen}|${data[0].numerordenexamen}|${data[0].grupoPrueba}|${data[0].nombrePrueba}|${data[0].codigoTest}|${data[0].nombreTest}|${data[0].medicoReferente}|${data[0].numerocedulaMedico}|${data[0].nombresMedico}|${data[0].correoMedico}`
  
    fs.writeFileSync(`${filename}`, `${dat}`)
    

    res.send('orden guardada con exito..');



};



const readFile = async (req, res)=> {
    
    
};
const getingreso2 = async (req, res) => {
    const response = await pool.query('SELECT * FROM ingreso ORDER BY id ASC');
    res.status(200).json(response.rows);
};

const createorden = async (req, res) => {

    const {  CODE,DATE,IDENTIFIER,NAME,LASTNAME,SECONDLASTNAME,BIRTHDAY,SEX,OBSERVATION} = req.body.Header;
   
    const response = await pool.query('INSERT INTO cabecera (name,lastname,secondlastname,birthday,identifier,fecha,code,sex,observation,createtime) VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING code', [ NAME,LASTNAME,SECONDLASTNAME,BIRTHDAY,IDENTIFIER,DATE,CODE,SEX,OBSERVATION,timestamp]);

    const { code } = response.rows[0];
    req.body.Lines.forEach(async(item)=>{  
       
        const response = await pool.query('INSERT INTO cuerpo (codigo_code,productoid,productoname) VALUES ($1, $2,$3) ', [code,item.PRODUCTOID,item.PRODUCTONAME]);
       //${item.PRODUCTOID}|${item.PRODUCTONAME}

       console.log(item.PRODUCTOID)
  
    
    
        try {
            if    (CODE===code){
                //const lines= req.boby.Lines.map(e=>e.PRODUCTOID, e.PRODUCTONAME)
                //console.log(lines)
                const filename = `${code}-${year}${month}${day}-${hour}${minutes}-${seconds}-${mili}.txt`
                const DATA = `MSH|^~\&|${CODE}|${DATE}|${IDENTIFIER}|
PID|1|${NAME} ${LASTNAME} ${SECONDLASTNAME}|
PV1||O||R^RUTINA|||||||${BIRTHDAY}|${SEX}|
ORC|NW|2110293974||||||||${OBSERVATION}|
OBR|1|||${item.PRODUCTOID}|${item.PRODUCTONAME}`
           
            fs.writeFileSync(`${filename}`,`${DATA}`)
             if(fs.existsSync(filename)){                  
             let   estado='creado';
             const response = await  pool.query(`UPDATE  cabecera SET estado =$1, modifytime=$2 WHERE code = $3`, [estado,timestamp,code]);
             res.send('Se ha  creado con el exito la orden:')
            }
        }
        } catch (error) {
            
        }
    })
                 
                   
              
           
       

       

    // res.json({
    //     message: "Usuario creado satisfactoriamente",
    //     user: { code},
    //   });
    
};
module.exports = {
    addOrden,
    getingreso,
    getingresoById,
    createFile,
    readFile,
    getingreso2,
    createorden
};