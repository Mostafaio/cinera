export class Core {
    htmlSource = '';
    obj: { selector: string, templateUrl: string, styleUrl: string } = {
        selector: '',
        templateUrl: '',
        styleUrl: ''
    };
    tags: { tag: any, xpath: string, tagAfterEval: any }[] = [];
    mainElement: any;


    constructor() {
    }

    updateTags(instance: any) {
        var instancePrototype = Object.getPrototypeOf(instance);
        // console.log(this.mainElement);
        // console.log(this.tags);
        // console.log(instance.imageSource);
        // console.log(instance);
        // this.tags[2].tagAfterEval.innerHTML = 3333;
        for (let i = 0; i < this.tags.length; i++) {
            const currentTag = this.tags[i].tag.cloneNode(true);
            var tagAttributes = currentTag.attributes;
            var funcVariables = Object.keys(instance).concat(Object.getOwnPropertyNames(instancePrototype));
            const newTag = this.getTagAfterEval(tagAttributes, currentTag, funcVariables, instance).cTag;
            // console.log(newTag);
            // console.log(newTag, this.tags[i].tagAfterEval, JSON.stringify(newTag) === JSON.stringify(this.tags[i].tagAfterEval));+
            if (newTag) {
                // console.log(newTag, this.tags[i].tagAfterEval);
                if (!this.tags[i].tagAfterEval.isEqualNode(newTag)) {
                    this.tags[i].tagAfterEval.replaceWith(newTag);
                    this.tags[i].tagAfterEval = newTag;
                    // console.log(this.tags[i].tagAfterEval);
                }
                // console.log(this.tags[i].tagAfterEval.isEqualNode(newTag));
            }
            // console.log(this.tags[i]);
            // console.log(newTag, this.tags[i]);
            // if (!newTag) {
            //     tags[i].remove();
            // } else {
            //     tags[i].replaceWith(newTag);
            // }
        }

    }

    buildNewComponent(instance: any) {
        var instancePrototype = Object.getPrototypeOf(instance);
        this.obj = instancePrototype.obj;
        var componentHTML = '';
        var path = 'src/' + instancePrototype.mainPath + '/';
        var tempHtmlLoc = path + instancePrototype.obj.templateUrl.replace('./', '');
        return this.getHTMLSource(tempHtmlLoc).then((htmlSource: string) => {
            var mainElement = document.createElement(instancePrototype.obj.selector);
            mainElement.innerHTML = htmlSource;
            var funcVariables = Object.keys(instance).concat(Object.getOwnPropertyNames(instancePrototype));
            var tags = mainElement.getElementsByTagName('*');
            // console.log(tags[i].attributes);
            for (let i = 0; i < tags.length; i++) {
                const currentTag = tags[i].cloneNode(true);
                var tagAttributes = currentTag.attributes;
                const afterEval = this.getTagAfterEval(tagAttributes, currentTag, funcVariables, instance);
                if (afterEval.isTarget) {
                    const newTag = afterEval.cTag;
                    this.tags.push({
                        tag: tags[i].cloneNode(true),
                        xpath: this.getXPathForElement(tags[i], mainElement),
                        tagAfterEval: newTag
                    });
                    // console.log(newTag);
                    // console.log(tags[i]);
                    if (!newTag) {
                        tags[i].remove();
                    } else {
                        tags[i].replaceWith(newTag);
                    }
                }
            }
            this.mainElement = mainElement;
            // console.log(this.tags);
            return mainElement;
        });
    }

    getTagAfterEval(tagAttributes: any, currentTag: any, funcVariables: string[], instance: any) {
        var isTarget = false;
        if (tagAttributes.length > 0) {
            for (let j = 0; j < tagAttributes.length; j++) {

                // directives with brackets []
                if (tagAttributes[j].nodeName.match(/\[.*?\]/)) {
                    isTarget = true;
                    var hh = tagAttributes[j].value;

                    const valSplit = hh.split(';');
                    var value = '';
                    for (let i = 0; i < valSplit.length; i++) {
                        var dd = valSplit[i].split('(');
                        if (dd.length > 1) {
                            dd[1] = dd[1].substr(0, dd[1].length - 1);
                            value = instance[dd[0]].apply(instance, dd[1].split(','));
                        } else {
                            value = instance[valSplit[i]];
                        }
                    }
                    // console.log( window[instance[]]);
                    // for (let k = 0; k < funcVariables.length; k++) {
                    //     hh = hh.replace(funcVariables[k], "instance." + funcVariables[k]);
                    // }
                    // var a = 'aTag';
                    // console.log(instance[a]);
                    // var value = eval(hh);
                    currentTag.setAttribute(tagAttributes[j].nodeName.match(/(?<=\[).+?(?=\])/), value);
                    currentTag.removeAttribute(tagAttributes[j].nodeName);
                }

                // events with ()
                if (tagAttributes[j].nodeName.match(/\(.*?\)/)) {
                    isTarget = true;
                    // this.getHavij(tagAttributes, j, funcVariables, currentTag, instance);
                    var gg = tagAttributes[j].value;
                    var eventName = tagAttributes[j].nodeName.match(/(?<=\().+?(?=\))/);

                    // for (let k = 0; k < funcVariables.length; k++) {
                    //     gg = gg.replace(funcVariables[k], "instance." + funcVariables[k]);
                    // }
                    const valSplit = gg.split(';');
                    var value = '';
                    currentTag.addEventListener(eventName, () => {
                        // eval(gg);
                        for (let i = 0; i < valSplit.length; i++) {
                            var dd = valSplit[i].split('(');
                            if (dd.length > 1) {
                                // @ts-ignore
                                var ggf = valSplit[i].match(/(?<=\().+?(?=\))/g);
                                if (ggf) {
                                    ggf = ggf[0].split(',');
                                    for (let b = 0; b < ggf.length; b++) {
                                        if (this.isJson(ggf[b])) {
                                            ggf[b] = JSON.parse(ggf[b].toLowerCase());
                                        }
                                        console.log(typeof ggf[b]);
                                    }
                                }

                                instance[dd[0]].apply(instance, ggf);
                                console.log(instance[dd[0]].apply(instance, ggf));
                            } else {
                                console.log(valSplit[i].split('='));
                                var valsplt = valSplit[i].split('=');
                                console.log(valsplt);
                                // instance[valsplt[0]] = Function("return " + valSplit[i].match(/\s*=\s*(.*)/)[0].replace('=', ''))(); // which is same as "return 2+4"
                                instance[valsplt[0].replace(/ /g, '')] = Function("return " + valsplt[1])(); // which is same as "return 2+4"
                            }
                        }
                        console.log(instance);
                        // Function('"use strict";return (' + gg + ')')();
                        // console.log(instance.aTag);
                        // console.log(gg);
                    });
                }

                // *ngIf
                // if (tagAttributes[j].nodeName.match(/\B\*ngi\w+/)) {
                //     isTarget = true;
                //     // console.log(tagAttributes[j].value);
                //     var ff = tagAttributes[j].value;
                //     for (let k = 0; k < funcVariables.length; k++) {
                //         ff = ff.replace(funcVariables[k], "instance." + funcVariables[k]);
                //     }
                //     var value = eval(ff);
                //     // var value = Function('"use strict";return (' + ff + ')')();
                //     if (!value) {
                //         currentTag = value;
                //         // currentTag.remove();
                //     }
                //
                // }
            }
        }

        return {cTag: currentTag, isTarget: isTarget};
    }

    isJson(str: any) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    getXPathForElement(el: any, xml: any) {
        var xpath = '';
        var pos, tempitem2;

        while (el !== xml) {
            pos = -1;
            tempitem2 = el;
            while (tempitem2) {
                if (tempitem2.nodeType === 1 && tempitem2.nodeName === el.nodeName) { // If it is ELEMENT_NODE of the same name
                    pos += 1;
                }
                tempitem2 = tempitem2.previousSibling;
            }

            if (pos === 0) {
                xpath = el.nodeName + '/' + xpath;

            } else {
                xpath = el.nodeName + "[" + pos + ']' + '/' + xpath;
            }

            el = el.parentNode;
        }
        xpath = '[' + xml.nodeName + "']" + '/' + xpath;
        xpath = xpath.replace(/\/$/, '');
        return xpath.toLocaleLowerCase();
    }

    getHavij(tagAttributes: any, j: any, funcVariables: any, currentTag: any, instance: any) {

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
            // console.log(componentHTML);
            // var elem: any = dd.getElementsByTagName("*");
            // console.log(elem);
            // var attrs = elem[0].attributes;
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
