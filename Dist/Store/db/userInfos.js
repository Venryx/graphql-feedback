import { CreateAccessor, GetDoc } from "mobx-graphlink";
import { emptyArray } from "../../General.js";
/*export type ProposalIndexSet = { [key: number]: string; }; // index -> proposalID
AddSchema({patternProperties: {"^[0-9]+$": {type: "number"}}}, "ProposalIndexSet");*/
/*export const GetProposalIndexes = StoreAccessor(s=>(userID: string): ProposalIndexSet => {
    if (userID == null) return {};
    return GetDoc(a=>a.userData.get(userID))?.proposalIndexes || {};
});
export const GetProposalOrder = StoreAccessor(s=>(userID: string): string[] => {
    return CE(GetProposalIndexes(userID)).VValues(true);
});*/
export const GetProposalsOrder = CreateAccessor((userID) => {
    var _a;
    let userData = GetDoc({}, a => a.feedback_userInfos.get(userID));
    return (_a = userData === null || userData === void 0 ? void 0 : userData.proposalsOrder) !== null && _a !== void 0 ? _a : emptyArray;
});
export const GetProposalIndex = CreateAccessor((userID, proposalID) => {
    if (userID == null || proposalID == null)
        return null;
    /*let proposalIndexEntry = CE(GetProposalIndexes(userID)).Pairs().find(a=>a.value == proposalID);
    if (proposalIndexEntry == null) return null;
    return CE(proposalIndexEntry.key).ToInt();*/
    //return GetProposalsOrder(userID).findIndex(id=>id == proposalID);
    return GetProposalsOrder(userID).indexOf(proposalID);
});
