/// <reference types="react" />
import { LogTypes } from "./Utils/General/Logging.js";
import type { Lib_RootState } from "./Store/index.js";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { n } from "./Utils/@Internal/Types.js";
export declare class PermissionGroupSet {
    basic: boolean;
    verified: boolean;
    mod: boolean;
    admin: boolean;
}
export declare type ActionFunc<StoreType> = (store: StoreType) => void;
export declare type Link_Props = {
    onClick?: any;
    style?: any;
    text?: string;
    to?: string;
    target?: string;
    replace?: boolean;
    actionFunc?: ActionFunc<Lib_RootState>;
} & React.HTMLProps<HTMLAnchorElement>;
export declare type User = {
    _key?: string;
    displayName: string;
};
export declare class Manager {
    Populate(data: Omit<Manager, "Populate" | "rootStore">): void;
    GetStore: () => any;
    get rootStore(): any;
    apollo: ApolloClient<NormalizedCacheObject>;
    FormatTime: (time: number, formatStr: string) => string;
    logTypes: LogTypes;
    ShowSignInPopup: () => void;
    GetUserID: () => string | n;
    GetUser: (id: string) => User | n;
    GetUserPermissionGroups: (userID: string) => PermissionGroupSet;
    GetNewURLForStoreChanges: (actionFunc: ActionFunc<Lib_RootState>) => string | null;
    MarkdownRenderer: any;
    actionBarZIndex?: number;
}
export declare const manager: Manager;
export declare let OnPopulated_listeners: any[];
export declare function OnPopulated(listener: () => any): void;
