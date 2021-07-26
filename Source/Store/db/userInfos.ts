import {CreateAccessor, GetDoc} from "mobx-graphlink";
import {emptyArray} from "../../General.js";
import {n} from "../../Utils/@Internal/Types.js";

/*export type ProposalIndexSet = { [key: number]: string; }; // index -> proposalID
AddSchema({patternProperties: {"^[0-9]+$": {type: "number"}}}, "ProposalIndexSet");*/

/*export const GetProposalIndexes = StoreAccessor(s=>(userID: string): ProposalIndexSet => {
	if (userID == null) return {};
	return GetDoc(a=>a.userData.get(userID))?.proposalIndexes || {};
});
export const GetProposalOrder = StoreAccessor(s=>(userID: string): string[] => {
	return CE(GetProposalIndexes(userID)).VValues(true);
});*/
export const GetProposalsOrder = CreateAccessor((userID: string|n)=>{
	let userData = GetDoc({}, a=>a.feedback_userInfos.get(userID!));
	return userData?.proposalsOrder ?? emptyArray;
});
export const GetProposalIndex = CreateAccessor((userID: string, proposalID: string)=>{
	if (userID == null || proposalID == null) return null;
	/*let proposalIndexEntry = CE(GetProposalIndexes(userID)).Pairs().find(a=>a.value == proposalID);
	if (proposalIndexEntry == null) return null;
	return CE(proposalIndexEntry.key).ToInt();*/
	//return GetProposalsOrder(userID).findIndex(id=>id == proposalID);
	return GetProposalsOrder(userID).indexOf(proposalID);
});