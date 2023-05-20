import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { XE } from 'xtal-element/XE.js';
import { register } from 'be-hive/register.js';
export class BeComposed extends BE {
    static get beConfig() {
        return {
            parse: true,
        };
    }
    #signals = {};
    onDispatch(self) {
        const { dispatch, enhancedElement } = self;
        this.disconnect();
        for (const key in dispatch) {
            const c = new AbortController();
            const dispatchInfo = dispatch[key];
            const { as, bubbles, cancelable, composed, stopPropagation } = dispatchInfo;
            enhancedElement.addEventListener(key, originalEvent => {
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
                enhancedElement.dispatchEvent(ce);
            }, {
                signal: c.signal,
            });
            this.#signals[key] = c;
        }
        return {
            resolved: true
        };
    }
    disconnect() {
        for (const key in this.#signals) {
            const signal = this.#signals[key];
            signal.abort();
        }
        this.#signals = {};
    }
    detach(detachedElement) {
        this.disconnect();
    }
}
const tagName = 'be-composed';
const ifWantsToBe = 'composed';
const upgrade = '*';
const xe = new XE({
    config: {
        tagName,
        propDefaults: {
            ...propDefaults,
        },
        propInfo: {
            ...propInfo
        },
        actions: {
            onDispatch: 'dispatch'
        }
    },
    superclass: BeComposed
});
register(ifWantsToBe, upgrade, tagName);
