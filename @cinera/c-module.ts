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
        if (document.location.origin + '/' !== location.href && location.href[location.href.length - 1] === '/') {
            // location.href = location.href.substr(0, location.href.length - 1);
            window.history.pushState('page2', 'Title', location.href.substr(0, location.href.length - 1));
        }
        console.log([target]);
        target.obj = obj;
        if (!obj.routes) {
            console.log(1, obj);
            if (obj.bootstrap) {
                console.log(1);
                if (obj.bootstrap.length > 0) {
                    onBootstrap(obj.bootstrap[0], obj, target);
                }
            } else {
            }
        } else {
            target.routes = obj.routes;
            // for (let i = 0; i <target.routes.length; i++) {
            //     if (target.routes[i].path === '') {
            //         console.log([target.routes[i].component]);
            //         console.log(obj);
            //         const aa = document.createElement('p');
            //         aa.innerHTML = '4343';
            //         onAfterBootstrap(target.routes[i].component, obj);
            //     }
            // }
        }
        return target;
    }
}

function onAfterBootstrap(bootstrapComponent: any, mainObj: any, target: any) {
    const instance = Injector.resolve(bootstrapComponent);
    const mainCore = new MainCore();
    mainCore.buildNewComponent(instance, mainObj, null, bootstrapComponent).then((bootstrapHTML) => {
        console.log(bootstrapHTML);
        if (document.getElementsByTagName('router-outlet').length === 0) {
            document.getElementsByTagName('app-root')[0].innerHTML = '<router-outlet></router-outlet>';
        }
        document.getElementsByTagName('router-outlet')[0].replaceWith(bootstrapHTML);
    });
}


function onBootstrap(bootstrapComponent: any, mainObj: any, target: any) {
    const instance = Injector.resolve(bootstrapComponent);
    const mainCore = new MainCore();
    mainCore.buildNewComponent(instance, mainObj).then((bootstrapHTML) => {
        if (mainObj.imports) {
            const routes = mainObj.imports.find((v: any) => v.routes).routes;
            target.routes = routes;
            console.log(routes);
            console.log(mainObj);
            const route = new Route();
            for (let i = 0; i < routes.length; i++) {
                let splitString = route.afterRawUrl;
                splitString = splitString.substr(1, splitString.length);
                console.log(splitString, ' | ', routes[i].path);
                console.log(splitString.split(routes[i].path));
                if (splitString.split(routes[i].path)[0] === '') {
                    if (routes[i].component) {
                        onAfterBootstrap(routes[i].component, mainObj, target);
                    } else {
                        routes[i].loadChildren().then((dd: any) => {
                            dd.previous = 'one';
                            dd.mainPath = routes[i].path;
                            fixModule(dd.obj, target, dd);
                            console.log(dd);
                        });
                    }
                    console.log(routes[i]);
                }
            }
            console.log(routes);
        }
        document.body.appendChild(bootstrapHTML);
    });
}

function fixModule(obj: any, target: any, topModule: any) {
    const routes = obj.imports.find((v: any) => v.routes).routes;
    const route = new Route();
    for (let i = 0; i < routes.length; i++) {
        let splitString = route.afterRawUrl;
        splitString = splitString.replace(topModule.mainPath, '');
        splitString = splitString.replace('//' , '');
        let sentence = '';
        let isFound = false;
        for (let j = 0; j < splitString.length; j++) {
            sentence = sentence + splitString[j];
            if (sentence === routes[i].path || sentence === (routes[i].path === '' ? '/' : routes[i].path)) {
                isFound = true;
            }
        }
        if (isFound) {
            if (routes[i].component) {
                onAfterBootstrap(routes[i].component, obj, target);
            } else {
                routes[i].loadChildren().then((dd: any) => {
                    dd.previous = 'one';
                    dd.mainPath = topModule.mainPath + '/' + routes[i].path;
                    console.log(topModule.mainPath + '/' + routes[i].path);
                    fixModule(dd.obj, target, dd);
                });
            }
        }
    }
}
