import {GetProposal} from "../db/proposals";
import {Proposal} from "../db/proposals/@Proposal";
import {observable} from "mobx";
import {CreateAccessor} from "mobx-graphlink";
import {graph} from "../../Utils/Database/MobXGraphlink";
import {Lib_RootState} from "../index.js";

export class Proposals {
	@observable selectedProposalID: string;
	@observable features_showCompleted: boolean;
	@observable issues_showCompleted: boolean;
}

export const GetSelectedProposalID = CreateAccessor({graph}, function(): string {
	return (this["store"] as Lib_RootState).main.proposals.selectedProposalID;
});
export const GetSelectedProposal = CreateAccessor({graph}, (): Proposal=>{
	let selectedID = GetSelectedProposalID();
	return GetProposal(selectedID);
});