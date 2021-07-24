import { GetErrorMessagesUnderElement, Clone, E } from "js-vextensions";
import React from "react";
import { Column, Pre, Row, RowLR, TextInput } from "react-vcomponents";
import { BaseComponent, GetDOM } from "react-vextensions";
import { MarkdownEditor, MarkdownToolbar } from "react-vmarkdown";
import { ShowMessageBox } from "react-vmessagebox";
import { AddProposal } from "../../../Server/Commands/AddProposal.js";
import { Proposal } from "../../../Store/db/proposals/@Proposal.js";
import { store } from "../../../Store/index.js";
import { graph } from "../../../Utils/Database/MobXGraphlink.js";
import { Link } from "../../../Utils/ReactComponents/Link.js";
import { RunInAction } from "../../../Utils/General/General.js";
let aa = { MarkdownEditor };
let MTName = "Proposal";
export class ProposalDetailsUI extends BaseComponent {
    ComponentWillMountOrReceiveProps(props, forMount) {
        if (forMount || props.baseData != this.props.baseData) { // if base-data changed
            this.SetState({ newData: Clone(props.baseData) });
        }
    }
    render() {
        let { forNew, enabled, style, onChange } = this.props;
        let { newData } = this.state;
        let Change = _ => {
            if (onChange)
                onChange(this.GetNewData(), this);
            this.Update();
        };
        let splitAt = 50;
        return (React.createElement(Column, { style: E({ width: "100%", style }) },
            React.createElement(RowLR, { splitAt: splitAt },
                React.createElement(Pre, null, "Title: "),
                React.createElement(TextInput, { required: true, enabled: enabled, style: { width: "100%" }, value: newData.title, onChange: val => Change(newData.title = val) })),
            React.createElement(Row, { mt: 5 }, "Text:"),
            React.createElement(Row, { mt: 5 },
                React.createElement(Column, { style: { width: "100%" } },
                    enabled &&
                        React.createElement(MarkdownToolbar, { editor: () => this.refs.editor },
                            React.createElement(Link, { to: "https://guides.github.com/features/mastering-markdown", style: { marginLeft: 10 } }, "How to add links, images, etc.")),
                    React.createElement(aa.MarkdownEditor, { ref: "editor", toolbar: false, value: newData.text || "", onChange: val => Change(newData.text = val), options: E({
                            scrollbarStyle: "overlay",
                            lineWrapping: true,
                            readOnly: !enabled,
                            placeholder: "Write your reply...",
                        }) })))));
    }
    GetValidationError() {
        return GetErrorMessagesUnderElement(GetDOM(this))[0];
    }
    GetNewData() {
        let { newData } = this.state;
        return Clone(newData);
    }
}
Object.defineProperty(ProposalDetailsUI, "defaultProps", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: { enabled: true }
});
export function ShowAddProposalDialog(userID, type) {
    let newEntry = new Proposal({ type });
    let detailsUI;
    let error = null;
    let Change = (..._) => boxController.UpdateUI();
    let boxController = ShowMessageBox({
        title: type == "feature" ? "Propose feature" : "Report issue", cancelButton: true,
        message: () => {
            boxController.options.okButtonProps = { enabled: error == null, title: error };
            return (React.createElement(Column, { style: { width: 600 } },
                React.createElement(ProposalDetailsUI, { ref: c => detailsUI = c, baseData: newEntry, forNew: true, onChange: val => Change(newEntry = val, error = detailsUI.GetValidationError()) }),
                error && error != "Please fill out this field." && React.createElement(Row, { mt: 5, style: { color: "rgba(200,70,70,1)" } }, error)));
        },
        onOK: async () => {
            let { id } = await new AddProposal({ graph }, { data: newEntry }).RunOnServer();
            RunInAction("ShowAddProposalDialog.onOK", () => store.main.proposals.selectedProposalID = id);
        }
    });
}
