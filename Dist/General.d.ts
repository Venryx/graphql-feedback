import { Proposal } from "./index.js";
import { n } from "./Utils/@Internal/Types.js";
export declare function RemoveDuplicates(items: any): any[];
export declare var emptyArray: never[];
export declare enum AccessLevel {
    Basic = 10,
    Verified = 20,
    Mod = 30,
    Admin = 40
}
export declare function GetUserAccessLevel(userID: string | n): AccessLevel;
export declare function IsUserBasic(userID: string | n): boolean;
export declare function IsUserVerified(userID: string | n): boolean;
export declare function IsUserMod(userID: string | n): boolean;
export declare function IsUserAdmin(userID: string | n): boolean;
export declare function IsUserBasicOrAnon(userID: string | n): boolean;
export declare function IsUserCreatorOrMod(userID: string | n, entity: Proposal): boolean;
