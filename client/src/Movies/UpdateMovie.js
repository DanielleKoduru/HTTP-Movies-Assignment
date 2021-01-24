import React, { useState, useEffect } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import axios from "axios";

const initialItem = {
    title: "",
    director: "",
    metascore: 0,
    stars: []
}


export const UpdateMovie = (props) => {
    const [item, setItem] = useState(initialItem);
    const location = useLocation();
    const params = useParams();
    const { push } = useHistory();

    useEffect(() => {

      if(location.state) {
        setItem(location.state);
      } else {
        axios
          .get(`http://localhost:3333/api/movies/${params.id}`)
          .then((res) => {
            setItem(res.data);
          })
          .catch((err) => console.log(err));
        }
    }, [location.state, params.id]);

    const handleSubmit = (e) => {
      e.preventDefault();

      axios
        .put(`http://localhost:3333/api/movies/${params.id}`)
        .then((res) => {
          const newMovie = props.movieList.filter((item) => item.id !== item.params);
          props.setMovieList(newMovie);
          push('/');
        })
        .catch((err) => console.log(err));
    };
  
    const onChange = (e) => {
      let value = e.target.value === 'stars' ? e.target.value.split(',') : e.target.value;
  
      setItem({
        ...item,
        [e.target.name]: value
      });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Update Movie</h1>

                <label>Title</label>
                    <input type="text"
                        id="text"
                        name="name"
                        onChange={onChange}
                        value={item.title}
                    />

                <label>Director</label>
                    <input type="text"
                        id="director"
                        name="director"
                        onChange={onChange}
                        value={item.director}
                    />

                <label>Metascore</label>
                    <input type="text"
                        id="metascore"
                        name="metascore"
                        onChange={onChange}
                        value={item.metascore}
                    />

                <label>Stars</label>
                    <input type="text"
                        id="stars"
                        name="stars"
                        onChange={onChange}
                        value={item.stars.join(',')}
                    />

                <button>Submit Update</button>
        </form>
    )
}