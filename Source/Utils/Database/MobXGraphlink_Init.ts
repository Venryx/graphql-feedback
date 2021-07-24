import {OnPopulated, manager, Manager} from "../../Manager.js";
import {store} from "../../Store/index.js";
import {graph} from "./MobXGraphlink.js";

OnPopulated(()=> {
	store.graphlink = graph;
	// now that manager.dbPath is populated, we can initialize the Graphlink
	graph.Initialize({
		//rootPathInDB: manager.dbPath,
		rootStore: store,
		apollo: manager.apollo,
		onServer: false,
	});
});