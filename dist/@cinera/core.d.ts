export declare class Core {
    htmlSource: string;
    obj: {
        selector: string;
        templateUrl: string;
        styleUrl: string;
    };
    constructor();
    buildComponent(instance: any): Promise<string>;
    replaceFunctionInHTML(htmlSource: string, funcNames: string[], targetPrototype: any, htmlVariable: string): string;
    replaceTSVariableInHTML(htmlSource: string, variableName: string, variableData: string): string;
    findUndefined(htmlSource: string, variableNames: string[]): void;
    getHTMLSource(tempHtmlLoc: string): Promise<string>;
}
