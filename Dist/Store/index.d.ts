import { MainState as Lib_MainState } from "./main.js";
declare module "mobx-graphlink/Dist/UserTypes" {
    interface UT_StoreShape {
        feedback: Lib_RootState;
    }
}
export declare class Lib_RootState {
    constructor();
    main: Lib_MainState;
}
export declare const store: Lib_RootState;
