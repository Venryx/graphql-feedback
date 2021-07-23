import { Proposal } from "./proposals/@Proposal";
import {GetDoc, GetDocs, CreateAccessor} from "mobx-graphlink";
import {graph} from "../../Utils/Database/MobXGraphlink";

export const GetProposal = CreateAccessor({graph}, (id: string): Proposal=>{
	if (id == null) return null;
	return GetDoc({graph}, a=>a.proposals.get(id));
});
export const GetProposals = CreateAccessor({graph}, (): Proposal[]=>{
	return GetDocs({graph}, a=>a.proposals);
});