import {makeObservable, observable} from "mobx";
import {MainState as Lib_MainState} from "./main.js";
import {ignore} from "mobx-sync";
import {Graphlink} from "mobx-graphlink";
import {Lib_DBShape} from "./db.js";

// configure({ enforceActions: 'always' });
//configure({ enforceActions: 'observed' });

export class Lib_RootState {
	constructor() { makeObservable(this); }
	@observable main = new Lib_MainState();
	@observable @ignore graphlink: Graphlink<Lib_RootState, Lib_DBShape>;
}

export const store = new Lib_RootState();