import {DB, Field, MGLClass} from "mobx-graphlink";

@MGLClass({table: "feedback_userInfos"})
// renamed; postgraphile has issues with "Datas" (when "PgRowByUniqueConstraint.js" singularizes the collection to "userData", it has conflict with the "userData" resolver already present)
//export class UserData {
export class UserInfo {
	//proposalIndexes: ProposalIndexSet;

	@DB((t, n)=>t.text(n).primary())
	@Field({$ref: "UUID"}, {opt: true})
	id: string; // user-id

	@DB((t, n)=>t.specificType(n, "text[]"))
	@Field({items: {$ref: "UUID"}})
	proposalsOrder: string[];
}