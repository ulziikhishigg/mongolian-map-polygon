import * as React from "react";
import { useState, useCallback } from "react";
import Map from "react-map-gl";
import DrawControl from "./draw-control";

function App() {
	const [features, setFeatures] = useState({});
	const onUpdate = useCallback(e => {
		console.log("e", e);
		setFeatures(currFeatures => {
			console.log("currFeatures", currFeatures);

			const newFeatures = { ...currFeatures };

			console.log("newFeatures", newFeatures);

			for (const f of e.features) {
				newFeatures[f.id] = f;
			}
			return newFeatures;
		});
	}, []);

	const onDelete = useCallback(e => {
		setFeatures(currFeatures => {
			const newFeatures = { ...currFeatures };
			for (const f of e.features) {
				delete newFeatures[f.id];
			}
			return newFeatures;
		});
	}, []);

	const geojsonObject = {
		type: "FeatureCollection",
		features: [
			{
				type: "Feature",
				properties: {
					category: cat,
				},
				geometry: {
					type: "Polygon",
					coordinates: [
						[
							[-67.13734351262877, 45.137451890638886],
							[-66.96466, 44.8097],
							[-68.03252, 44.3252],
							[-69.06, 43.98],
							[-70.11617, 43.68405],
							[-70.64573401557249, 43.090083319667144],
							[-70.75102474636725, 43.08003225358635],
							[-70.79761105007827, 43.21973948828747],
							[-70.98176001655037, 43.36789581966826],
							[-70.94416541205806, 43.46633942318431],
							[-71.08482, 45.3052400000002],
							[-70.6600225491012, 45.46022288673396],
							[-70.30495378282376, 45.914794623389355],
							[-70.00014034695016, 46.69317088478567],
							[-69.23708614772835, 47.44777598732787],
							[-68.90478084987546, 47.184794623394396],
							[-68.23430497910454, 47.35462921812177],
							[-67.79035274928509, 47.066248887716995],
							[-67.79141211614706, 45.702585354182816],
							[-67.13734351262877, 45.137451890638886],
						],
					],
				},
			},
		],
	};

	return (
		<>
			<Map
				initialViewState={{
					longitude: 104,
					latitude: 47,
					zoom: 5,
				}}
				style={{ width: "100vw", height: "100vh" }}
				mapStyle="mapbox://styles/mapbox/streets-v9"
				mapboxAccessToken="pk.eyJ1IjoidWx6aWlraGlzaGlnIiwiYSI6ImNsOHkwdDBoZzAxcmszb281a2gzcTk5bnUifQ.L4UOrLGTmDkslGwxbMMs5A"
			>
				<DrawControl
					position="top-left"
					displayControlsDefault={false}
					controls={{
						polygon: true,
						trash: true,
					}}
					defaultMode="draw_polygon"
					onCreate={onUpdate}
					onUpdate={onUpdate}
					onDelete={onDelete}
				/>
				<GeoJSONLayer
					key={index}
					data={geojsonObject}
					fillPaint={polygonPaint}
				/>
			</Map>
		</>
	);
}

export default App;
