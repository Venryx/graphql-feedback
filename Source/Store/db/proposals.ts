import {CreateAccessor, GetDoc, GetDocs} from "mobx-graphlink";
import {n} from "../../Utils/@Internal/Types.js";

export const GetProposal = CreateAccessor((id: string|n)=>{
	return GetDoc({}, a=>a.feedback_proposals.get(id!));
});
export const GetProposals = CreateAccessor(()=>{
	return GetDocs({}, a=>a.feedback_proposals);
});