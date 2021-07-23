import { Command, DBHelper } from "mobx-graphlink";
import { Proposal } from "../../index";
export declare type _MainType = Proposal;
export declare class AddProposal extends Command<{
    data: _MainType;
}, {
    id: string;
}> {
    Validate(): void;
    DeclareDBUpdates(db: DBHelper): void;
}
