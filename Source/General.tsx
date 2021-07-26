import {Assert} from "js-vextensions";
import {Proposal} from "./index.js";
import {manager} from "./Manager.js";
import {n} from "./Utils/@Internal/Types.js";

export function RemoveDuplicates(items: any) {
	var result = [] as any[];
	for (let item of items) {
		if (result.indexOf(item) == -1) {
			result.push(item);
		}
	}
	return result;
}

export var emptyArray = [];

export enum AccessLevel {
	Basic = 10,
	Verified = 20, // for accounts we're pretty sure are legitimate (an actual person's only account)
	Mod = 30,
	Admin = 40,
}

/*export function GetUserPermissionGroups(userID: string): PermissionGroupSet {
	if (userID == null) return null;
	return GetData("userExtras", userID, "permissionGroups");
}*/
export function GetUserAccessLevel(userID: string|n) {
	let groups = manager.GetUserPermissionGroups(userID);
	if (groups == null) return AccessLevel.Basic;
	
	if (groups.admin) return AccessLevel.Admin;
	if (groups.mod) return AccessLevel.Mod;
	if (groups.verified) return AccessLevel.Verified;
	//if (groups.basic) return AccessLevel.Basic;
	Assert(false);
}
export function IsUserBasic(userID: string|n) { return (manager.GetUserPermissionGroups(userID) || {} as any).basic; }
export function IsUserVerified(userID: string|n) { return (manager.GetUserPermissionGroups(userID) || {} as any).verified; }
export function IsUserMod(userID: string|n) { return (manager.GetUserPermissionGroups(userID) || {} as any).mod; }
export function IsUserAdmin(userID: string|n) { return (manager.GetUserPermissionGroups(userID) || {} as any).admin; }

export function IsUserBasicOrAnon(userID: string|n) {
	let permissionGroups = manager.GetUserPermissionGroups(userID);
	return permissionGroups == null || permissionGroups.basic;
}
export function IsUserCreatorOrMod(userID: string|n, entity: Proposal) {
	let permissionGroups = manager.GetUserPermissionGroups(userID);
	if (permissionGroups == null) return false;
	return (entity.creator == userID && permissionGroups.basic) || permissionGroups.mod;
}