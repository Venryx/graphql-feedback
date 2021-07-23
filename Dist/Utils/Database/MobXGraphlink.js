import { Graphlink } from "mobx-graphlink";
/*export let graph: Graphlink<Lib_RootState, Lib_DBShape>;
OnPopulated(()=> {
    graph = new Graphlink(manager.dbPath, store);
    store.graphlink = graph;
});*/
//export let graph = new Graphlink<Lib_RootState, Lib_DBShape>(manager.dbPath, store);
// at import time, since manager.dbPath not yet populated, init graphlink with dbPath of null (we need this instance created at import-time, so it can be sent as an argument in StoreAccessor calls)
export let graph = new Graphlink();
require("./MobXGraphlink_Init.js");
