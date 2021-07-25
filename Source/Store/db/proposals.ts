import { Proposal } from "./proposals/@Proposal.js";
import {GetDoc, GetDocs, CreateAccessor} from "mobx-graphlink";

export const GetProposal = CreateAccessor((id: string): Proposal=>{
	if (id == null) return null;
	return GetDoc({}, a=>a.feedback_proposals.get(id));
});
export const GetProposals = CreateAccessor((): Proposal[]=>{
	return GetDocs({}, a=>a.feedback_proposals);
});