import {Handler} from "./handler";

export class MainCore {
    tags: { org: any, current: any, changes: any[], invVariables: [], invFunctions: [], arr?: any[], parent?: any }[] = [];
    instance: any;
    mainElement: any;
    comments: any = [];
    testoli: any;
    classFunctions: any;
    classVariables: any;
    declarations: any;
    name = 'comp_';
    mainClass: any;

    constructor() {
        this.name = this.name + Math.round(Math.random() * 10000);
        // super(props);

    }

    buildNewComponent(instance: any, moduleObject: any, mainTag: any = null, mainClass: any = null) {
        this.mainClass = mainClass;
        this.instance = instance;
        console.log(this.instance);
        console.log(moduleObject);
        this.declarations = moduleObject.declarations;
        var instancePrototype = Object.getPrototypeOf(instance);
        var path = 'src/' + instancePrototype.mainPath + '/';
        if (instancePrototype.mainPath === 'app') {
            path = 'src/';
        }
        var tempHtmlLoc = path + instancePrototype.obj.templateUrl.replace('./', '');
        tempHtmlLoc = __dirname + tempHtmlLoc;
        var tempCSSLoc = path + instancePrototype.obj.styleUrl.replace('./', '');
        tempCSSLoc = __dirname + tempCSSLoc;
        var classFunctions = Object.getOwnPropertyNames(instancePrototype);
        var classVariables = Object.keys(instance);
        this.classFunctions = classFunctions;
        this.classVariables = classVariables;
        var classFuncVars = classVariables.concat(classFunctions);
        if (moduleObject.bootstrap) {
            if (moduleObject.bootstrap.length > 0) {
                this.name = 'comp_app';
            }
        }
        // @ts-ignore
        window[this.name] = {
            variables: {},
            functions: {},
            instance: this.instance
        };
        for (let i = 0; i < classVariables.length; i++) {
            // @ts-ignore
            // console.log(window['aobj']);
            // @ts-ignore
            window[this.name].variables[classVariables[i]] = this.instance[classVariables[i]];
        }
        for (let i = 1; i < classFunctions.length; i++) {
            // instance[dd[0]].apply(instance, dd[1].split(','))
            // @ts-ignore
            window[this.name].functions[classFunctions[i]] = (a, b, c, d, f, g, h, j, k, l) => {
                return this.instance[classFunctions[i]](a, b, c, d, f, g, h, j, k, l);
            };
        }
        // @ts-ignore
        for (let m = 0; m < classVariables.length; m++) {
            var ingg = instance[classVariables[m]];
            if (typeof ingg === 'object') {
                if (ingg.length) {
                    ingg = ingg.slice();
                } else {
                    ingg = Object.assign({}, ingg);
                }
            }
            var changes = this.changeDetection(ingg, classVariables[m]);
        }
        // for (let m = 0; m < classFunctions.length; m++) {
        // @ts-ignore
        // this.tags[m].invFunctions.push(classFunctions[m]);
        // console.log(this.tags[m].invFunctions.push);
        var value = '';
        // var dd = split[k].split('(');
        // if (dd.length > 1) {
        //     dd[1] = dd[1].substr(0, dd[1].length - 1);
        //     value = instance[dd[0]].apply(instance, dd[1].split(','));
        // } else {
        //     value = instance[split[k]];
        // }
        // var ingg = instance[dd[0]].apply(instance, dd[1].split(','));
        // if (typeof ingg === 'object') {
        //     ingg = ingg.slice();
        // }
        // var changes = this.changeFunctionDetection(ingg, dd[0], dd[1]);
        // this.tags[i].changes.push(changes);
        // }

        // this.instance.havij = '5';
        // console.log(classFunctions);
        this.getHTMLSource(tempCSSLoc).then((cssSource: string) => {
            const style = document.createElement('style');
            document.head.appendChild(style);
            style.type = 'text/css';
            style.innerHTML = cssSource;

        });
        // console.log(classVariables);
        return this.getHTMLSource(tempHtmlLoc).then((htmlSource: string) => {

            if (mainTag) {
                mainTag.current.innerHTMl = htmlSource;
                mainTag.org.innerHTMl = htmlSource;
                mainTag.current.innerHTML = htmlSource;
                this.mainElement = mainTag.current;
                mainElement = mainTag.current;
            } else {
                var mainElement = document.createElement(instancePrototype.obj.selector);
                mainElement.innerHTML = htmlSource;
                this.mainElement = mainElement;
            }
            var children = [];
            var children2 = [];
            var tempTags = mainElement.getElementsByTagName('*');
            for (let i = 0; i < tempTags.length; i++) {
                if (tempTags[i].nodeType !== 3) {
                    children.push(tempTags[i]);
                    children2.push(i);
                }
            }
            for (let i = 0; i < children.length; i++) {
                children[i].uniqId = Math.random() * 10000;
                this.tags.push({
                    org: children[i].cloneNode(true),
                    current: children[i],
                    changes: [],
                    invVariables: [],
                    invFunctions: []
                });
                let htmlVariables: any = children[i].innerHTML.match(/\{{(.*?)\}}/g);
                if (htmlVariables) {
                    const split = htmlVariables[0].split(';');
                    for (let k = 0; k < split.length; k++) {
                        const perSplit = split[k].split('(');
                        if (perSplit.length > 1) {
                            for (let m = 0; m < classFunctions.length; m++) {
                                perSplit[0] = perSplit[0].replace('!', '');
                                perSplit[0] = perSplit[0].replace('+', '');
                                if (perSplit[0].includes(classFunctions[m])) {
                                    // @ts-ignore
                                    this.tags[i].invFunctions.push(classFunctions[m]);
                                }
                            }
                        } else {
                            const varSplit = split[k].split(' =');
                            for (let m = 0; m < classVariables.length; m++) {
                                varSplit[0] = varSplit[0].replace('!', '');
                                varSplit[0] = varSplit[0].replace('+', '');
                                if (varSplit[0].includes(classVariables[m])) {
                                    // @ts-ignore
                                    this.tags[i].invVariables.push(classVariables[m]);
                                }
                            }
                        }
                    }
                }
                // if (htmlVariables) {
                //     for (let m = 0; m < classVariables.length; m++) {
                //         // @ts-ignore
                //         this.tags[i].invVariables.push(classVariables[m]);
                //     }
                // }
                for (let j = 0; j < children[i].attributes.length; j++) {
                    if (this.tags[i].org.attributes[j]) {
                        if (!this.tags[i].org.attributes[j].nodeName.match(/\(.*?\)/)) {
                            const split = children[i].attributes[j].value.split(';');
                            for (let k = 0; k < split.length; k++) {
                                const perSplit = split[k].split('(');
                                if (perSplit.length > 1) {
                                    for (let m = 0; m < classFunctions.length; m++) {
                                        perSplit[0] = perSplit[0].replace('!', '');
                                        perSplit[0] = perSplit[0].replace('+', '');
                                        if (perSplit[0] === classFunctions[m]) {
                                            // @ts-ignore
                                            this.tags[i].invFunctions.push(classFunctions[m]);
                                            var value = '';
                                            var dd = split[k].split('(');
                                            if (dd.length > 1) {
                                                dd[1] = dd[1].substr(0, dd[1].length - 1);
                                                value = instance[dd[0]].apply(instance, dd[1].split(','));
                                            } else {
                                                value = instance[split[k]];
                                            }
                                            var ingg = instance[dd[0]].apply(instance, dd[1].split(','));
                                            if (typeof ingg === 'object') {
                                                ingg = ingg.slice();
                                            }
                                            var changes = this.changeFunctionDetection(ingg, dd[0], dd[1]);
                                            this.tags[i].changes.push(changes);
                                        }
                                    }
                                } else {
                                    const varSplit = split[k].split(' =');
                                    for (let m = 0; m < classVariables.length; m++) {
                                        varSplit[0] = varSplit[0].replace('!', '');
                                        varSplit[0] = varSplit[0].replace('+', '');
                                        if (varSplit[0] === classVariables[m]) {
                                            // @ts-ignore
                                            this.tags[i].invVariables.push(classVariables[m]);
                                            var ingg = instance[classVariables[m]];
                                            if (typeof ingg === 'object') {
                                                if (ingg.length) {
                                                    ingg = ingg.slice();
                                                } else {
                                                    ingg = Object.assign({}, ingg);
                                                }
                                            }
                                            // console.log(this.tags[i]);
                                            // var changes = this.changeDetection(ingg, classVariables[m]);
                                            this.tags[i].changes.push(changes);
                                        }
                                    }
                                }
                            }
                        }

                    }
                }
            }
            for (let i = 0; i < children.length; i++) {
                this.updateTag(i);
            }
            // console.log(this.tags);
            return this.mainElement;
        });
    }

