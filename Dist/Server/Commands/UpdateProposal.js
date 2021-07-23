import { WaitTillSchemaAddedThenRun, GetSchemaJSON, AddSchema, Schema, AssertValidate } from "../Server";
import { Command, AssertV, dbp } from "mobx-graphlink";
import { GetProposal } from "../../Store/db/proposals";
let MTName = "Proposal";
WaitTillSchemaAddedThenRun(MTName, () => {
    AddSchema({
        properties: {
            id: { type: "string" },
            updates: Schema({
                properties: GetSchemaJSON(MTName).properties.Including("title", "text", "completedAt"),
            }),
        },
        required: ["id", "updates"],
    }, `Update${MTName}_payload`);
});
//@UserEdit
export class UpdateProposal extends Command {
    Validate() {
        AssertValidate(`Update${MTName}_payload`, this.payload, `Payload invalid`);
        let { id, updates } = this.payload;
        this.oldData = GetProposal(id);
        AssertV(this.oldData, "oldData is null");
        this.newData = { ...this.oldData, ...updates };
        AssertValidate(MTName, this.newData, `New ${MTName.toLowerCase()}-data invalid`);
    }
    DeclareDBUpdates(db) {
        let { id } = this.payload;
        db.set(dbp `proposals/${id}`, this.newData);
    }
}
