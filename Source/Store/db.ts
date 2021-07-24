import {Proposal} from "./db/proposals/@Proposal.js";
import {UserData} from "./db/userData.js";
import {Collection} from "mobx-graphlink";

export interface Lib_DBShape {
	feedback_proposals: Collection<Proposal>;
	feedback_userData: Collection<UserData>;
}