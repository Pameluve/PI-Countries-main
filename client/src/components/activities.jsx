import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getActivities } from "../redux/actions";
import ActivityCard from "./activityCard";
import "./styles/activities.css";

const Activities = () => {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  return (
    <div className="activitiesBackground">
      <Link to="/home">
        <button className="btn">Home</button>
      </Link>
      <Link to="/createActivity">
        <button className="btn">Crear Actividad Turística</button>
      </Link>
      <h1>Actividades Turísticas:</h1>
      <div className="card-container-home">
        {activities?.map((activity) => {
          // console.log(activity.id)
          return (
            <>
              <ActivityCard
                key={activity.id}
                id={activity.id}
                name={activity.name}
                difficulty={activity.difficulty}
                duration={activity.duration}
                season={activity.season}
                countries={activity.countries}
              />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Activities;
