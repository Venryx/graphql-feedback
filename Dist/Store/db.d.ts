import { Proposal } from "./db/proposals/@Proposal.js";
import { Collection } from "mobx-graphlink";
import { UserData } from "./db/userData/@UserData.js";
export interface Lib_DBShape {
    feedback_proposals: Collection<Proposal>;
    feedback_userDatas: Collection<UserData>;
}
