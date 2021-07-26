import {GetProposal} from "../db/proposals.js";
import {Proposal} from "../db/proposals/@Proposal.js";
import {makeObservable, observable} from "mobx";
import {CreateAccessor} from "mobx-graphlink";
import {UT_StoreShape} from "mobx-graphlink/Dist/UserTypes";
import {n} from "../../Utils/@Internal/Types.js";

export class ProposalsState {
	constructor() { makeObservable(this); }
	@observable selectedProposalID: string|n;
	@observable features_showCompleted: boolean;
	@observable issues_showCompleted: boolean;
}

export const GetSelectedProposalID = CreateAccessor(function() {
	//return (this["store"] as Lib_RootState).main.proposals.selectedProposalID;
	return (this["store"] as UT_StoreShape).feedback.main.proposals.selectedProposalID;
});
export const GetSelectedProposal = CreateAccessor(()=>{
	let selectedID = GetSelectedProposalID();
	return GetProposal(selectedID);
});