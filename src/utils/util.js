import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

export const casesTypeColors = {
  cases: {
    hex: "#cc1034",
    borderColor: 'red',
    backgroundColor: 'rgba(224, 61, 61, .1)',
    multiplier: 800,
  },
  recovered: {
    hex: "#acff1c",
    borderColor: 'green',
    backgroundColor: 'rgba(2, 177, 2, 0.1)',
    multiplier: 1200,
  },
  deaths: {
    hex: "#212121",
    borderColor: 'black',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    multiplier: 1500,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];

  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="popup">
          <div className="popup__flag">
            <img src={country.countryInfo.flag} alt="flag" />
          </div>
          <div className="popup__country">{country.country}</div>
          <div className="popup__cases">
            Cases: <span>{numeral(country.cases).format("0,0")}</span>
          </div>
          <div className="popup__recovered">
            Recovered: <span>{numeral(country.recovered).format("0,0")}</span>
          </div>
          <div className="popup__deaths">
            Deaths: <span>{numeral(country.deaths).format("0,0")}</span>
          </div>
        </div>
      </Popup>
    </Circle>
  ));

export const formatTotalStatPrint = (stat) =>
  stat ? `${numeral(stat).format("0.0a")}` : "+0";

export const formatCurrentStatPrint = (stat) =>
  stat ? `${numeral(stat).format("0,0")}` : "+0";
