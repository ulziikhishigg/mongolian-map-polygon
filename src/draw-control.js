// import MapboxDraw from "@mapbox/mapbox-gl-draw";
// import { useControl } from "react-map-gl";

// Object.defineProperty(exports, "__esModule", { value: true });
// function DrawControl(props) {
// 	useControl(
// 		function () {
// 			return new MapboxDraw(props);
// 		},
// 		function (_a) {
// 			var map = _a.map;
// 			map.on("draw.create", props.onCreate);
// 			map.on("draw.update", props.onUpdate);
// 			map.on("draw.delete", props.onDelete);
// 		},
// 		function (_a) {
// 			var map = _a.map;
// 			map.off("draw.create", props.onCreate);
// 			map.off("draw.update", props.onUpdate);
// 			map.off("draw.delete", props.onDelete);
// 		},
// 		{
// 			position: props.position,
// 		}
// 	);
// 	return null;
// }
// export default DrawControl;
// DrawControl.defaultProps = {
// 	onCreate: function () {},
// 	onUpdate: function () {},
// 	onDelete: function () {},
// };
