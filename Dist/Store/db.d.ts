import { Proposal } from "./db/proposals/@Proposal";
import { UserData } from "./db/userData";
import { Collection } from "mobx-graphlink";
export interface Lib_DBShape {
    proposals: Collection<Proposal>;
    userData: Collection<UserData>;
}
