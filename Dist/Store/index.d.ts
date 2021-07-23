import { MainState as Lib_MainState } from "./main";
import { Graphlink } from "mobx-graphlink";
import { Lib_DBShape } from "./db";
export declare class Lib_RootState {
    main: Lib_MainState;
    graphlink: Graphlink<Lib_RootState, Lib_DBShape>;
}
export declare const store: Lib_RootState;
