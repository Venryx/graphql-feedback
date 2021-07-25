import { GetDoc, GetDocs, CreateAccessor } from "mobx-graphlink";
export const GetProposal = CreateAccessor((id) => {
    if (id == null)
        return null;
    return GetDoc({}, a => a.feedback_proposals.get(id));
});
export const GetProposals = CreateAccessor(() => {
    return GetDocs({}, a => a.feedback_proposals);
});
