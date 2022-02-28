export function Pipe(obj: {name: string}) {
    return <any>function (target: any) {
        target.prototype.obj = obj;
    };
}
