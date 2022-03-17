const fetch = require("node-fetch");
const db = require('../_database')
const getimage = require('./downloadimage')


let baseURL = 'https://api.themoviedb.org/3/';
let configData = null
let baseImageURL = null
let APIKEY = `f7a26b1532f7826a0216cbb1d34b95d8`


async function insert_ator_db(actor_info){
    var imdb_id = parseInt(actor_info.imdb_id, 32)
    var name = escape(actor_info.name)
    var birthday = actor_info.birthday
    var deathday = actor_info.deathday
    var biography = escape(actor_info.biography)
    var birthplace = escape(actor_info.place_of_birth)
    var image_path = 'https://image.tmdb.org/t/p/original' + actor_info.profile_path
    
    image_name = imdb_id + '_' + escape(name) + '.png'
    getimage.download(image_path, image_name, function(){
        console.log('done');
      });

    image_path  =  './backend/assets/' + image_name
    
    await db.connect()
    await db.query(`INSERT INTO ator (id_ator, nome, data_nascimento, data_falecimento, local_nascimento, imagePath, biografia) 
                    VALUES (${imdb_id}, '${name}', '${birthday}', '${deathday}', '${birthplace}', '${image_path}', '${biography}' );`)
    await db.end()

}

let getConfig = function(){
    let url = "".concat(baseURL, 'configuration?api_key=', APIKEY);
    //console.log(url)
    fetch(url)
    .then((result)=>{
        return result.json()
    })
    .then((data)=>{
        baseImageURL = data.images.secure_baseurl;
        configData = data.images;
        //console.log(baseImageURL)
        //console.log(configData)
        runSearch(`Emilia Clarke`)
    })
    .catch(function(err){
        console.log(`Deu ruim`)
    })
}

let runSearch = function(nameof){
    let url = "".concat(baseURL, 'search/person/?api_key=', APIKEY, `&query=`, nameof);
    console.log(url)
    fetch(url)
    .then(result=>result.json())
    .then((data)=>{
        //GetData(data.results[0].id)
        GetCredits(data.results[0].id)
    })
}

async function insert_filmography_db(filmography){
    /*await db.connect()
    await db.query(`INSERT INTO ator (id_ator, nome, data_nascimento, data_falecimento, local_nascimento, imagePath, biografia) 
                    VALUES (${imdb_id}, '${name}', '${birthday}', '${deathday}', '${birthplace}', '${image_path}', '${biography}' );`)
    await db.end()*/
}

let GetCredits = function(Keyword){
    let url = "".concat(baseURL, 'person/', Keyword,`/combined_credits?api_key=`, APIKEY, `&language=en-US`);
    console.log(url)
    fetch(url)
    .then(result=>result.json())
    .then((data)=>{
        console.log(data)
        insert_filmography_db(data)
    })
}

let GetData = function(Keyword){
    let url = "".concat(baseURL, 'person/', Keyword,`?api_key=`, APIKEY, `&language=en-US`);
    let data
    console.log(url)
    fetch(url)
    .then(result=>result.json())
    .then((data)=>{
        insert_ator_db(data)
    })
}

runSearch(`Emilia Clarke`)
//getConfig()