    changeFunctionDetection(oldValue: any, functionName: any, args: any) {
        if (oldValue) {
            let refreshIntervalId = setInterval(() => {
                // @ts-ignore
                if (!window[this.name]) {
                    // @ts-ignore
                    delete this;
                    clearInterval(refreshIntervalId);
                    return;
                }
                let obj2 = this.instance[functionName].apply(this.instance, args.split(','));
                // obj2 = this.instance[variableName];
                if (JSON.stringify(obj2) !== JSON.stringify(oldValue)) {
                    // console.log(oldValue, obj2);
                    var tags = [];
                    // for (let i = 0; i < this.mainElement.childNodes.length; i++) {
                    //     if (this.mainElement.childNodes[i].nodeType !== 3) {
                    //         tags.push(this.mainElement.childNodes[i]);
                    //     }
                    // }
                    oldValue = obj2;
                    for (let i = 0; i < this.tags.length; i++) {
                        var founds = this.tags[i].invFunctions.filter((v: any) => v === functionName);
                        if (founds.length > 0) {
                            this.updateTag(i);
                        }
                    }
                }
            }, 50);
        }
    }

    changeDetection(oldValue: any, varName: string) {
        // if (oldValue) {
        let refreshIntervalId = setInterval(() => {
            // @ts-ignore
            if (!window[this.name]) {
                // @ts-ignore
                delete this;
                clearInterval(refreshIntervalId);
                return;
            }
            let obj2 = this.instance[varName];
            // obj2 = this.instance[variableName];
            if (JSON.stringify(obj2) !== JSON.stringify(oldValue)) {
                var tags = [];
                // for (let i = 0; i < this.mainElement.childNodes.length; i++) {
                //     if (this.mainElement.childNodes[i].nodeType !== 3) {
                //         tags.push(this.mainElement.childNodes[i]);
                //     }
                // }
                if (typeof obj2 === 'object') {
                    if (obj2.length) {
                        oldValue = obj2.slice();
                    } else {
                        oldValue = Object.assign({}, obj2);
                    }
                } else {
                    oldValue = obj2;
                }
                // @ts-ignore
                window[this.name].variables[varName] = oldValue;
                for (let i = 0; i < this.tags.length; i++) {
                    if (this.tags[i].current.forIndex !== undefined) {
                        var founds = this.tags[i - this.tags[i].current.forIndex].invVariables.filter((v: any) => v === varName);
                        if (founds.length > 0) {
                            this.updateTag(i - this.tags[i].current.forIndex);
                        }
                    } else {
                        var founds = this.tags[i].invVariables.filter((v: any) => v === varName);
                        if (founds.length > 0) {
                            this.updateTag(i);
                        }
                    }
                }
            }
        }, 50);
        // }
    }

