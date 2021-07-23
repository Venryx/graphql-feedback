import { Command, dbp } from "mobx-graphlink";
import { AssertValidate } from "../Server";
let MTName = "Proposal";
//@UserEdit
export class AddProposal extends Command {
    Validate() {
        let { data } = this.payload;
        data.id = this.GenerateUUID_Once("id");
        data.creator = this.userInfo.id;
        data.createdAt = Date.now();
        //thread.editedAt = thread.createdAt;
        this.returnData = { id: data.id };
        AssertValidate(MTName, data, `${MTName} invalid`);
    }
    DeclareDBUpdates(db) {
        let { data } = this.payload;
        db.set(dbp `proposals/${data.id}`, data);
    }
}
