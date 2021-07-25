export declare const GetProposalsOrder: ((this: void | import("mobx-graphlink").AccessorCallPlan, userID: string, undefinedForLoading?: any) => string[]) & {
    Async: (userID: string, undefinedForLoading?: any) => Promise<string[]>;
    Wait: (this: void | import("mobx-graphlink").AccessorCallPlan, userID: string, undefinedForLoading?: any) => string[];
    CatchBail: <T>(bailResultOrGetter: T, userID: string, undefinedForLoading?: any) => string[] | (T extends () => any ? ReturnType<T> : T);
    CatchItemBails: <T_1>(itemBailResult: T_1, userID: string, undefinedForLoading?: any) => string[] | (T_1 extends () => any ? ReturnType<T_1> : T_1);
};
export declare const GetProposalIndex: ((userID: string, proposalID: string) => number) & {
    Async: (userID: string, proposalID: string) => Promise<number>;
    Wait: (userID: string, proposalID: string) => number;
    CatchBail: <T>(bailResultOrGetter: T, userID: string, proposalID: string) => number | (T extends () => any ? ReturnType<T> : T);
    CatchItemBails: <T_1>(itemBailResult: T_1, userID: string, proposalID: string) => number | (T_1 extends () => any ? ReturnType<T_1> : T_1);
};
