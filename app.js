let pagina = 1;

const btnAtnerior =  document.getElementById('btnAtnerior');
const btnSiguiente =  document.getElementById('btnSiguiente'); 

btnSiguiente.addEventListener('click',()=>{

    if(pagina < 1000){
        pagina += 1;
        loadMovies();
    }
    
});

btnAnterior.addEventListener('click',()=>{

    if(pagina > 1 ){
        pagina -= 1;
        loadMovies();
    }
    
});




 const loadMovies = async() => {

    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=686eda7f3eda083817b0cb59d4067130&language=es-MX&page=${pagina}`);
        

        if(response.status === 200){

            const data = await response.json();

            let movies = '';
            data.results.forEach(movie => {
                movies += `
                <div class='pelicula'>
                    <img class='poster' src='https://image.tmdb.org/t/p/w500/${movie.poster_path}'>
                </div>
                <h3 class='titulo'>${movie.title}</h3>`;
                   
            });

            document.getElementById('contenedor').innerHTML = movies;
        

        }else if(response.status === 401){
            console.log('cant find the key')
        }else if(response.status === 404){
            console.log('that movie dont exist')
        }else{
            console.log('unexpected error')
        }
        
    }catch(error){
        console.log(error);
    }
    
    
   
}

loadMovies();