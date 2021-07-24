import { Graphlink } from "mobx-graphlink";
/*export let graph: Graphlink<Lib_RootState, Lib_DBShape>;
OnPopulated(()=> {
    graph = new Graphlink(manager.dbPath, store);
    store.graphlink = graph;
});*/
//export let graph = new Graphlink<Lib_RootState, Lib_DBShape>(manager.dbPath, store);
// at import time, since manager.dbPath not yet populated, init graphlink with dbPath of null (we need this instance created at import-time, so it can be sent as an argument in StoreAccessor calls)
export let graph = new Graphlink();
// do this last, so that graph instance is created before MobXGraphlink_Init imports the store-accessors (which require the graph instance)
//require("./MobXGraphlink_Init.js");
/*declare var require; // we assume webpack or the like is being used
require("./MobXGraphlink_Init.js");*/
import("./MobXGraphlink_Init.js");
