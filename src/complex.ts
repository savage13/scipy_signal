
export class Complex {
    re: number;
    im: number;
    constructor(re: number, im: number) {
        this.re = re
        this.im = im
    }
    copy(): Complex {
        return new Complex(this.re, this.im)
    }
    exp(): Complex {
        const x = this.re
        const y = this.im
        let ex = Math.exp(x)
        let re = ex * Math.cos(y)
        let im = ex * Math.sin(y)
        return new Complex(re, im)
    }
    neg(): Complex {
        return this.mul(new Complex(-1, 0))
    }
    mul(z: Complex): Complex {
        let a = this.re
        let b = this.im
        let c = z.re
        let d = z.im
        return new Complex(a * c - b * d, a * d + b * c)
    }
    is_zero(): boolean {
        return this.re == 0 && this.im == 0
    }
    cmp(z: Complex): boolean {
        let dx = Math.abs(this.re - z.re)
        let dy = Math.abs(this.im - z.im)
        return dx < 1e-13 && dy < 1e-13
    }
    sqrt(): Complex {
        let x = this.re
        let y = this.im
        let r = Math.sqrt(x * x + y * y)
        let re = Math.sqrt(0.5 * (r + x))
        let im = Math.sqrt(0.5 * (r - x)) * sign(y)
        return new Complex(re, im)
    }
    div(z: Complex): Complex {
        let x = z.re
        let y = z.im
        let u = this.re
        let v = this.im
        let r = x * x + y * y
        let re = (u * x + v * y) / r
        let im = (v * x - u * y) / r
        return new Complex(re, im)
    }
    add(z: Complex): Complex {
        let x = this.re
        let y = this.im
        let u = z.re
        let v = z.im
        return new Complex(x + u, y + v)
    }
    sub(z: Complex): Complex {
        let x = this.re
        let y = this.im
        let u = z.re
        let v = z.im
        return new Complex(x - u, y - v)
    }
    str(): string {
        return `(${this.re}, ${this.im})`
    }
    abs(): number {
        return Math.sqrt(this.re * this.re + this.im * this.im)
    }
}

function isNegativeZero(v: number): boolean {
    return Object.is(v, -0)
}

function sign(x: number): number {
    if (x >= 0 && !isNegativeZero(x)) {
        return 1;
    } else {
        return -1
    }
}

export function zprod(v: Complex[]): Complex {
    let out = new Complex(1, 0)
    for (let i = 0; i < v.length; i++) {
        out = out.mul(v[i])
    }
    return out
}

export function zpolyval_from_roots(x: Complex, r: Complex[]): Complex {
    // tensor=True is only important when x is multidimensional
    let dx = r.map(root => x.sub(root))
    return zprod(dx)
}

export function trimseq(a: Complex[]): Complex[] {
    let n = a.length
    if (n == 0 || !(a[n - 1].is_zero())) {
        return a
    }
    while (a.length > 1) {
        let n = a.length
        if (!a[n - 1].is_zero()) {
            break
        }
        a.pop()
    }
    return a
}

export function polymul(a: Complex[], b: Complex[]) {
    let zero = new Complex(0, 0)
    let n = a.length + b.length - 1
    let res = []
    for (let i = 0; i < n; i++) {
        res.push(zero.copy())
    }
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < b.length; j++) {
            res[i + j] = res[i + j].add(a[i].mul(b[j]))
        }
    }
    return trimseq(res)
}

export function poly(roots: Complex[]) {
    const one = new Complex(1, 0)
    let p = [new Complex(1, 0)]
    for (const root of roots) {
        p = polymul(p, [one.copy(), root.neg()])
    }
    return p
}
