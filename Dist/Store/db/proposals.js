import { GetDoc, GetDocs, CreateAccessor } from "mobx-graphlink";
import { graph } from "../../Utils/Database/MobXGraphlink.js";
export const GetProposal = CreateAccessor({ graph }, (id) => {
    if (id == null)
        return null;
    return GetDoc({ graph }, a => a.proposals.get(id));
});
export const GetProposals = CreateAccessor({ graph }, () => {
    return GetDocs({ graph }, a => a.proposals);
});
