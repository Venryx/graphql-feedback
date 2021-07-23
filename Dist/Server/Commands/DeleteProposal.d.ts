import { SetProposalOrder } from "./SetProposalOrder";
import { Command, DBHelper } from "mobx-graphlink";
export declare class DeleteProposal extends Command<{
    id: string;
}> {
    sub_removalsFromUserOrderings: SetProposalOrder[];
    Validate(): void;
    DeclareDBUpdates(db: DBHelper): void;
}
