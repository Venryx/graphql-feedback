import { n } from "../../Utils/@Internal/Types.js";
export declare const GetProposal: ((id: string | n) => import("./proposals/@Proposal.js").Proposal | null | undefined) & {
    Async: (id: string | n) => Promise<import("./proposals/@Proposal.js").Proposal | null | undefined>;
    Wait: (id: string | n) => import("./proposals/@Proposal.js").Proposal | null | undefined;
    CatchBail: <T>(bailResultOrGetter: T, id: string | n) => import("./proposals/@Proposal.js").Proposal | (T extends () => any ? ReturnType<T> : T);
};
export declare const GetProposals: (() => import("./proposals/@Proposal.js").Proposal[]) & {
    Async: () => Promise<import("./proposals/@Proposal.js").Proposal[]>;
    Wait: () => import("./proposals/@Proposal.js").Proposal[];
    CatchBail: <T>(bailResultOrGetter: T) => import("./proposals/@Proposal.js").Proposal[] | (T extends () => any ? ReturnType<T> : T);
};
