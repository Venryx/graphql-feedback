import { CreateAccessor, GetDoc } from "mobx-graphlink";
import { emptyArray } from "../../General.js";
import { graph } from "../../Utils/Database/MobXGraphlink.js";
/*export type ProposalIndexSet = { [key: number]: string; }; // index -> proposalID
AddSchema({patternProperties: {"^[0-9]+$": {type: "number"}}}, "ProposalIndexSet");*/
/*export const GetProposalIndexes = StoreAccessor({graph}, s=>(userID: string): ProposalIndexSet => {
    if (userID == null) return {};
    return GetDoc({graph}, a=>a.userData.get(userID))?.proposalIndexes || {};
});
export const GetProposalOrder = StoreAccessor({graph}, s=>(userID: string): string[] => {
    return CE(GetProposalIndexes(userID)).VValues(true);
});*/
export const GetProposalsOrder = CreateAccessor({ graph }, (userID, undefinedForLoading = false) => {
    if (userID == null)
        return emptyArray;
    let userData = GetDoc({ graph }, a => a.userData.get(userID));
    if (undefinedForLoading && userData === undefined)
        return undefined; // undefined from mobx-graphlink means still loading
    return (userData === null || userData === void 0 ? void 0 : userData.proposalsOrder) || emptyArray;
});
export const GetProposalIndex = CreateAccessor({ graph }, (userID, proposalID) => {
    if (userID == null || proposalID == null)
        return null;
    /*let proposalIndexEntry = CE(GetProposalIndexes(userID)).Pairs().find(a=>a.value == proposalID);
    if (proposalIndexEntry == null) return null;
    return CE(proposalIndexEntry.key).ToInt();*/
    //return GetProposalsOrder(userID).findIndex(id=>id == proposalID);
    return GetProposalsOrder(userID).indexOf(proposalID);
});
