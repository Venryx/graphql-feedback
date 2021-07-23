import { OnPopulated, manager } from "../../Manager";
import { store } from "../../Store";
import { graph } from "./MobXGraphlink";
OnPopulated(() => {
    store.graphlink = graph;
    // now that manager.dbPath is populated, we can initialize the Graphlink
    graph.Initialize({
        //rootPathInDB: manager.dbPath,
        rootStore: store,
        apollo: manager.apollo,
        onServer: false,
    });
});
