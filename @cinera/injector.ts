export class Injector {
    private static container = new Map<string, any>();

    static resolve<T>(target: any): T {
        const lastNine = target.name.substr(target.name.length - 9);
        if (Injector.container.has(target.name) && lastNine !== 'Component') {
            return Injector.container.get(target.name);
        }
        const tokens = Reflect.getMetadata("design:paramtypes", target) || [];
        const injections = tokens.map((token: any): any =>
            Injector.resolve(token)
        );
        const instance = new target(...injections);
        Injector.container.set(target.name, instance);
        return instance;
    }
}
