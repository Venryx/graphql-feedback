import { SetProposalOrder } from "./SetProposalOrder.js";
import { Command, DBHelper } from "mobx-graphlink";
export declare class DeleteProposal extends Command<{
    id: string;
}> {
    sub_removalsFromUserOrderings: SetProposalOrder[];
    Validate(): void;
    DeclareDBUpdates(db: DBHelper): void;
}
