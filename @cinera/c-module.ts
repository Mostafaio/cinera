import {Injector} from "./injector";
import {MainCore} from "./main-core";
import {Route} from "./route";

export function CModule(obj: {
    declarations?: any[]
    imports?: any[]
    providers?: any[]
    bootstrap?: any[],
    routes?: any[]
} | any): any {
    return <any>function (target: any) {
        console.log(target);
        if (!obj.routes) {
            console.log(1, obj);

            if (obj.bootstrap) {
                if (obj.bootstrap.length > 0) {
                    onBootstrap(obj.bootstrap[0], obj);
                }
            }
        } else {
            target.routes = obj.routes;
            for (let i = 0; i <target.routes.length; i++) {
                if (target.routes[i].path === '') {
                    console.log(target.routes[i].component);
                    const aa = document.createElement('p');
                    aa.innerHTML = '4343';
                    onAfterBootstrap(target.routes[i].component, obj);
                }
            }
        }
        return target;
    }
}

function onAfterBootstrap(bootstrapComponent: any, mainObj: any) {
    console.log(mainObj);
    const instance = Injector.resolve(bootstrapComponent);
    const mainCore = new MainCore();
    mainCore.buildNewComponent(instance, mainObj).then((bootstrapHTML) => {
        console.log(bootstrapHTML);
        document.getElementsByTagName('router-outlet')[0].replaceWith(bootstrapHTML);
    });
}

function onBootstrap(bootstrapComponent: any, mainObj: any) {
    const instance = Injector.resolve(bootstrapComponent);
    const mainCore = new MainCore();
    mainCore.buildNewComponent(instance, mainObj).then((bootstrapHTML) => {
        if (mainObj.imports) {
            const routes = mainObj.imports.find((v: any) => v.routes).routes;
            const route = new Route();
            for (let i = 0; i < routes.length; i++) {
                if (route.afterRawUrl === routes[i].path) {
                    routes[i].loadChildren().then((dd: any) => {
                        console.log([dd]);
                    });
                    console.log(routes[i]);
                }
            }
            console.log(routes);
        }
        document.body.appendChild(bootstrapHTML);
    });
}
