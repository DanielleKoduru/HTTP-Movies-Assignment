import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export const AddMovie = (props) => {
    const newMovie = {
        title: "",
        director: "",
        metascore: "",
        stars: [],
    }

    const [movie, setMovie] = useState(newMovie);
    const { push } = useHistory();

    const onInputChange = (e) => {
        let value = e.target === 'stars' ? e.target.value.split(',') : e.target.value;

        setMovie({
            ...movie,
            [e.target.name]: value
        });

        const onSubmit = (e) => {
            e.preventDefault();

            axios
                .post(`http://localhost:5000/api/movies`, movie)
                .then((res) => {
                    props.setMovieList(res.data);
                    push('/');
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        return (
            <form onSubmit={onSubmit}>
                <label>
                    Title:
                  <input
                        type="text"
                        id="title"
                        name="title"
                        value={movie.title}
                        onChange={onInputChange}
                    />
                </label>

                <label>
                    Director:
                  <input
                        type="text"
                        id="director"
                        name="director"
                        value={movie.director}
                        onChange={onInputChange}
                    />
                </label>

                <label>
                    Metascore:
                  <input
                        type="text"
                        id="metascore"
                        name="metascore"
                        value={movie.metascore}
                        onChange={onInputChange}
                    />
                </label>

                <label>
                    Stars:
                    <input
                        id='stars'
                        name='stars'
                        type='text'
                        value={movie.stars.join(',')}
                        onChange={onInputChange}
                    />
                </label>
                <button>Add Movie</button>
            </form>
        )
    };
}