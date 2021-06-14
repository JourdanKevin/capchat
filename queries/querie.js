const Pool = require('pg').Pool
const jwt = require('jsonwebtoken');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'capchat',
  password: '********',
  port: 5432,
})
const getAllImages = (request, response) => {  
    pool.query("SELECT image.id, image.nom, image.url, image.indice, type_image.type FROM image JOIN type_image ON image.type_id = type_image.id", (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(results.rows)
    })
  }


const getUser = (request, response) => {  
    values = []
    Object.keys(request.query).forEach(element => {
      values.push(request.query[element])
    });
    pool.query('SELECT id, nom, prenom, pseudo FROM "user" where pseudo = $1 and mdp = $2', values, (error, results) => {
      if (error) {
        throw error
      }
      obj = results.rows;
      console.log(results.rows);
    //   console.log(jwt.sign(
    //     { userId: obj.id },
    //     'SECRET',
    //     { expiresIn: '24h' }
    // ))
    
      response.status(200).json({
        token : jwt.sign(
        { userId: obj.id },
        'SECRET',
        { expiresIn: '24h' }
    )});
    // response.redirect('http://localhost:3000//');
    
    })
  }

  
const getImages = (request, response) => {  
  const type = request.params.type;
  pool.query("SELECT image.id, image.nom, image.url, image.indice, type_image.type FROM image JOIN type_image ON image.type_id = type_image.id where type = $1", [type], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(results.rows)
  })
}

const postUser = (request, response) => {  
  values = []
  Object.keys(request.query).forEach(element => {
    values.push(request.query[element])
  });
  values.push(false)
  pool.query('INSERT INTO "user" (nom,prenom,pseudo,mail,mdp,admin) VALUES ($1,$2,$3,$4,$5,$6);' , values, (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log("ok")
    }
  })
}

  module.exports = {
    getAllImages,  
    getImages,
    postUser,
    getUser
  }