
import { Complex, asComplex, isComplex } from './complex'

export function polyval(p: number[] | Complex[], x: number | Complex): number | Complex {
    if (isComplex(x) || p.some(v => isComplex(v))) {
        return zpolyval(p.map(asComplex), asComplex(x))
    }
    x = x as number
    let P = p as number[]
    let v = 0
    let k = 0
    for (let i = p.length - 1; i >= 0; i--) {
        v += Math.pow(x, k++) * P[i]
    }
    return v
}


// p from [high order to lower order]
//  p[0] x^5 + p[1] x^4 + p[2] x^3 + p[3] x^2 + p[4] x^1 + p[5]
export function zpolyval(p: Complex[], x: Complex): Complex {
    const n = p.length
    if (n <= 0) {
        return new Complex(0, 0)
    }
    let v = p[n - 1]
    let xn = new Complex(1, 0)
    for (let i = p.length - 2; i >= 0; i--) {
        xn = xn.mul(x)
        v = p[i].mul(xn).add(v)
    }
    return v
}
