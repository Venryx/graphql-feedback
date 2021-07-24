import { Command, DBHelper } from "mobx-graphlink";
import { Proposal } from "../../Store/db/proposals/@Proposal.js";
declare type MainType = Proposal;
export declare class UpdateProposal extends Command<{
    id: string;
    updates: Partial<MainType>;
}> {
    oldData: MainType;
    newData: MainType;
    Validate(): void;
    DeclareDBUpdates(db: DBHelper): void;
}
export {};
