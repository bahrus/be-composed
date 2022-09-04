import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';


export interface BeComposedEndUserProps {
    dispatch?: {[key: string]: DispatchInfo};
}
export interface BeComposedVirtualProps extends BeComposedEndUserProps, MinimalProxy{
    
}

export type Proxy = Element & BeComposedVirtualProps;

export interface ProxyProps extends BeComposedVirtualProps{
    proxy: Proxy;
}

export type PP = ProxyProps;

export interface DispatchInfo{
    as: string,
    bubbles: boolean,
    composed: boolean,
    cancelable: boolean,
    stopPropagation: boolean,
}


export interface BeComposedActions{
    onDispatch(pp: PP): void;
    finale(proxy: Proxy, target: Element, beDecorProps: BeDecoratedProps): void;
}