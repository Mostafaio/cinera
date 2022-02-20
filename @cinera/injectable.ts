import "reflect-metadata";
import {Injector} from "./injector";

export function Injectable(): any {
    return <any>function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        // console.log(Reflect.getMetadata('design:paramtypes', target));
        // const example = Injector.resolve(target);
        return target;
    }
    // @ts-ignore
    // return function(target: { new () }): void {
    //     container._providers[token] = new target();
    //     console.log(container);
    // };
}
