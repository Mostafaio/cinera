export class Core {
    htmlSource = '';
    obj: { selector: string, templateUrl: string, styleUrl: string } = {
        selector: '',
        templateUrl: '',
        styleUrl: ''
    };

    constructor() {
    }

    buildComponent(instance: any) {
        var instancePrototype = Object.getPrototypeOf(instance);
        this.obj = instancePrototype.obj;
        var componentHTML = '';
        var path = 'src/' + instancePrototype.mainPath + '/';
        var tempHtmlLoc = path + instancePrototype.obj.templateUrl.replace('./', '');
        return this.getHTMLSource(tempHtmlLoc).then((htmlSource: string) => {
            this.findUndefined(htmlSource, Object.keys(instance));
            // console.log(htmlSource.match(/(?<=\]=").+?(?=\")/g));
            // for (let i = 0; i < Object.keys(instance).length; i++) {
            //     // componentHTML = this.replaceTSVariableInHTML(htmlSource, Object.keys(instance)[i], instance[Object.keys(instance)[i]]);
            //     console.log(Object.keys(instance)[i]);
            //     componentHTML = this.replaceFunctionInHTML(componentHTML, Object.keys(instance), instancePrototype,  Object.keys(instance)[i]);
            // }

            componentHTML = htmlSource;
            // var dd: any = document.createElement('div');
            // dd.innerHTML = componentHTML;
            // console.log(dd);
            // var elem: any = dd.getElementsByTagName("button")[0];
            // console.log(elem);
            // var attrs = elem.attributes;
            // for (var i = 0; i < attrs.length; i++) {
            //     console.error("Name: " + attrs[i].name + " Value: " + attrs[i].value);
            // }


            let htmlVariables: any = componentHTML.match(/\{{(.*?)\}}/g);
            let htmlVariables2: any = componentHTML.match(/(?<=\]=").+?(?=\")/g);
            let htmlVariablesForEvents: any = componentHTML.match(/(?<=\)=").+?(?=\")/g);
            let htmlVariablesForIf: any = componentHTML.match(/(?<=\*ngIf=").+?(?=\")/g);
            // for (let i = 1; i < Object.getOwnPropertyNames(target.prototype).length; i++) {
            var funcVariables = Object.keys(instance).concat(Object.getOwnPropertyNames(instancePrototype));
            if (htmlVariables) {
                for (let i = 0; i < htmlVariables.length; i++) {
                    componentHTML = this.replaceFunctionInHTML(componentHTML, funcVariables, instance, htmlVariables[i], 'interpolation');
                    // const funcValue = target.prototype[Object.getOwnPropertyNames(target.prototype)[i]]();
                    // if (funcValue) {
                    // console.log(instance[Object.keys(instance)[i]]);
                    // }
                    // console.warn();
                }
            }
            // console.log(funcVariables);
            // console.log(htmlVariables2);
            if (htmlVariables2) {
                for (let i = 0; i < htmlVariables2.length; i++) {
                    componentHTML = this.replaceFunctionInHTML(componentHTML, funcVariables, instance, htmlVariables2[i], 'directive');
                    // const funcValue = target.prototype[Object.getOwnPropertyNames(target.prototype)[i]]();
                    // if (funcValue) {
                    // console.log(instance[Object.keys(instance)[i]]);
                    // }
                    // console.warn();
                }
            }
            console.log(htmlVariablesForIf);
            if (htmlVariablesForIf) {
                for (let i = 0; i < htmlVariablesForIf.length; i++) {
                    componentHTML = this.replaceFunctionInHTML(componentHTML, funcVariables, instance, htmlVariablesForIf[i], 'if');
                    // const funcValue = target.prototype[Object.getOwnPropertyNames(target.prototype)[i]]();
                    // if (funcValue) {
                    // console.log(instance[Object.keys(instance)[i]]);
                    // }
                    // console.warn();
                }
            }
            componentHTML = componentHTML.replace(/\[/g, '').replace(/]/g, '');
            // componentHTML = componentHTML.replace('(onclick)', 'onclick');
            componentHTML = componentHTML.replace(new RegExp('\\((.*?)\\">', '\g'), '>');
            this.htmlSource = componentHTML;
            return this.htmlSource;
            // attachHTMLToPage(componentHTML, mainPath, obj.selector);
            // target.prototype.sub.next('havij');
            // subscriber.next('havij');
        });
    }

    setEvents(instance: any) {
        var allTags = document.querySelectorAll('app-login *');
        console.log(allTags);
        allTags[0].addEventListener('click', () => {
            instance['onClickBox']();
        });
        for (let i = 0; i < allTags.length; i++) {
            if (allTags[i].outerHTML.includes(')="')) {
                console.log(i);
                // allTags[i].outerHTML = allTags[i].outerHTML.replace('(onclick)', 'onclick');
                let htmlVariablesForEvents: any = allTags[i].outerHTML.match(/(?<=\)=").+?(?=\")/g);
                console.log(htmlVariablesForEvents[0]);
                allTags[i].addEventListener('click', () => {
                    instance['onClickBox']();
                });
                console.log(allTags[i]);
            }
        }

        // document.getElementsByTagName('button')[1].addEventListener('click', () => {
        //     eval("loginInstance.onClickBox()");
        // });
    }

    replaceFunctionInHTML(htmlSource: string, funcNames: string[], targetPrototype: any, htmlVariable: string, type: string) {
        let funcValue = '';
        var ff = '';
        if (type === 'interpolation') {
            const temp = (htmlVariable.match(/(?<=\{{).+?(?=\}})/g) as any);
            ff = temp;
            if (temp) {
                // ff = (htmlVariable.match(/(?<=\{{).+?(?=\}})/g) as any)[0].replace(/ /g, '');
                ff = (htmlVariable.match(/(?<=\{{).+?(?=\}})/g) as any)[0];
            }
        } else if (type === 'directive') {
            // const temp = (htmlVariable.match(/(?<=\]=").+?(?=\")/g) as any);
            // ff = temp;
            // if (temp) {
            // ff = (htmlVariable.match(/(?<=\{{).+?(?=\}})/g) as any)[0].replace(/ /g, '');
            // ff = (htmlVariable.match(/(?<=\]=").+?(?=\")/g) as any)[0];
            ff = htmlVariable;
            // }
        } else if (type === 'if') {
            // const temp = (htmlVariable.match(/(?<=\]=").+?(?=\")/g) as any);
            // ff = temp;
            // if (temp) {
            // ff = (htmlVariable.match(/(?<=\{{).+?(?=\}})/g) as any)[0].replace(/ /g, '');
            // ff = (htmlVariable.match(/(?<=\]=").+?(?=\")/g) as any)[0];
            ff = htmlVariable;
            // }
        }
        for (let i = 0; i < funcNames.length; i++) {
            ff = ff.replace(funcNames[i], "targetPrototype." + funcNames[i]);
        }
        funcValue = eval(ff);
        return htmlSource.replace(htmlVariable, funcValue);
        // const varToString = (varObj: any) => Object.keys(varObj)[0];
        // const havij = 42;
        // const displayName = varToString({havij});
        // console.log(displayName)
        // var regex = "\{{\\s*" + funcName + "\\((.*?)\\)\\s*}}"; // \s*
        // var currentHTML = html.replace(/\{{(.*?)\}}/g, 'golabi');
        // var currentHTML = html.replace(/\{{name}}/g, 'golabi');
        // console.warn(funcValue);
        // let htmlVariables: any = htmlSource.match(/\{{(.*?)\}}/g);
        // console.log(i);
        // if (htmlVariables.length > 0) {
        // console.log('1111', htmlVariable.replace('{{', '').replace('}}', '').replace(/ /g, ''));
        // var ff = htmlVariable.replace('{{', '').replace('}}', '').replace(/ /g, '');
        // if (ff.includes('(') && ff.includes(')')) {
        //     console.log("targetPrototype." + ff);
        //     funcValue = eval("targetPrototype." + ff);
        // } else {
        //     funcValue = eval(ff);
        // }
        // console.log(ff);
        // if (!isNumeric(ff)) {
        //     funcValue = eval("targetPrototype." + ff);
        // } else {
        //     funcValue = ff;
        // }
        // console.log(htmlSource, ff, funcValue, htmlVariable);
        // var regex = "" + htmlVariable + "\g"; // \s*
        // var regex = "" + htmlVariable + ""; // \s*
        // console.log();
        // }
        // eval(x);
        // console.log(new RegExp(regex));

    }

    replaceTSVariableInHTML(htmlSource: string, variableName: string, variableData: string) {
        const varToString = (varObj: any) => Object.keys(varObj)[0];

        // const havij = 42;
        // const displayName = varToString({havij});
        // console.log(displayName)
        // var currentHTML = html.replace(/\{{(.*?)\}}/g, 'golabi');
        var regex = "\{{\\s*" + variableName + "\\s*}}"; // \s*
        // var currentHTML = html.replace(/\{{name}}/g, 'golabi');
        return htmlSource.replace(new RegExp(regex, "g"), variableData);
    }

    findUndefined(htmlSource: string, variableNames: string[]) {
        var undefinedVariables = [];
        let htmlVariables = htmlSource.match(/\{{(.*?)\}}/g);
        if (!htmlVariables) {
            htmlVariables = [];
        }
        for (let i = 0; i < variableNames.length; i++) {
            var index = htmlVariables.findIndex((v: any) => v === variableNames[i]);
            if (index === -1 && htmlVariables[i]) {
                undefinedVariables.push(htmlVariables[i]);
                // console.error('Error:', htmlVariables[i], 'is undefined');
            }
        }
    }

    getHTMLSource(tempHtmlLoc: string) {
        return fetch(tempHtmlLoc).then((data) => {
            return data.text().then(html => {
                return html;
            });
        });
    }
}
