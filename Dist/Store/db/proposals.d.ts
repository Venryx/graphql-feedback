import { Proposal } from "./proposals/@Proposal.js";
export declare const GetProposal: ((id: string) => Proposal) & {
    Async: (id: string) => Promise<Proposal>;
    Wait: (id: string) => Proposal;
    CatchBail: <T>(bailResultOrGetter: T, id: string) => Proposal | (T extends () => any ? ReturnType<T> : T);
    CatchItemBails: <T_1>(itemBailResult: T_1, id: string) => Proposal | (T_1 extends () => any ? ReturnType<T_1> : T_1);
};
export declare const GetProposals: (() => Proposal[]) & {
    Async: () => Promise<Proposal[]>;
    Wait: () => Proposal[];
    CatchBail: <T>(bailResultOrGetter: T) => Proposal[] | (T extends () => any ? ReturnType<T> : T);
    CatchItemBails: <T_1>(itemBailResult: T_1) => Proposal[] | (T_1 extends () => any ? ReturnType<T_1> : T_1);
};
