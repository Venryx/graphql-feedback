import { Column } from "react-vcomponents";
import { BaseComponent } from "react-vextensions";
import { Proposal } from "../../Store/db/proposals/@Proposal.js";
import { DragInfo } from "../../Utils/UI/DNDHelpers.js";
import { n } from "../../Utils/@Internal/Types.js";
export declare type ProposalEntryUI_Props = {
    index: number;
    last: boolean;
    proposal: Proposal;
    orderIndex?: number;
    rankingScore?: number;
    columnType: string;
    style?: any;
} & {
    dragInfo?: DragInfo;
};
declare const ProposalEntryUI_base: (new (..._: any[]) => BaseComponent<ProposalEntryUI_Props, {}, object>) & {
    renderCount: number;
    lastRenderTime: number;
};
export declare class ProposalEntryUI extends ProposalEntryUI_base {
    innerRoot: Column | n;
    render(): any;
}
export {};
