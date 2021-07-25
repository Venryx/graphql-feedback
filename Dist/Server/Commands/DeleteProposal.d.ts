import { Command, DBHelper } from "mobx-graphlink";
import { SetProposalOrder } from "./SetProposalOrder.js";
export declare class DeleteProposal extends Command<{
    id: string;
}> {
    sub_removalsFromUserOrderings: SetProposalOrder[];
    Validate(): void;
    DeclareDBUpdates(db: DBHelper): void;
}
