const omdb = new (require('omdbapi'))('b6232aa2');
const db = require('../_database')
const getimage = require('./downloadimage')
const fetch = require("node-fetch");

let baseURL = 'http://www.omdbapi.com/';
let APIKEY = `b6232aa2`

let runSearch = function(serie_name){
    let url = "".concat(baseURL, '?apikey=', APIKEY, `&t=`, serie_name, '&Season=', 1 );
    console.log(url)
    fetch(url)
    .then(result=>result.json()) 
    .then((data)=>{
        console.log(data)
    })
}

/*omdb.search({
    search: 'her',  // required
    //type: 'series',             // optionnal  ['series', 'episode', 'movie']
    //year: '2011',               // optionnal
    //page: '1'                   // optionnal (1 to 100)
}).then(res => {
    console.log('got response:', res);
}).catch(console.error);*/
 
omdb.get({
    id: '',
    title: 'Community' ,               
    plot: 'full',
                   
    tomatoes: true,            
}).then(res => {
    console.log('got response:', res);
    if(res.type === 'movie'){
        add_movie_database(res)
    }
    if(res.type == 'series'){
        add_serie_database(res)
    }

}).catch(console.error);


async function add_episodes_database(titulo, seasons){

    id_list = []
    len_seasons = parseInt(seasons)
    console.log(len_seasons)
    for(i=1;i<=len_seasons;i++){
        let url = "".concat(baseURL, '?apikey=', APIKEY, `&t=`, titulo, '&Season=', i );
        console.log(url)
        fetch(url)
        .then(result=>result.json()) 
        .then((data)=>{
            //console.log(data.Episodes)
            id_list.push(i)
            for(j=1;j<data.Episodes.length;j++){
                id_list.push(i)
                id_list.push(data.Episodes[j].imdbID)
                //console.log(data.Episodes[j].imdbID)
            }
        })
    }
    console.log('*-', id_list)
    // async await

    //add_episode()
    
}

async function add_episode(){
    //insert
}

async function add_serie_database(serie){
    
    var director = '', writers = '', genre = ''
   
    var serie_id = parseInt(serie.imdbid, 32)
    var serie_title = escape(serie.title)
    var serie_released = escape(serie.released)
    
    for (var i = 0; i < Object.keys(serie.director).length; i++) {
        director += serie.director[i] + ' '
    }
    director = escape(director)

    for (var i = 0; i < Object.keys(serie.writer).length; i++) {
        writers += serie.writer[i] + ' '
    }
    writers = escape(writers)

    var plot = escape(serie.plot)
    
    for (var i = 0; i < Object.keys(serie.genre).length; i++) {
        genre += serie.genre[i] + ' '
    }
    genre = escape(genre)
    
    var rated = escape(serie.rated)
    var awards = escape(serie.awards)
    
    var total_seasons = (serie.totalseasons)
    var imdb_rating = (serie.imdbrating)
    var metascore_rating = (serie.metascore)

    image_name = serie_id + '_' + serie_title + '.png'
    getimage.download(serie.poster, image_name, function(){
        console.log('done');
      });

    image_path  =  './backend/assets/' + image_name
    tempo_exibicao = escape(serie.year)
    
    /*await db.connect()
    await db.query(`INSERT INTO serie (serie_id, nome , data_lancamento ,diretor , escritor, sinopse, genero, faixa_etaria ,premios, num_temporadas, nota_imdb, nota_myreview, nota_metascore, img_capa, duracao) 
                    VALUES ('${serie_id}', '${serie_title}', '${serie_released}', '${director}', '${writers}', '${plot}', '${genre}', '${rated}', '${awards}', '${total_seasons}', '${imdb_rating}', ${0}, '${metascore_rating}', '${image_path}', '${tempo_exibicao}' );`)
    
    await db.end()*/

    add_episodes_database(serie.title, total_seasons)
}

async function add_movie_database(obj_movie){
    
    
    var director = ''
    for (var i = 0; i < Object.keys(obj_movie.director).length; i++) {
        director += obj_movie.director[i] + ' '
    }
    director = escape(director)

    var writers = ''
    for (var i = 0; i < Object.keys(obj_movie.writer).length; i++) {
        writers += obj_movie.writer[i] + ' '
    }
    console.log(writers)
    writers = escape(writers)

    var plot = escape(obj_movie.plot)

    var genre = ''
    for (var i = 0; i < Object.keys(obj_movie.genre).length; i++) {
        genre += obj_movie.genre[i] + ' '
    }
    genre = escape(genre)

    var awards = escape(obj_movie.awards)
    var movie_id = parseInt(obj_movie.imdbid, 32)
    
    
    image_name = movie_id + '_' + escape(obj_movie.title) + '.png'
    getimage.download(obj_movie.poster, image_name, function(){
        console.log('done');
      });

    image_path  =  './backend/assets/' + image_name

    var movie_title = escape(obj_movie.title)
    var tomatometer = obj_movie.tomatometer == null ? '-1' : obj_movie.tomatometer
  
    await db.connect()
    await db.query(`INSERT INTO filme (filme_id, nome, ano, nota_imdb, diretor, roteirista, sinopse, genero, premios, faixa_etaria, tempo_duracao, pais, idioma, nota_myreview, nota_metascore, nota_rotten_tomatoes, img_capa) 
                    VALUES ('${movie_id}', '${movie_title}', '${obj_movie.year}', '${obj_movie.imdbrating}', '${director}', '${writers}', '${plot}', '${genre}', '${awards}', '${obj_movie.rated}', '${obj_movie.runtime}', '${obj_movie.country}',
                    '${obj_movie.language}', ${0}, '${obj_movie.metascore}',   '${tomatometer}', '${image_path}' );`)
    
    await db.end()
}
