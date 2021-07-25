import {makeObservable, observable} from "mobx";
import {MainState as Lib_MainState} from "./main.js";
import {ignore} from "mobx-sync";
import {Graphlink} from "mobx-graphlink";
import {Lib_DBShape} from "./db.js";

// configure({ enforceActions: 'always' });
//configure({ enforceActions: 'observed' });

declare module "mobx-graphlink/Dist/UserTypes" {
	// extend field-by-field (only one "interface UT_DBShape extends X" can exist, and that's best to reserve for user project)
	interface UT_StoreShape {
		feedback: Lib_RootState;
	}
	//interface UT_DBShape {} // moved to db.ts
}

export class Lib_RootState {
	constructor() { makeObservable(this); }
	@observable main = new Lib_MainState();
}

export const store = new Lib_RootState();