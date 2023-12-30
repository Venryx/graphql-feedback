import { n } from "../../Utils/@Internal/Types.js";
export declare const GetProposalsOrder: ((userID: string | n) => string[]) & {
    Async: (userID: string | n) => Promise<string[]>;
    Wait: (userID: string | n) => string[];
    CatchBail: <T>(bailResultOrGetter: T, userID: string | n) => string[] | (T extends () => any ? ReturnType<T> : T);
};
export declare const GetProposalIndex: ((userID: string, proposalID: string) => number | null) & {
    Async: (userID: string, proposalID: string) => Promise<number | null>;
    Wait: (userID: string, proposalID: string) => number | null;
    CatchBail: <T>(bailResultOrGetter: T, userID: string, proposalID: string) => number | (T extends () => any ? ReturnType<T> : T);
};
