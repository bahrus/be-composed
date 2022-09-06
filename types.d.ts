import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';


export interface EndUserProps {
    dispatch?: {[key: string]: DispatchInfo};
}
export interface VirtualProps extends EndUserProps, MinimalProxy{
    
}

export type Proxy = Element & VirtualProps;

export interface ProxyProps extends VirtualProps{
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


export interface Actions{
    onDispatch(pp: PP): void;
    finale(proxy: Proxy, target: Element, beDecorProps: BeDecoratedProps): void;
}