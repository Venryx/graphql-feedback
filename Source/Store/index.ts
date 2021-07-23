import {observable} from "mobx";
import {MainState as Lib_MainState} from "./main";
import {ignore} from "mobx-sync";
import {Graphlink} from "mobx-graphlink";
import {Lib_DBShape} from "./db";

// configure({ enforceActions: 'always' });
//configure({ enforceActions: 'observed' });

export class Lib_RootState {
	@observable main = new Lib_MainState();
	@observable @ignore graphlink: Graphlink<Lib_RootState, Lib_DBShape>;
}

export const store = new Lib_RootState();