export declare const GetProposalsOrder: ((userID: string) => string[]) & {
    Async: (userID: string) => Promise<string[]>;
    Wait: (userID: string) => string[];
    CatchBail: <T>(bailResultOrGetter: T, userID: string) => string[] | (T extends () => any ? ReturnType<T> : T);
    CatchItemBails: <T_1>(itemBailResult: T_1, userID: string) => string[] | (T_1 extends () => any ? ReturnType<T_1> : T_1);
};
export declare const GetProposalIndex: ((userID: string, proposalID: string) => number) & {
    Async: (userID: string, proposalID: string) => Promise<number>;
    Wait: (userID: string, proposalID: string) => number;
    CatchBail: <T>(bailResultOrGetter: T, userID: string, proposalID: string) => number | (T extends () => any ? ReturnType<T> : T);
    CatchItemBails: <T_1>(itemBailResult: T_1, userID: string, proposalID: string) => number | (T_1 extends () => any ? ReturnType<T_1> : T_1);
};