    splitMulti(str: any, tokens: any) {
        var tempChar = tokens[0]; // We can use the first token as a temporary join character
        for (var i = 1; i < tokens.length; i++) {
            str = str.split(tokens[i]).join(tempChar).replace(/ /g, '');
        }
        str = str.split(tempChar);
        return str;
    }

    updateTag(index: number) {
        let isTarget = false;

        const classVariables = Object.keys(this.instance);
        const instancePrototype = Object.getPrototypeOf(this.instance);
        const classFunctions = Object.getOwnPropertyNames(instancePrototype);
        // @ts-ignore
        // window.aobj.functions['getImageSource6'] = (x) => {
        //     // @ts-ignore
        //     return this.instance.getImageSource2(x);
        // };

        // console.log(mainSentence);
        // if (this.tags[index].current.textContent.match(/\B\\w+/)) {
        //     this.tags[index].current.textContent = this.replaceNames(this.tags[index].current.textContent);
        // }
        // for (let i = 0; i < classVariables.length; i++) {
        //     var regex = "\{{\\s*" + classVariables[i] + "\\s*}}"; // \s*
        //     if (this.tags[index].current.textContent) {
        //         // console.log(regex);
        //         // console.log(currentTag.textContent.replace(new RegExp(regex, "g"), instance[variables[i]]));
        //         this.tags[index].current.textContent = this.tags[index].current.textContent.replace(new RegExp(regex, "g"), this.instance[classVariables[i]]);
        //         // console.log(currentTag.textContent.replace(new RegExp(regex, "g"), 'golabi'));
        //         // console.log([currentTag]);
        //     }
        //     // console.log(instance[funcVariables[i]]);
        //     isTarget = true;
        // }
        // for (let f = 0; f < classFunctions.length; f++) {
        //     var regex = "\{{\\s*" + classFunctions[f] + "\\s*}}"; // \s*
        //     console.log(this.tags[index].current.textContent);
        //     if (this.tags[index].current.textContent) {
        // console.log(currentTag.textContent.replace(new RegExp(regex, "g"), instance[variables[i]]));
        // this.tags[index].current.textContent = this.tags[index].current.textContent.replace(new RegExp(regex, "g"), this.instance[classFunctions[f]]);
        // console.log(currentTag.textContent.replace(new RegExp(regex, "g"), 'golabi'));
        // console.log([currentTag]);
        // }
        // console.log(instance[funcVariables[i]]);
        //     isTarget = true;
        // }
        if (this.declarations) {
            for (let i = 0; i < this.declarations.length; i++) {
                if (this.declarations[i].prototype.obj.selector === this.tags[index].current.nodeName.toLowerCase()) {
                    const handler = new Handler(this.declarations[i].prototype.obj.selector, this.declarations, this.tags[index]);
                    // console.log(666);
                    if (this.instance['onInit']) {
                        this.instance['onInit']();
                    }
                }
            }
        } else {
            if (instancePrototype.obj) {
                if (instancePrototype.obj.selector === this.tags[index].current.nodeName.toLowerCase()) {
                    const handler = new Handler(instancePrototype.obj.selector, this.declarations, this.tags[index]);
                    if (this.instance['onInit']) {
                        this.instance['onInit']();
                    }
                }
            }
        }
        if (this.tags[index].org.attributes.length > 0) {
            for (let j = 0; j < this.tags[index].org.attributes.length; j++) {
                // directives with brackets []
                if (this.tags[index].org.attributes[j].nodeName.match(/\[.*?\]/)) {
                    if (this.tags[index].org.attributes[j].nodeName === '[ngstyle]') {
                        const splitNode = this.tags[index].org.attributes[j].value.split('?');
                        const splitStyles = splitNode[1].split(':');
                        const condition = this.replaceNames(this.tags[index].org.attributes[j].value.split('?')[0]);
                        let targetStyles = this.replaceNames(this.tags[index].org.attributes[j].value);
                        this.setStylesOnElement(targetStyles, this.tags[index].current);
                    }
                    if (this.tags[index].org.attributes[j].nodeName === '[ngclass]') {
                        const splitNode = this.tags[index].org.attributes[j].value.split('?');
                        const splitClasses = splitNode[1].split(':');
                        let targetClasses = '';
                        const condition = this.replaceNames(splitNode[0]);
                        if (condition) {
                            targetClasses = splitClasses[0].replace(/'/g, '');
                            targetClasses = targetClasses.slice(1, targetClasses.length - 1)
                        } else {
                            targetClasses = splitClasses[1].replace(/'/g, '');
                            targetClasses = targetClasses.slice(1, targetClasses.length - 1)
                        }
                        this.tags[index].current.className = targetClasses;
                    }
                    isTarget = true;
                    var hh = this.tags[index].org.attributes[j].value;
                    // const valSplit = hh.split(';');
                    // var value = '';
                    // console.log(hh);
                    const withoutSpace = this.replaceNames(hh);
                    // console.log(withoutSpace);
                    // for (let i = 0; i < valSplit.length; i++) {
                    //     var dd = valSplit[i].split('(');
                    //     console.log(dd);
                    //     if (dd.length > 1) {
                    //         dd[1] = dd[1].substr(0, dd[1].length - 1);
                    //         console.log(this.instance);
                    //         console.log(dd[0]);
                    //         value = this.instance[dd[0]].apply(this.instance, dd[1].split(','));
                    //     } else {
                    //         const ddSplit = this.splitMulti(dd[0], ['+', '-', '/', '*', +'%']);
                    //         const ddSplit2 = this.splitMulti(dd[0], ['+', '-', '/', '*', +'%']);
                    //         const ddSplitOperations = this.splitMulti(dd[0], ddSplit);
                    //
                    //         console.log(ddSplitOperations);
                    //         console.log(ddSplit);
                    // for (let m = 0; m < classVariables.length; m++) {
                    //     for (let l = 0; l < ddSplit.length; l++) {
                    //         if (ddSplit[l] === classVariables[m]) {
                    //             ddSplit[l] = this.instance[ddSplit[l]];
                    //         }
                    //     }
                    // }
                    // let varReplace = 0;
                    //
                    // for (let m = 0; m < ddSplitOperations.length; m++) {
                    //     if (ddSplitOperations[m] === '') {
                    // console.log(typeof (ddSplit[varReplace]));
                    // const replaced = ddSplit2[varReplace].replace(/'/g, '').replace(/"/g, '');
                    // console.log(replaced);
                    // console.log(ddSplit[varReplace]);
                    // console.log(ddSplit2[varReplace]);
                    // ddSplitOperations[m] = ddSplit2[varReplace].replace(replaced, ddSplit[varReplace]);
                    // } else {
                    //     varReplace++;
                    // }
                    // }
                    // console.log(ddSplitOperations.join(' '));
                    // console.log(Function("return " + ddSplitOperations.join(' '))());
                    // console.log(ddSplit);
                    // value = this.instance[valSplit[i]];
                    // }
                    // console.log(valSplit[i]);

                    // }
                    this.tags[index].current.setAttribute(this.tags[index].org.attributes[j].nodeName.match(/(?<=\[).+?(?=\])/), withoutSpace);
                    this.tags[index].current.removeAttribute(this.tags[index].org.attributes[j].nodeName);
                }

                // events with ()
                if (this.tags[index].org.attributes[j].nodeName.match(/\(.*?\)/)) {
                    isTarget = true;
                    var gg = this.tags[index].org.attributes[j].value;
                    var eventName = this.tags[index].org.attributes[j].nodeName.match(/(?<=\().+?(?=\))/);

                    const valSplit = gg.split(';');
                    var value = '';
                    this.tags[index].current.addEventListener(eventName, (event: any) => {
                        for (let i = 0; i < valSplit.length; i++) {
                            var dd = valSplit[i].split('(');
                            if (dd.length > 1) {
                                // @ts-ignore
                                var ggf = valSplit[i].match(/(?<=\().+?(?=\))/g);
                                if (ggf) {
                                    ggf = ggf[0].split(',');
                                    for (let b = 0; b < ggf.length; b++) {
                                        ggf[b] = ggf[b].replace(/ /g, '');
                                        if (this.isJson(ggf[b])) {
                                            ggf[b] = JSON.parse(ggf[b].toLowerCase());
                                        }
                                        if (ggf[b].toString().replace(/ /g, '') === '$event') {
                                            ggf[b] = event;
                                        }
                                        for (let m = 0; m < classVariables.length; m++) {
                                            if (ggf[b] === classVariables[m]) {
                                                ggf[b] = this.instance[ggf[b]];
                                            }
                                        }
                                    }
                                }
                                this.instance[dd[0]].apply(this.instance, ggf);
                            } else {
                                var valsplt = valSplit[i].split('=');
                                this.instance[valsplt[0].replace(/ /g, '')] = Function("return " + valsplt[1])(); // which is same as "return 2+4"
                            }
                        }
                    });
                }

                // *ngIf/
                if (this.tags[index].org.attributes[j].nodeName.match(/\B\*ngi\w+/)) {
                    isTarget = true;
                    const ff = this.tags[index].org.attributes[j].value;

                    const value2 = this.replaceNames(ff);
                    // var ff = this.tags[index].org.attributes[j].value;
                    // for (let k = 0; k < classVariables.length; k++) {
                    //     ff = ff.replace(classVariables[k], "this.instance." + classVariables[k]);
                    // }
                    // var value2 = eval(ff);
                    if (!value2) {
                        const comment = document.createComment(this.tags[index].current.uniqId);
                        this.comments.push(comment);
                        this.tags[index].current.parentNode.insertBefore(comment, this.tags[index].current.nextSibling);
                        this.mainElement = this.tags[index].current.parentNode;

                        this.tags[index].current.remove();
                    } else {
                        for (let g = 0; g < this.comments.length; g++) {
                            if (+this.comments[g].data === +this.tags[index].current.uniqId) {
                                this.tags[index].current = this.tags[index].org.cloneNode(true);
                                this.tags[index].current.uniqId = this.comments[g].data;
                                this.comments[g].parentNode.insertBefore(this.tags[index].current, this.comments[g].nextSibling);
                                this.comments[g].remove();
                                this.comments.splice(g, 1);
                                this.mainElement = this.tags[index].current.parentNode;
                                this.updateTag(index);
                            }
                        }
                    }

                }

                // *ngFor
                // if (this.tags[index].org.attributes[j].nodeName.match(/\B\*ngfo\w+/) && this.tags[index].current.forIndex === undefined) {
                if (this.tags[index].org.attributes[j].nodeName.match(/\B\*ngfo\w+/)) {
                    let tagArr: any = [];
                    if (this.tags[index].arr) {
                        tagArr = this.tags[index].arr;
                    }
                    isTarget = true;
                    var ff = this.tags[index].org.attributes[j].value.split(' of ');
                    var nameOfIn = ff[0].split('let ')[1];
                    var arr = this.replaceNames(ff[1]);
                    // this.tags[index].current.forIndex = 0;
                    this.tags[index].current.removeAttribute(this.tags[index].org.attributes[j].nodeName);
                    // @ts-ignore
                    this.tags[index].invVariables.push(ff[1]);

                    if (arr.length === tagArr.length) {
                        this.tags[index].arr = arr.slice();
                        for (let o = 0; o < arr.length; o++) {
                            // if (arr[o] !== tagArr[o]) {
                            //     this.updateTag(index + o);
                            // }
                        }
                    }
                    if (arr.length > tagArr.length) {
                        this.tags[index].arr = arr.slice();
                        for (let o = 1; o < arr.length; o++) {
                            if (arr[o] !== tagArr[o]) {
                                var newD = this.tags[index].current.cloneNode(true);
                                var newDOrg = this.tags[index].org.cloneNode(true);
                                newDOrg.removeAttribute(this.tags[index].org.attributes[j].nodeName);
                                newD = this.mainElement.insertBefore(newD, this.tags[index].current.nextSibling);
                                newD.forIndex = o;
                                newD.forName = ff[1];
                                newD.forOfName = ff[0];
                                this.tags.splice(index + o, 0, {
                                    current: newD,
                                    changes: [],
                                    invFunctions: this.tags[index].invFunctions,
                                    invVariables: this.tags[index].invVariables,
                                    org: newDOrg,
                                    arr: arr.slice()
                                });
                                this.exeChildren(newD);
                            } else {
                                this.tags[index + o].current.forIndex = o;
                            }
                        }
                    }
                    if (arr.length < tagArr.length) {
                        this.tags[index].arr = arr.slice();
                        for (let o = 1; o < tagArr.length; o++) {
                            if (arr[o] !== tagArr[o]) {
                                this.tags[index + o].current.remove();
                                this.tags.splice(index + o, 1);
                            } else {
                                this.tags[index + o].current.forIndex = o;
                            }
                        }
                    }

                    // if (!this.tags[index].arr) {
                    //     for (let i = 1; i < arr.length; i++) {
                    //         var newD = this.tags[index].current.cloneNode(true);
                    //         var newDOrg = this.tags[index].org.cloneNode(true);
                    //         newDOrg.removeAttribute(newDOrg.attributes[j].nodeName);
                    //         newD = this.mainElement.insertBefore(newD, this.tags[index].current.nextSibling);
                    //         newD.forIndex = i;
                    //         newD.forName = ff[1];
                    //         newD.forOfName = ff[0];
                    //         this.tags.splice(index + i, 0, {
                    //             current: newD,
                    //             changes: [],
                    //             invFunctions: this.tags[index].invFunctions,
                    //             invVariables: this.tags[index].invVariables,
                    //             org: newDOrg,
                    //             arr: arr.slice()
                    //         });
                    //         console.log(this.tags, index);
                    //     }
                    //
                    // } else {
                    // }
                    //
                    // this.tags[index].current.forIndex = 0;
                    // this.tags[index].current.forName = ff[1];
                    // this.tags[index].current.forOfName = ff[0];
                    // this.tags[index].arr = arr.slice();
                }

                // if (this.tags[index].org.attributes[j].nodeName.match(/\B\*ngfo\w+/)) {
                //     console.log(3);
                //     var ff = this.tags[index].org.attributes[j].value.split(' of ');
                //     var nameOfIn = ff[0].split('let ')[1];
                //     var arr = this.replaceNames(ff[1]);
                //     let bigger: any = this.tags[index].arr;
                //     let smaller = arr;
                //     if (!bigger) {
                //         bigger = [];
                //     }
                //     if (smaller.length > bigger.length) {
                //         const temp = bigger;
                //         bigger = arr;
                //         smaller = temp;
                //     }
                //     for (let o = 0; o < bigger.length; o++) {
                //         if (smaller[o] !== bigger[o]) {
                //             console.log(444);
                //             var newD = this.tags[index].current.cloneNode(true);
                //             var newDOrg = this.tags[index].org.cloneNode(true);
                //             newDOrg.removeAttribute(newDOrg.attributes[j].nodeName);
                //             newD = this.mainElement.insertBefore(newD, this.tags[index + o].current.nextSibling);
                //             newD.forIndex = o;
                //             newD.forName = ff[1];
                //             newD.forOfName = ff[0];
                //             this.tags.splice(index + o, 0, {
                //                 current: newD,
                //                 changes: [],
                //                 invFunctions: this.tags[index].invFunctions,
                //                 invVariables: this.tags[index].invVariables,
                //                 org: newDOrg,
                //                 arr: arr.slice()
                //             });
                //             this.tags[index + o].current.forIndex = index + o;
                //             this.tags[index + o].current.arr = arr.slice();
                //             this.tags[index].current.forName = ff[1];
                //             this.tags[index].current.forOfName = ff[0];
                //         }
                //     }
                //     // console.log(this.tags);
                // }

            }
        }
        // if (this.tags[index].current.forIndex !== undefined) {
        //     const arr = this.replaceNames(this.tags[index].current.forName);
        //     const entryFor = index - this.tags[index].current.forIndex;
        //     // @ts-ignore
        //     if (this.tags[entryFor].arr[this.tags[index].current.forIndex] !== arr[this.tags[index].current.forIndex]) {
        //         console.log(this.tags[entryFor].arr, arr);
        //         // @ts-ignore
        //         console.log(this.tags[entryFor].arr[this.tags[index].current.forIndex], arr[this.tags[index].current.forIndex]);
        //         console.log(this.tags[index]);
        //         this.tags[index].current.remove();
        //         // @ts-ignore
        //         this.tags[entryFor].arr.splice(this.tags[index].current.forIndex, 1);
        //         console.log(this.tags[entryFor].arr);
        //         // @ts-ignore
        //         console.log(index, this.tags[index]);
        //         // this.tags[index + c].current.remove();
        //     }
        //     // console.log(index);
        // }

        // console.log(this.tags[index].current.textContent);
        for (let b = 0; b < this.tags[index].org.childNodes.length; b++) {
            if (this.tags[index].org.childNodes[b].nodeType === 3) {
                let mainSentence = '';
                let sentence = '';
                // this.tags[index].org.childNodes[b].nodeValue = 5;
                for (let i = 0; i < this.tags[index].org.childNodes[b].nodeValue.length; i++) {
                    if ((sentence === '' || sentence === '{') && this.tags[index].org.childNodes[b].nodeValue[i] === '{') {
                        sentence = sentence + this.tags[index].org.childNodes[b].nodeValue[i];
                    } else if (sentence.length > 1) {
                        // console.log(sentence);
                        sentence = sentence + this.tags[index].org.childNodes[b].nodeValue[i];
                        if (sentence[sentence.length - 1] === '}' && sentence[sentence.length - 2] === '}') {
                            // @ts-ignore
                            // console.log(sentence.match(/(?<=\{\{).+?(?=\}})/g)[0], this.replaceNames('getImageSource()'));
                            // @ts-ignore
                            mainSentence = mainSentence + this.replaceNames(sentence.match(/(?<=\{\{).+?(?=\}})/g)[0]);
                            sentence = '';
                            // console.log(mainSentence);
                        }
                    } else {
                        mainSentence = mainSentence + this.tags[index].org.childNodes[b].nodeValue[i];
                    }
                }
                this.tags[index].current.childNodes[b].nodeValue = mainSentence;
            }
        }
        // let htmlFuncs: any = this.tags[index].current.textContent.match(/(?<=\{{).+?(?=\}})/g);
        // // console.log(htmlFuncs);
        // // for (let i = 0; i < funcs.length; i++) {
        // if (htmlFuncs) {
        //     // console.log([this.tags[index].current]);
        //     for (let j = 0; j < htmlFuncs.length; j++) {
        //         htmlFuncs[j] = htmlFuncs[j].replace(/ /g, '');
        //         var dd = htmlFuncs[j].split('(');
        //         if (dd.length > 1) {
        //             // @ts-ignore
        //             var ggf = htmlFuncs[j].match(/(?<=\().+?(?=\))/g);
        //             if (ggf) {
        //                 ggf = ggf[0].split(',');
        //                 for (let b = 0; b < ggf.length; b++) {
        //                     if (this.isJson(ggf[b])) {
        //                         ggf[b] = JSON.parse(ggf[b].toLowerCase());
        //                     }
        //                     if (ggf[b].toString().replace(/ /g, '') === '$event') {
        //                         ggf[b] = event;
        //                     }
        //                 }
        //             }
        //         }
        //         this.tags[index].current.textContent = this.instance[dd[0]].apply(this.instance, ggf);
        //         // if (realTag.ffor) {
        //         // console.log(currentTag.ffor + '[' + currentTag.forIndex + ']');
        //         // console.log(instance['arr2'][2]);
        //         // console.log(instance[currentTag.ffor][currentTag.forIndex]);
        //         // currentTag.textContent = instance[realTag.ffor][realTag.forIndex];
        //         // } else {
        //         // console.log(dd[0]);
        //         // }
        //         // console.log(currentTag);
        //
        //         isTarget = true;
        //         // instance[dd[0]].apply(instance, ggf);
        //     }
        // }
    }

    exeChildren(newD: any): void {
        const children = newD.children;
        if (children.length > 0) {
            for (let i = 0; i < children.length; i++) {
                const org = children[i].cloneNode(true);
                const targetObject: any = {
                    org: org,
                    current: children[i],
                    changes: [],
                    invVariables: [],
                    invFunctions: [],
                    parent: newD
                };
                children[i].uniqId = Math.random() * 10000;
                for (let j = 0; j < org.attributes.length; j++) {
                    if (org.attributes[j]) {
                        if (!org.attributes[j].nodeName.match(/\(.*?\)/)) {
                            const split = children[i].attributes[j].value.split(';');
                            for (let k = 0; k < split.length; k++) {
                                const perSplit = split[k].split('(');
                                if (perSplit.length > 1) {
                                    for (let m = 0; m < this.classFunctions.length; m++) {
                                        perSplit[0] = perSplit[0].replace('!', '');
                                        perSplit[0] = perSplit[0].replace('+', '');
                                        if (perSplit[0] === this.classFunctions[m]) {
                                            // @ts-ignore
                                            targetObject.invFunctions.push(this.classFunctions[m]);
                                        }
                                    }
                                } else {
                                    const varSplit = split[k].split(' =');
                                    for (let m = 0; m < this.classVariables.length; m++) {
                                        varSplit[0] = varSplit[0].replace('!', '');
                                        varSplit[0] = varSplit[0].replace('+', '');
                                        if (varSplit[0] === this.classVariables[m]) {
                                            // @ts-ignore
                                            targetObject.invVariables.push(this.classVariables[m]);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                this.tags.push(targetObject);
                // console.log(this.tags);
                // this.updateTag(this.tags.length - 1);
                this.exeChildren(children[i]);
            }
        } else {
        }
    }

    replaceNames(hh: any) {
        const classVariables = Object.keys(this.instance);
        const instancePrototype = Object.getPrototypeOf(this.instance);
        const classFunctions = Object.getOwnPropertyNames(instancePrototype);
        var withoutSpace = hh.replace(/ /g, '');
        var aa = 'adasd';
        // console.log('havok 4545 adasd'.replace(/\{{aa}}/g, 'golabi'));
        // console.log('.aobj.aobj.haaaaa'.replace(/\.aobj\.aobj/g, '.aobj'));
        // for (let m = 0; m < classVariables.length; m++) {
        //     var regex = "\s*" + classVariables[m] + "\s*";
        //     withoutSpace = withoutSpace.replace(new RegExp(regex, "g"), this.name + '\.variables.' + classVariables[m]);
        //     withoutSpace = withoutSpace.replace('/' + this.name + '\.variables\.' + this.name + '\.variables/g', this.name + '\.variables');
        // }
        // for (let m = 0; m < classFunctions.length; m++) {
        //     var regex = "\s*" + classFunctions[m] + "\s*";
        //     withoutSpace = withoutSpace.replace(new RegExp(regex, "g"), this.name + '.functions.' + classFunctions[m]);
        //     withoutSpace = withoutSpace.replace('/' + this.name + '\.functions\.' + this.name + '\.functions/g', this.name + '\.functions');
        //     console.log(withoutSpace);
        //     withoutSpace = withoutSpace.replace(/aaobj\.functions\./g, 'a');
        // }
        for (let m = 0; m < classVariables.length; m++) {
            var regex = "\s*" + classVariables[m] + "\s*";
            withoutSpace = withoutSpace.replace(new RegExp(regex, "g"), this.name + '\.variables.' + classVariables[m]);
            withoutSpace = withoutSpace.replace(new RegExp(this.name + '\.variables\.' + this.name + '\.variables', "g"), this.name + '\.variables');
        }
        for (let m = 0; m < classFunctions.length; m++) {
            var regex = "\s*" + classFunctions[m] + "\s*";
            withoutSpace = withoutSpace.replace(new RegExp(regex, "g"), this.name + '.functions.' + classFunctions[m]);
            withoutSpace = withoutSpace.replace(new RegExp(this.name + '\.functions\.' + this.name + '\.functions', "g"), this.name + '\.functions');
            // withoutSpace = withoutSpace.replace(/aaobj\.functions\./g, 'a');
        }
        // console.log(withoutSpace);
        return Function("return " + withoutSpace)();
    }

    setStylesOnElement(styles: any, element: any) {
        Object.assign(element.style, styles);
    }

    isJson(str: any) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    getHTMLSource(tempHtmlLoc: string) {
        return fetch(tempHtmlLoc).then((data) => {
            return data.text().then(html => {
                return html;
            });
        });
    }
}
