
const MovieList = (props) => {

    const FavouriteComponent = props.favouriteComponent;
    const mov = props.movies;

    console.log(mov);

    return (
        <>
            {mov.map( (movie, index) => (
                <div className="col">
                    <div className="image-container d-flex m-3">
                    <img src={movie.Poster} alt='movie' />
                    <div
                        onClick = {() => props.handleFavouritesClick(movie)}
                        className = "overlay d-flex align-items-center justify-content-center m-3" >
                        <FavouriteComponent />
                    </div>
                </div>
                </div>
                
            ))}
        </>
    )
}

export default MovieList;