import axios from "axios";
import { useEffect, useState } from "react";

const Weather = () => {
  const [city, setCity] = useState({});
  const [location, setLocation] = useState("");

  const [Error, setError] = useState(false);

  const ULR = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=17644cab73cee7ef85798b716c900d8c`;

  const SearchLocation = async (event) => {
    if (event.key === "Enter") {
      await axios
        .get(ULR)
        .then((data) => {
          setCity(data.data);
          console.log(data.data);
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setError(true);
          }
        });
    }
  };

  useEffect(() => {
    SearchLocation({ key: "Enter" });
  }, []);

  return (
    <div className="container">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter Location"
          onKeyPress={SearchLocation}
          type="text"
        />
      </div>
      {!Error ? (
        <>
          <div className="top">
            <div className="location">
              <p>{city.name}</p>
            </div>
            <div className="temp">
              {city.main ? <h1>{city.main.temp}°F</h1> : null}
            </div>
            <div className="description">
              {city.weather ? <p>{city.weather[0].main}</p> : null}
            </div>
          </div>

          <div className="bottom">
            <div className="feels">
              {city.main ? (
                <p className="bold">{city.main.feels_like} °F</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {city.main ? <p className="bold">{city.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {city.wind ? <p className="bold">{city.wind.speed} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        </>
      ) : (
        <p className="error">404 ERROR</p>
      )}
    </div>
  );
};

export default Weather;
