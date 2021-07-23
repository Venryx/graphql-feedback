import {Command, DBHelper, dbp} from "mobx-graphlink";
import {Proposal} from "../../index";
import {AssertValidate} from "../Server";

export type _MainType = Proposal;
let MTName = "Proposal";

//@UserEdit
export class AddProposal extends Command<{data: _MainType}, {id: string}> {
	Validate() {
		let {data} = this.payload;

		data.id = this.GenerateUUID_Once("id");
		data.creator = this.userInfo.id;
		data.createdAt = Date.now();
		//thread.editedAt = thread.createdAt;

		this.returnData = {id: data.id};
		AssertValidate(MTName, data, `${MTName} invalid`);
	}
	
	DeclareDBUpdates(db: DBHelper) {
		let {data} = this.payload;
		db.set(dbp`proposals/${data.id}`, data);
	}
}