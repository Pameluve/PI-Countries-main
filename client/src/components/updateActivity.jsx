import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getActivityById, getCountries, putActivity } from "../redux/actions";
import "./styles/createActivity.css";

//---------------------------VALIDATOR-------------------------------
const validation = (input) => {
  let errors = {};

  if (input.name === "") errors.name = "Actividad requerida";

  if (input.difficulty < 1 || input.difficulty > 5) {
    errors.difficulty = "Dificultad válida requerida, número entre 1 y 5";
  }
  if (input.duration === "") errors.duration = "Duración válida requerida";

  if (input.season === "") errors.season = "Temporada requerida";

  return errors;
};

//---------------------------FORM-------------------------------
const UpdateActivity = (props) => {
  const activityId = props.match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();
  const countries = useSelector((state) => state.countries);
  const activity = useSelector((state) => state.activity);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    country: [],
  });

  useEffect(() => {
    dispatch(getActivityById(activityId));
    dispatch(getCountries());
  }, [dispatch, activityId]);

  //---------------------------HANDLERS-------------------------------
  //----------------------FORM SUBMIT HANDLER-------------------------
  const submitHandler = (event) => {
    event.preventDefault();
    setErrors(validation(input));
    if (!input.name || !input.difficulty || !input.duration || !input.season) {
      return alert("Por favor completa todos los campos");
    }
    dispatch(putActivity(activityId, input));
    alert("Actividad turística editada con éxito");
    setInput({
      name: "",
      difficulty: 0,
      duration: "",
      season: "",
      country: [],
    });
    history.push("/activities");
  };

  //----------------------INPUTS HANDLER-------------------------
  const inputHandler = (event) => {
    console.log(input);
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });

    setErrors(
      validation({
        [event.target.name]: event.target.value,
      })
    );
  };

  //-------------------------CHECK HANDLER-------------------------
  const checkHandler = (event) => {
    console.log(event.target.value);
    if (event.target.checked) {
      setInput({
        ...input,
        season: event.target.value,
      });
    }
  };

  //-------------------SELECT COUNTRY HANDLER----------------------
  const selectCountryHandler = (event) => {
    console.log(event.target.value);
    setInput({
      ...input,
      country: [...input.country, event.target.value],
    });
  };

  //---------------------------RENDER-------------------------------
  return (
    <div className="createActivityBackground">
      <Link to="/activities">
        <button id="btn">Volver</button>
      </Link>
      <form
        className="formContainer"
        onSubmit={(event) => submitHandler(event)}
      >
        <h1>Editar actividad turística</h1>
        <div>
          <label>Actividad:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            placeholder={activity.name}
            onChange={(event) => inputHandler(event)}
          />
          {errors.name && <h5>{errors.name}</h5>}
        </div>
        <div>
          <label>Dificultad:</label>
          <input
            type="number"
            value={input.difficulty}
            name="difficulty"
            placeholder={activity.difficulty}
            onChange={(event) => inputHandler(event)}
          />
          {errors.difficulty && <h5>{errors.difficulty}</h5>}
        </div>
        <div>
          <label>Duración:</label>
          <input
            type="text"
            value={input.duration}
            name="duration"
            placeholder={activity.duration}
            onChange={(event) => inputHandler(event)}
          />
          {errors.duration && <h5>{errors.duration}</h5>}
        </div>
        <div>
          <label>Temporada:</label>
          <label id={activity.season === "Autumn" && "labelChecked"}>
            <input
              type="checkbox"
              value="Autumn"
              name="Autumn"
              onChange={(event) => checkHandler(event)}
            />
            Otoño
          </label>
          <label id={activity.season === "Spring" && "labelChecked"}>
            <input
              type="checkbox"
              value="Spring"
              name="Spring"
              onChange={(event) => checkHandler(event)}
            />
            Primavera
          </label>
          <label id={activity.season === "Summer" && "labelChecked"}>
            <input
              type="checkbox"
              value="Summer"
              name="Summer"
              onChange={(event) => checkHandler(event)}
            />
            Verano
          </label>
          <label id={activity.season === "Winter" && "labelChecked"}>
            <input
              type="checkbox"
              value="Winter"
              name="Winter"
              onChange={(event) => checkHandler(event)}
            />
            Invierno
          </label>
          {errors.season && <h5>{errors.season}</h5>}
        </div>
        <div>
          <label>Paises:</label>
          <select onChange={(event) => selectCountryHandler(event)}>
            {countries.map((country) => (
              <option key={country.id} value={country.name} name={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          {activity.countries && (
            <ul>{activity.countries.map((country) => country + ", ")}</ul>
          )}
          <ul>{input.country.map((country) => country + ", ")}</ul>
        </div>
        <button id="submitBtn" type="submit">
          Guardar Actividad
        </button>
      </form>
    </div>
  );
};

export default UpdateActivity;
