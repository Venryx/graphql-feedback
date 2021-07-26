/// <reference types="react" />
import { BaseComponent } from "react-vextensions";
import { Proposal } from "../../Store/db/proposals/@Proposal.js";
import { ProposalDetailsUI } from "./Proposal/ProposalDetailsUI.js";
import { n } from "../../Utils/@Internal/Types.js";
export declare type ProposalUI_Props = {
    proposal: Proposal;
    subNavBarWidth?: number;
};
export declare class ProposalUI extends BaseComponent<ProposalUI_Props, {}> {
    static defaultProps: {
        subNavBarWidth: number;
    };
    render(): JSX.Element;
}
declare const ProposalUI_Inner_base: (new (..._: any[]) => BaseComponent<{
    proposal: Proposal;
}, {
    editing: boolean;
    dataError: string | n;
}, unknown>) & {
    renderCount: number;
    lastRenderTime: number;
};
export declare class ProposalUI_Inner extends ProposalUI_Inner_base {
    editorUI: ProposalDetailsUI | n;
    render(): JSX.Element;
}
export {};
