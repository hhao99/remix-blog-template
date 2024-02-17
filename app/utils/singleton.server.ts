export const singleton = <Value>(name: string, valueFactory: ()=> Value) => {
    const g = global as any
    g.__singleton ??= {}
    g.__singleton[name] ??= valueFactory()
    return g.__singleton[name]
}