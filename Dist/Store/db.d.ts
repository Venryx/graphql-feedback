import { Proposal } from "./db/proposals/@Proposal.js";
import { UserData } from "./db/userData.js";
import { Collection } from "mobx-graphlink";
export interface Lib_DBShape {
    proposals: Collection<Proposal>;
    userData: Collection<UserData>;
}
