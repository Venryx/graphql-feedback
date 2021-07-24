import { Proposal } from "../db/proposals/@Proposal.js";
export declare class Proposals {
    constructor();
    selectedProposalID: string;
    features_showCompleted: boolean;
    issues_showCompleted: boolean;
}
export declare const GetSelectedProposalID: ((this: void | import("mobx-graphlink").AccessorCallPlan) => string) & {
    Async: () => Promise<string>;
    Wait: (this: void | import("mobx-graphlink").AccessorCallPlan) => string;
    CatchBail: <T>(bailResultOrGetter: T) => string | (T extends () => any ? ReturnType<T> : T);
    CatchItemBails: <T_1>(itemBailResult: T_1) => string | (T_1 extends () => any ? ReturnType<T_1> : T_1);
};
export declare const GetSelectedProposal: (() => Proposal) & {
    Async: () => Promise<Proposal>;
    Wait: () => Proposal;
    CatchBail: <T>(bailResultOrGetter: T) => Proposal | (T extends () => any ? ReturnType<T> : T);
    CatchItemBails: <T_1>(itemBailResult: T_1) => Proposal | (T_1 extends () => any ? ReturnType<T_1> : T_1);
};
