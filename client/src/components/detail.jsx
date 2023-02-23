import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanPage, getDetailbyId } from "../redux/actions";
import CountryActivityCard from "./countryActivityCard";
import "./styles/home.css";
import "./styles/detail.css";
import loading from "../components/media/Spinner.gif";

const Detail = (props) => {
  console.log(props);
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);
  const countryId = props.match.params.id;

  useEffect(() => {
    dispatch(getDetailbyId(countryId));
    return () => {
      dispatch(cleanPage());
    };
  }, [dispatch]);

  return (
    <div className="detailBackground">
      <div className="flagContainer">
        {!detail.flag ? (
          <div className="loading">
            <img src={loading} alt="cargando" />
          </div>
        ) : (
          <img
            className="flag"
            src={detail.flag}
            alt={"img not found"}
            width="400px"
          />
        )}
      </div>
      <div className="infoContainer">
        <h1>{detail.name}</h1>
        <h4>Continente: {detail.continent}</h4>
        <h4>Código del Pais: {detail.id}</h4>
        <h4>Capital: {detail.capital}</h4>
        <h4>Subregion: {detail.subregion}</h4>
        <h4>Área: {detail.area}km2</h4>
        <h4>Población: {detail.population}</h4>
        <h4>Actividades Turísticas:</h4>
        <div className="card-container-home">
          {detail.activities && !detail.activities.length ? (
            <h5>Sin actividades</h5>
          ) : (
            detail.activities?.map((activity) => {
              return (
                <>
                  <CountryActivityCard
                    id={activity.id}
                    name={activity.name}
                    difficulty={activity.difficulty}
                    duration={activity.duration}
                    season={activity.season}
                  />
                </>
              );
            })
          )}
        </div>
      </div>
      <Link to="/home">
        <button id="detailBtn">Home</button>
      </Link>
    </div>
  );
};

export default Detail;
