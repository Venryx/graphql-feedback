import { LogTypes } from "./Utils/General/Logging";
import {CE} from "js-vextensions";
import {Lib_RootState} from "./Store";
import {ApolloClient, NormalizedCacheObject} from "@apollo/client";

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
	_key?: string;
	displayName: string;
	//photoURL: string;
};

export class Manager {
	Populate(data: Omit<Manager, "Populate" | "store">) {
		CE(this).Extend(data);
		OnPopulated_listeners.forEach(a=>a());
	}

	GetStore: ()=>any;
	get store() { return this.GetStore(); }
	apollo: ApolloClient<NormalizedCacheObject>;
	dbPath: string;
	/*storePath_mainData: string;
	storePath_dbData: string;*/
	FormatTime: (time: number, formatStr: string)=>string;

	logTypes = new LogTypes();

	ShowSignInPopup: ()=>void;
	GetUserID: ()=>string;
	GetUser: (id: string)=>User;
	GetUserPermissionGroups: (userID: string)=>PermissionGroupSet;

	GetNewURLForStoreChanges: (actionFunc: ActionFunc<Lib_RootState>)=>string;

	MarkdownRenderer: any; //(...props: any[])=>JSX.Element;
	actionBarZIndex? = 11;
}
export const manager = new Manager();

export let OnPopulated_listeners = [];
export function OnPopulated(listener: ()=>any) { OnPopulated_listeners.push(listener); }