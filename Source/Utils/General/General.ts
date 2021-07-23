import {runInAction} from "mobx";

export function RunInAction(name: string, action: ()=>any) {
	Object.defineProperty(action, "name", {value: name});
	runInAction(action);
}