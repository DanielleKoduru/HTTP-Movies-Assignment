import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const initialItem = {
    id: 0,
    title: "",
    director: "",
    metascore: "",
    stars: [],
}


function UpdateMovie(props) {
    const { push } = useHistory();
    const [item, setItem] = useState(initialItem);
    const { id } = useParams();

    useEffect(() => {
      axios
        .get(`http://localhost:3333/api/movies/${id}`)
        .then((res) => {
          setItem(res.data);
        })
        .catch((err) => console.log(err));
    }, [id]);
  
    const onChange = (e) => {
      e.persist();
      let value = e.target.value;
      if (e.target.name === "stars") {
        value = parseInt(value, 10);
      }
  
      setItem({
        ...item,
        [e.target.name]: value
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      axios
        .put(`http://localhost:3333/movies/${id}`, item)
        .then((res) => {
          console.log(res);
          props.setItems(res.data);
          push(`/update-movie/${id}`);
        })
        .catch((err) => console.log(err));
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
                        value={item.stars}
                    />

                <button>Submit Update</button>
        </form>
    )
}

export default UpdateMovie;