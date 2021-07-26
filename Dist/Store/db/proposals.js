import { CreateAccessor, GetDoc, GetDocs } from "mobx-graphlink";
export const GetProposal = CreateAccessor((id) => {
    return GetDoc({}, a => a.feedback_proposals.get(id));
});
export const GetProposals = CreateAccessor(() => {
    return GetDocs({}, a => a.feedback_proposals);
});
