import * as React from "react";
import { createRoot } from "react-dom/client";
import { useState } from "react";
import MapGL from "react-map-gl";
import "./App.css";

import { Editor, EditingMode, DrawPolygonMode } from "react-map-gl-draw";
import "mapbox-gl/dist/mapbox-gl.css";

function App() {
	const DEFAULT_VIEWPORT = {
		width: 800,
		height: 600,
		longitude: 104,
		latitude: 47,
		zoom: 5,
	};

	const initialFeatures = [
		{
			type: "Feature",
			properties: {},
			geometry: {
				type: "Polygon",
				coordinates: [
					[
						[87.55346679687653, 48.948733842647755],
						[89.72875976562534, 49.72188759259652],
						[90.67358398437625, 50.42696418181367],
						[92.8049316406267, 50.81728560615704],
						[94.16723632812545, 50.454951764799745],
						[95.19995117187688, 49.89205189405507],
						[95.77124023437653, 49.236503420834396],
						[95.44165039062551, 48.8620775642876],
						[95.00219726562665, 48.702817316533356],
						[94.47485351562545, 48.74630205071722],
						[94.01342773437551, 48.76078860728174],
						[93.5959472656258, 48.6738066039068],
						[93.33227539062614, 48.35358514210694],
						[93.53002969041808, 47.72184774387128],
						[94.38696328416842, 46.72205222523846],
						[93.46411172166859, 45.91779849960639],
						[93.17846719041785, 45.25660014539761],
						[93.17846719041785, 44.993047659701546],
						[92.54125901766548, 44.946411787837064],
						[91.15934920128558, 45.024116710540085],
						[90.58806013878592, 45.24113044267705],
						[90.78581404503615, 46.25307455762541],
						[90.85173211922051, 47.06739101198664],
						[90.0167711817212, 47.51449287512642],
						[89.77507196297069, 47.85471267594417],
						[88.47868524422142, 48.104753968160736],
						[88.10515008797017, 48.52850193547505],
						[87.95134149422017, 48.760788263259315],
						[87.55346679687653, 48.948733842647755],
					],
				],
			},
		},
		{
			type: "Feature",
			properties: {},
			geometry: {
				type: "Polygon",
				coordinates: [
					[
						[108.52636718750085, 49.32250914004584],
						[108.61425781250136, 48.688314049387],
						[108.89990234375205, 48.32437371629416],
						[108.32861328125063, 47.8399669947608],
						[108.48242187500063, 47.20191883121507],
						[109.27343750000153, 46.38964620707105],
						[109.47119140625176, 46.131392008787344],
						[110.15234400004033, 46.17705464058102],
						[110.61376978129027, 46.009439624302416],
						[111.38281275004022, 46.10092914860331],
						[111.75634790629141, 45.16372067449146],
						[112.72314478129152, 44.71266495716003],
						[114.10742212504135, 44.634538616432934],
						[115.31591821879192, 45.19469735702509],
						[116.48046900004044, 46.009439624302416],
						[118.15862231995158, 46.631597968370386],
						[119.69670825745311, 46.64668419620699],
						[120.11418872620283, 46.76722260494688],
						[119.38909106995317, 47.54416562718538],
						[118.77385669495328, 47.94310115097659],
						[117.6312785699522, 48.13409130361879],
						[117.10393481995277, 47.83996696209522],
						[116.4667277887018, 47.94310115097659],
						[115.7416301324522, 47.869454832547405],
						[115.7416301324522, 48.207360566138334],
						[116.70842700745226, 49.90620522529855],
						[111.58879810120283, 49.451236548744475],
						[110.31438403870277, 49.2508480918261],
						[108.52636718750085, 49.32250914004584],
					],
				],
			},
		},
	];

	const [features, setFeatures] = useState({});

	const [state, setState] = useState({
		viewport: DEFAULT_VIEWPORT,
		modeId: null,
		modeHandler: null,
		features: initialFeatures,
	});

	const _updateViewport = viewport => {
		setState({ ...state, viewport });
	};

	const MODES = [
		// { id: "drawPolyline", text: "Draw Polyline", handler: DrawLineStringMode },
		{ id: "drawPolygon", text: "Draw Polygon", handler: DrawPolygonMode },
		{ id: "editing", text: "Edit Feature", handler: EditingMode },
	];
	const _switchMode = evt => {
		const modeId = evt.target.value === state.modeId ? null : evt.target.value;
		const mode = MODES.find(m => m.id === modeId);
		const modeHandler = mode ? new mode.handler() : null;
		setState({ ...state, modeId, modeHandler });
	};
	const _renderToolbar = () => {
		return (
			<div
				style={{ position: "absolute", top: 0, right: 0, maxWidth: "320px" }}
			>
				<select onChange={_switchMode}>
					<option value="">--Please choose a draw mode--</option>
					{MODES.map(mode => (
						<option key={mode.id} value={mode.id}>
							{mode.text}
						</option>
					))}
				</select>
			</div>
		);
	};

	const { viewport, modeHandler } = state;

	const MAPBOX_TOKEN =
		"pk.eyJ1IjoidWJlcmRhdGEiLCJhIjoiY2pwY3owbGFxMDVwNTNxcXdwMms2OWtzbiJ9.1PPVl0VLUQgqrosrI2nUhg";

	return (
		<MapGL
			{...viewport}
			width="100%"
			height="100%"
			mapboxApiAccessToken={MAPBOX_TOKEN}
			onViewportChange={_updateViewport}
			mapStyle={"mapbox://styles/mapbox/satellite-streets-v11"}
		>
			<Editor
				clickRadius={12}
				mode={modeHandler}
				onSelect={_ => {}}
				onUpdate={({ data }) => {
					setState({ ...state, features: data });
					setFeatures(data);
				}}
				features={state.features}
			/>
			{_renderToolbar()}
			<button
				className="button"
				onClick={() => {
					// console.log(Object.values(features)[0]?.geometry?.coordinates);
					console.log(features);
					window.alert(features);
				}}
			>
				Илгээх
			</button>
		</MapGL>
	);
}

document.body.style = "width: 100vw; height: 100vh; margin: 0;";
const container = document.getElementById("root");
container.style = "width: 100%; height: 100%";
createRoot(container).render(<App />);

export default App;
