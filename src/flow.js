// flow是js的超集，用于静态类型检查
@flow
function square(n: number): number {
    return n * n
}
square('2')