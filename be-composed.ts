import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import { BeComposedActions, BeComposedProps, BeComposedVirtualProps, DispatchInfo } from './types';
import {register} from 'be-hive/register.js';

export class BeComposed implements BeComposedActions{
    #target!: Element | undefined;
    #signals: {[key: string]: AbortController} = {};
    intro(proxy: Element & BeComposedVirtualProps, target: Element, beDecorProps: BeDecoratedProps){
        this.#target = target;
    }
    onDispatch({dispatch}: this): void {
        this.disconnect();
        for(const key in dispatch){
            const c = new AbortController();
            const dispatchInfo = dispatch[key];
            const {as, bubbles, cancelable, composed, stopPropagation} = dispatchInfo;
            this.#target!.addEventListener(key, originalEvent => {
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
                this.#target!.dispatchEvent(ce);
            }, {
                signal: c.signal,
            });
            this.#signals[key] = c;
        }
    }
    disconnect(){
        for(const key in this.#signals){
            const signal = this.#signals[key];
            signal.abort();
        }
        this.#signals = {};
    }
    finale(proxy: Element & BeComposedVirtualProps, target: Element, beDecorProps: BeDecoratedProps){
        this.disconnect();
        this.#target = undefined;
    }
}

export interface BeComposed extends BeComposedProps{}

const tagName = 'be-composed';

const ifWantsToBe = 'composed';

const upgrade = '*';

define<BeComposedProps & BeDecoratedProps<BeComposedProps, BeComposedActions>, BeComposedActions>({
    config:{
        tagName,
        propDefaults:{
            upgrade,
            ifWantsToBe,
            virtualProps:['dispatch'],
            intro: 'intro',
            finale: 'finale',

        },
        actions:{
            onDispatch: 'dispatch'
        }
    },
    complexPropDefaults:{
        controller: BeComposed
    }
});

register(ifWantsToBe, upgrade, tagName);