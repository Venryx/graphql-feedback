import { VURL, Assert, GetCurrentURLString } from "js-vextensions";
import React from "react";
import { FilterOutUnrecognizedProps, BaseComponentPlus } from "react-vextensions";
import { store } from "../../Store/index.js";
import { manager } from "../../Manager.js";
import { RunInAction } from "../General/General.js";
export function GetCurrentURL() {
    return VURL.Parse(GetCurrentURLString());
}
function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
export class Link extends BaseComponentPlus({}, {}) {
    static ValidateProps(props) {
        /*const {actionFunc, to} = props;
        Assert(actionFunc != null || to != null, `Must supply the Link component with either an "actionFunc" or "to" property.`);*/
        Assert("actionFunc" in props || "to" in props, `Must supply the Link component with either an "actionFunc" or "to" property.`);
    }
    handleClick(event) {
        const { onClick, to, target, replace: replaceURL, actionFunc } = this.props;
        if (onClick)
            onClick(event);
        if (event.defaultPrevented)
            return; // onClick prevented default
        if (event.button !== 0)
            return; // ignore right clicks
        if (isModifiedEvent(event))
            return; // ignore clicks with modifier keys
        if (actionFunc != null) {
            event.preventDefault();
            RunInAction("Link.handleClick", () => actionFunc(store));
        }
        else if (to != null) {
            const isExternalOrNewTab = VURL.Parse(to, true).domain != GetCurrentURL().domain;
            if (isExternalOrNewTab || target)
                return; // let browser handle external or new-tab links
            event.preventDefault();
            //manager.store.dispatch(replaceURL ? replace(to) : push(to));
            if (replaceURL) {
                history.replaceState(null, null, to);
            }
            else {
                history.pushState(null, null, to);
            }
        }
    }
    render() {
        var _a;
        let { text, actionFunc, to, target, children, ...rest } = this.props;
        if (actionFunc) {
            //const newState = produce(manager.store, draft=>{
            /*const newState = produce(Clone(store), draft=>{
                actionFunc(draft);
            });
            //let newURL = UsingRootState(newState, ()=>manager.GetNewURL());
            const newURL = WithStore(newState, ()=>manager.GetNewURL());
            //const newURL = manager.GetNewURL.WS(newState)();
            to = newURL.toString();*/
            to = (_a = manager.GetNewURLForStoreChanges(actionFunc)) !== null && _a !== void 0 ? _a : undefined;
        }
        //if (manager.prodEnv && to == null) return; // defensive
        //const href = this.context.router.history.createHref(typeof to === 'string' ? {pathname: to} : to)
        // if external link (and target not specified), set target to "_blank", causing it to open in new tab
        const isExternal = to && VURL.Parse(to, true).domain != GetCurrentURL().domain;
        const target_final = isExternal && target === undefined ? "_blank" : target;
        return (React.createElement("a", { ...FilterOutUnrecognizedProps(rest, "a"), onClick: this.handleClick.bind(this), href: to, target: target_final },
            text,
            children));
    }
}
//Link.prototype.setState = function(newState, callback?) { return this.SetState(newState, callback); }; // add proxy, since using Radium
