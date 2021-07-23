import { Command, DBHelper } from "mobx-graphlink";
export declare class SetProposalOrder extends Command<{
    proposalID: string;
    userID: string;
    index: number;
}> {
    newOrder: string[];
    Validate(): void;
    DeclareDBUpdates(db: DBHelper): void;
}
