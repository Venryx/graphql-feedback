import {VURL, Assert, GetCurrentURLString, Clone} from "js-vextensions";
import React from "react";
import {BaseComponent, FilterOutUnrecognizedProps, BaseComponentPlus} from "react-vextensions";
import {runInAction} from "mobx";
import {Lib_RootState, store} from "../../Store";
import {manager} from "../../Manager";
import {RunInAction} from "../General/General.js";

export function GetCurrentURL() {
	return VURL.Parse(GetCurrentURLString());
}

function isModifiedEvent(event) {
	return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

export type ActionFunc<StoreType> = (store: StoreType)=>void;

export type Link_Props = {
	onClick?, style?,
	text?: string, to?: string, target?: string, replace?: boolean, // url-based
	//actions?: (dispatch: Function)=>void,
	actionFunc?: ActionFunc<Lib_RootState>, // new approach, for mobx/mst store
	//updateURLOnActions?: boolean, // action-based
} & Omit<React.HTMLProps<HTMLAnchorElement>, "href">;
export class Link extends BaseComponentPlus({} as Link_Props, {}) {
	static ValidateProps(props: Link_Props) {
		/*const {actionFunc, to} = props;
		Assert(actionFunc != null || to != null, `Must supply the Link component with either an "actionFunc" or "to" property.`);*/
		Assert("actionFunc" in props || "to" in props, `Must supply the Link component with either an "actionFunc" or "to" property.`);
	}

	handleClick(event) {
		const {onClick, to, target, replace: replaceURL, actionFunc} = this.props;
		if (onClick) onClick(event);

		if (event.defaultPrevented) return; // onClick prevented default
		if (event.button !== 0) return; // ignore right clicks
		if (isModifiedEvent(event)) return; // ignore clicks with modifier keys

		if (actionFunc != null) {
			event.preventDefault();
			RunInAction("Link.handleClick", ()=>actionFunc(store));
		} else if (to != null) {
			const isExternalOrNewTab = VURL.Parse(to, true).domain != GetCurrentURL().domain;
			if (isExternalOrNewTab || target) return; // let browser handle external or new-tab links

			event.preventDefault();
			//manager.store.dispatch(replaceURL ? replace(to) : push(to));
			if (replaceURL) {
				history.replaceState(null, null, to);
			} else {
				history.pushState(null, null, to);
			}
		}
	}

	render() {
		let {text, actionFunc, to, target, children, ...rest} = this.props;

		if (actionFunc) {
			//const newState = produce(manager.store, draft=>{
			/*const newState = produce(Clone(store), draft=>{
				actionFunc(draft);
			});
			//let newURL = UsingRootState(newState, ()=>manager.GetNewURL());
			const newURL = WithStore(newState, ()=>manager.GetNewURL());
			//const newURL = manager.GetNewURL.WS(newState)();
			to = newURL.toString();*/
			to = manager.GetNewURLForStoreChanges(actionFunc);
		}

		//if (manager.prodEnv && to == null) return; // defensive
		//const href = this.context.router.history.createHref(typeof to === 'string' ? {pathname: to} : to)

		// if external link (and target not specified), set target to "_blank", causing it to open in new tab
		const isExternal = to && VURL.Parse(to, true).domain != GetCurrentURL().domain;
		const target_final = isExternal && target === undefined ? "_blank" : target;

		return (
			<a {...FilterOutUnrecognizedProps(rest, "a")} onClick={this.handleClick.bind(this)} href={to} target={target_final}>
				{text}
				{children}
			</a>
		);
	}

	// add proxy, since using Radium
	/*setState(newState, callback?) {
		return this.SetState(newState, callback);
	}*/
}
//Link.prototype.setState = function(newState, callback?) { return this.SetState(newState, callback); }; // add proxy, since using Radium