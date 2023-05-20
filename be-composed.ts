import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP, POA, ProPOA} from './types';
import {register} from 'be-hive/register.js';

export class BeComposed extends BE<AP, Actions> implements Actions{

    static  override get beConfig(){
        return {
            parse: true,
        } as BEConfig
    }

    #signals: {[key: string]: AbortController} = {};
    onDispatch(self: this): PAP {
        const {dispatch, enhancedElement} = self;
        this.disconnect();
        for(const key in dispatch){
            const c = new AbortController();
            const dispatchInfo = dispatch[key];
            const {as, bubbles, cancelable, composed, stopPropagation} = dispatchInfo;
            enhancedElement.addEventListener(key, originalEvent => {
                if(stopPropagation) originalEvent.stopPropagation();
                const ce = new CustomEvent(as, {
                    bubbles,
                    cancelable,
                    composed,
                    detail:{
                        ...(originalEvent as any).detail,
                        originalEvent,
                    }
                });
                enhancedElement.dispatchEvent(ce);
            }, {
                signal: c.signal,
            });
            this.#signals[key] = c;
        }
        return {
            resolved: true
        }
    }

    disconnect(){
        for(const key in this.#signals){
            const signal = this.#signals[key];
            signal.abort();
        }
        this.#signals = {};
    }

    override detach(detachedElement: Element): void {
        this.disconnect();
    }
}

export interface BeComposed extends AP{}

const tagName = 'be-composed';
const ifWantsToBe = 'composed';
const upgrade = '*';

const xe = new XE<AP, Actions>({
    config: {
        tagName,
        propDefaults: {
            ...propDefaults,
        },
        propInfo: {
            ...propInfo
        },
        actions:{
            onDispatch: 'dispatch'
        }
    },
    superclass: BeComposed
});

register(ifWantsToBe, upgrade, tagName);