import { Command, DBHelper } from "mobx-graphlink";
export declare class SetProposalOrder extends Command<{
    proposalID: string;
    index: number;
}> {
    userOverride: string;
    get userID(): string;
    newOrder: string[];
    Validate(): void;
    DeclareDBUpdates(db: DBHelper): void;
}
