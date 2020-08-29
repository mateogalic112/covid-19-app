import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent } from '@material-ui/core'
import InfoBox from './components/InfoBox'
import Table from './components/Table'
import LineGraph from './components/LineGraph'
import Map from './components/Map'
import { sortData, formatTotalStatPrint, formatCurrentStatPrint } from './utils/util'
import './App.css';
import 'leaflet/dist/leaflet.css';


function App() {
	const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState('worldwide');
	const [countryInfo, setCountryInfo] = useState({});
	const [tableData, setTableData] = useState([]);
	const [mapCenter, setMapCenter] = useState({
		lat: 34.80746, lng: -40.4796
	});
	const [mapZoom, setMapZoom] = useState(3);
	const [mapCountries, setMapCountries] = useState([]);
	const [casesType, setCasesType] = useState("cases");

	useEffect(() => {
		fetch("https://disease.sh/v3/covid-19/all")
			.then((response) => response.json())
			.then((data) => {
				setCountryInfo(data);
			})
	}, []);

	useEffect(() => {
		const getCountriesData = async () => {
			await fetch("https://disease.sh/v3/covid-19/countries")
			.then((response) => response.json())
			.then((data) => {
				const countries = data.map((country) => (
					{	
						id: country.countryInfo.id,
						name: country.country,
						value: country.countryInfo.iso3,
					}
				));
				const sortedData = sortData(data);
				setTableData(sortedData);
				setMapCountries(data);
				setCountries(countries);
			})
		}
		getCountriesData();
	}, [countries]);

	const onCountryChange = async (event) => {
		const countryCode = event.target.value;
		setCountry(countryCode);

		const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

		await fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setCountry(countryCode);
				setCountryInfo(data);

				setMapCenter([
					data.countryInfo.lat,
					data.countryInfo.long
				]);
				setMapZoom(4);
			})
	}

	return (
		<div className="app">
			<div className="app__left">
				<div className="app__header">
					<h1 className="app__title">Covid-19 Tracker</h1>
					<FormControl className="app__dropdown">
						<Select variant="outlined" onChange={onCountryChange} value={country}>
							<MenuItem value="worldwide">Worldwide</MenuItem>
							{ countries.map(country => (
								<MenuItem key={country.id} value={country.value}>{country.name}</MenuItem>
							)) }
						</Select>
					</FormControl>
				</div>

				<div className="app__stats">
					<InfoBox active={casesType === "cases"} onClick={e => setCasesType("cases")} title="Cases" cases={formatCurrentStatPrint(countryInfo.todayCases)} total={formatTotalStatPrint(countryInfo.cases)} />
					<InfoBox active={casesType === "recovered"} onClick={e => setCasesType("recovered")} title="Recovered" cases={formatCurrentStatPrint(countryInfo.todayRecovered)} total={formatTotalStatPrint(countryInfo.recovered)} />
					<InfoBox active={casesType === "deaths"} onClick={e => setCasesType("deaths")} title="Deaths" cases={formatCurrentStatPrint(countryInfo.todayDeaths)} total={formatTotalStatPrint(countryInfo.deaths)} />
				</div>
				
				<Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom} />
			</div>

			<Card className="app__right">
				<CardContent>
					<h3>Live Cases by Country</h3>
					<Table countries={tableData} />
						<h3 className="graph__title">Worldwide New <span class="u-capitalize">{casesType}</span></h3>
					<LineGraph casesType={casesType}/>
				</CardContent>
			</Card>
		</div>
	);
}

export default App;
