import { MainState as Lib_MainState } from "./main.js";
import { Graphlink } from "mobx-graphlink";
import { Lib_DBShape } from "./db.js";
export declare class Lib_RootState {
    constructor();
    main: Lib_MainState;
    graphlink: Graphlink<Lib_RootState, Lib_DBShape>;
}
export declare const store: Lib_RootState;
