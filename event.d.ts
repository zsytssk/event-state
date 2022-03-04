declare type Fun<T> = (...params: any[]) => T;
/** 每一个event的数据 */
export declare type EventData = Set<{
    caller: any;
    callback: Fun<any>;
    off: () => void;
    once?: boolean;
}>;
/**
 * 事件订阅发布构造函数
 */
export declare class Event {
    protected parent?: Event | undefined;
    protected events: Map<string, EventData>;
    destroyed: boolean;
    constructor(parent?: Event | undefined);
    /**
     * 注册监听
     * @param event
     * @param callback
     * @param caller
     */
    on(event: string, callback: Fun<any>, caller?: any, once?: boolean): void;
    once(event: string, callback: Fun<any>, caller?: any): void;
    getBind(event: string): EventData | undefined;
    /**
     * 取消监听，如果没有传 callback 或 caller，那么就删除所对应的所有监听
     * @param event
     * @param callback
     * @param caller
     */
    off(event: string, callback: Fun<any>, caller?: any): void;
    offAllCaller(caller: any): void;
    /**
     * 发布消息
     * @param event
     * @param data
     */
    emit(event: string, ...params: any[]): void;
    destroy(): void;
}
export {};
