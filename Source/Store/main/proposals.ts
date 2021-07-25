import {GetProposal} from "../db/proposals.js";
import {Proposal} from "../db/proposals/@Proposal.js";
import {makeObservable, observable} from "mobx";
import {CreateAccessor} from "mobx-graphlink";
import {UT_StoreShape} from "mobx-graphlink/Dist/UserTypes";

export class ProposalsState {
	constructor() { makeObservable(this); }
	@observable selectedProposalID: string;
	@observable features_showCompleted: boolean;
	@observable issues_showCompleted: boolean;
}

export const GetSelectedProposalID = CreateAccessor(function(): string {
	//return (this["store"] as Lib_RootState).main.proposals.selectedProposalID;
	return (this["store"] as UT_StoreShape).feedback.main.proposals.selectedProposalID;
});
export const GetSelectedProposal = CreateAccessor((): Proposal=>{
	let selectedID = GetSelectedProposalID();
	return GetProposal(selectedID);
});