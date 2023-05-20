import { ActionOnEventConfigs } from "trans-render/froop/types";
import {IBE} from 'be-enhanced/types';

export interface EndUserProps extends IBE {
    dispatch?: {[key: string]: DispatchInfo};
}
export interface AllProps extends EndUserProps{
    
}

export type AP = AllProps;

export type PAP = Partial<AP>;

export type ProPAP = Promise<PAP>;

export type POA = [PAP | undefined, ActionOnEventConfigs<PAP, Actions>]

export type ProPOA = Promise<POA | undefined>;

export interface DispatchInfo{
    as: string,
    bubbles: boolean,
    composed: boolean,
    cancelable: boolean,
    stopPropagation: boolean,
}


export interface Actions{
    onDispatch(self: this): PAP;
}