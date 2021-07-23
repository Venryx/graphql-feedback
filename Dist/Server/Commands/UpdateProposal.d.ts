import { Proposal } from "../../Store/db/proposals/@Proposal";
import { Command, DBHelper } from "mobx-graphlink";
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
