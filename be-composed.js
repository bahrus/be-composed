import { define } from 'be-decorated/be-decorated.js';
import { register } from 'be-hive/register.js';
export class BeComposed {
    #target;
    #signals = {};
    intro(proxy, target, beDecorProps) {
        this.#target = target;
    }
    onDispatch({ dispatch }) {
        this.disconnect();
        for (const key in dispatch) {
            const c = new AbortController();
            const dispatchInfo = dispatch[key];
            const { as, bubbles, cancelable, composed, stopPropagation } = dispatchInfo;
            this.#target.addEventListener(key, originalEvent => {
                if (stopPropagation)
                    originalEvent.stopPropagation();
                const ce = new CustomEvent(as, {
                    bubbles,
                    cancelable,
                    composed,
                    detail: {
                        ...originalEvent.detail,
                        originalEvent,
                    }
                });
                this.#target.dispatchEvent(ce);
            }, {
                signal: c.signal,
            });
            this.#signals[key] = c;
        }
    }
    disconnect() {
        for (const key in this.#signals) {
            const signal = this.#signals[key];
            signal.abort();
        }
        this.#signals = {};
    }
    finale(proxy, target, beDecorProps) {
        this.disconnect();
        this.#target = undefined;
    }
}
const tagName = 'be-composed';
const ifWantsToBe = 'composed';
const upgrade = '*';
define({
    config: {
        tagName,
        propDefaults: {
            upgrade,
            ifWantsToBe,
            virtualProps: ['dispatch'],
            intro: 'intro',
            finale: 'finale',
        },
        actions: {
            onDispatch: 'dispatch'
        }
    },
    complexPropDefaults: {
        controller: BeComposed
    }
});
register(ifWantsToBe, upgrade, tagName);
