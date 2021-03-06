import { LogTypes } from "./Utils/General/Logging.js";
import {CE} from "js-vextensions";
import type {Lib_RootState} from "./Store/index.js";
import {ApolloClient, NormalizedCacheObject} from "@apollo/client";
import {n} from "./Utils/@Internal/Types.js";

export class PermissionGroupSet {
	basic: boolean;
	verified: boolean;
	mod: boolean;
	admin: boolean;
}

export type ActionFunc<StoreType> = (store: StoreType)=>void;
export type Link_Props = {
	onClick?, style?,
	text?: string, to?: string, target?: string, replace?: boolean, // url-based
	actionFunc?: ActionFunc<Lib_RootState>, // new approach, for mobx/mst store
} & React.HTMLProps<HTMLAnchorElement>;

export type User = {
	id: string;
	displayName: string;
	//photoURL: string;
};

export class Manager {
	Populate(data: Omit<Manager, "Populate" | "rootStore">) {
		CE(this).Extend(data);
		OnPopulated_listeners.forEach(a=>a());
	}

	GetStore: ()=>any;
	get rootStore() { return this.GetStore(); }
	apollo: ApolloClient<NormalizedCacheObject>;
	//dbPath: string;
	/*storePath_mainData: string;
	storePath_dbData: string;*/
	FormatTime: (time: number, formatStr: string)=>string;

	logTypes = new LogTypes();

	ShowSignInPopup: ()=>void;
	GetUserID: ()=>string|n;
	GetUser: (id: string|n)=>User|n;
	GetUserPermissionGroups: (userID: string|n)=>PermissionGroupSet;

	GetNewURLForStoreChanges: (actionFunc: ActionFunc<Lib_RootState>)=>string|null;

	MarkdownRenderer: any; //(...props: any[])=>JSX.Element;
	actionBarZIndex? = 11;
}
export const manager = new Manager();

export let OnPopulated_listeners = [] as (()=>any)[];
export function OnPopulated(listener: ()=>any) { OnPopulated_listeners.push(listener); }