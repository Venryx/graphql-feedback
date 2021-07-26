import { n } from "../../Utils/@Internal/Types.js";
export declare const GetProposalsOrder: ((userID: string | n) => string[]) & {
    Async: (userID: string | n) => Promise<string[]>;
    Wait: (userID: string | n) => string[];
    CatchBail: <T>(bailResultOrGetter: T, userID: string | n) => string[] | (T extends () => any ? ReturnType<T> : T);
    CatchItemBails: <T_1>(itemBailResult: T_1, userID: string | n) => string[] | (T_1 extends () => any ? ReturnType<T_1> : T_1);
};
export declare const GetProposalIndex: ((userID: string, proposalID: string) => number | null) & {
    Async: (userID: string, proposalID: string) => Promise<number | null>;
    Wait: (userID: string, proposalID: string) => number | null;
    CatchBail: <T>(bailResultOrGetter: T, userID: string, proposalID: string) => number | (T extends () => any ? ReturnType<T> : T);
    CatchItemBails: <T_1>(itemBailResult: T_1, userID: string, proposalID: string) => number | (T_1 extends () => any ? ReturnType<T_1> : T_1);
};
