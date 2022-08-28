import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';

export interface BeComposedVirtualProps extends MinimalProxy{
    dispatch: {[key: string]: DispatchInfo}
}

export interface DispatchInfo{
    as: string,
    bubbles: boolean,
    composed: boolean,
    cancelable: boolean,
    stopPropagation: boolean,
}

export interface BeComposedProps extends BeComposedVirtualProps{
    proxy: Element & BeComposedVirtualProps;
}

export interface BeComposedActions{
    onDispatch(self: this): void;
    finale(proxy: Element & BeComposedVirtualProps, target: Element, beDecorProps: BeDecoratedProps): void;
}