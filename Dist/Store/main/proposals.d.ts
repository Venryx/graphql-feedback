import { Proposal } from "../db/proposals/@Proposal.js";
import { n } from "../../Utils/@Internal/Types.js";
export declare class ProposalsState {
    constructor();
    selectedProposalID: string | n;
    features_showCompleted: boolean;
    issues_showCompleted: boolean;
}
export declare const GetSelectedProposalID: ((this: void | import("mobx-graphlink").AccessorCallPlan) => string | n) & {
    Async: () => Promise<string | n>;
    Wait: (this: void | import("mobx-graphlink").AccessorCallPlan) => string | n;
    CatchBail: <T>(bailResultOrGetter: T) => string | (T extends () => any ? ReturnType<T> : T);
};
export declare const GetSelectedProposal: (() => Proposal | null | undefined) & {
    Async: () => Promise<Proposal | null | undefined>;
    Wait: () => Proposal | null | undefined;
    CatchBail: <T>(bailResultOrGetter: T) => Proposal | (T extends () => any ? ReturnType<T> : T);
};
