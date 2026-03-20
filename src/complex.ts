
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
    // See numpy (https://github.com/numpy/numpy/blob/.../numpy/_core/src/npymath/npy_math_complex.c.src) csqrt()
    sqrt(): Complex {
        let x = this.re
        let y = this.im
        let re = 0
        let im = 0
        //console.log(x, y)
        if (false) {
            let r = Math.sqrt(x * x + y * y)
            re = Math.sqrt(0.5 * (r + x))
            im = Math.sqrt(0.5 * (r - x)) * sign(y)
        } else {
            if (x == 0 && y == 0) {
                re = 0
                im = y
            } else if (x >= 0) {
                let t = Math.sqrt((x + hypot(x, y)) * 0.5)
                re = t
                im = y / (2 * t)
            } else {
                let t = Math.sqrt((-x + hypot(x, y)) * 0.5)
                re = Math.abs(y) / (2 * t)
                im = t * sign(y)
            }
        }
        //console.log("    => ", re, im)
        return new Complex(re, im)
    }
    // See numpy (https://github.com/numpy/numpy/blob/.../numpy/_core/src/npymath/npy_math_complex.c.src) cdiv()
    div(z: Complex): Complex {
        let ar = this.re
        let ai = this.im
        let br = z.re
        let bi = z.im
        //console.log(ar, ai, br, bi)
        let re = 0
        let im = 0
        if (true) {
            const abs_br = Math.abs(br)
            const abs_bi = Math.abs(bi)
            if (abs_br >= abs_bi) {
                if (abs_br == 0.0 && abs_bi == 0.0) {
                    re = ar / abs_br
                    im = ai / abs_bi
                } else {
                    const rat = bi / br
                    const scl = 1.0 / (br + bi * rat)
                    re = (ar + ai * rat) * scl
                    im = (ai - ar * rat) * scl
                }
            } else {
                const rat = br / bi
                const scl = 1.0 / (bi + br * rat)
                re = (ar * rat + ai) * scl
                im = (ai * rat - ar) * scl
            }
        } else {
            let r = br * br + bi * bi
            re = (ar * br + ai * bi) / r
            im = (ai * br - ar * bi) / r
        }
        //console.log('     =>', re, im)
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
    conj(): Complex {
        return new Complex(this.re, -this.im)
    }
    is_real(): boolean {
        return this.im == 0.0
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
    if (b.every(z => z.re == 0 && z.im == 0)) {
        return a.map(z => zero.copy())
    }
    for (let i = 0; i < n; i++) {
        res.push(zero.copy())
    }
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < b.length; j++) {
            res[i + j] = res[i + j].add(a[i].mul(b[j]))
        }
    }
    return res
}

export function poly(roots: Complex[]) {
    const one = new Complex(1, 0)
    let p = [new Complex(1, 0)]
    for (const root of roots) {
        p = polymul(p, [one.copy(), root.neg()])
    }
    return p
}


export function isComplex(v: any): boolean {
    return (v instanceof Complex)
}
export function isReal(v: any): boolean {
    return (parseInt(v, 10) == v) || (parseFloat(v) == v)
}

export function asComplex(v: any): Complex {
    if (v instanceof Complex) {
        return v
    }
    if (parseInt(v, 10) == v) {
        return new Complex(v, 0)
    }
    if (parseFloat(v) == v) {
        return new Complex(v, 0)
    }
    throw new Error(`Expected number or Complex number got ${v}`)
}


export function cplxreal(z: Complex[], tol: number = -1) {
    if (!Array.isArray(z)) { z = [z] } // asArray
    if (z.length == 0) {
        return [z, z]
    }
    if (tol < 0.0) {
        const eps = 1e-16 // probably 2.220446049250313e-16
        tol = 100 * eps
    }
    z = z.map(v => asComplex(v))
    z = z.sort((a, b) => (a.re - b.re) || (Math.abs(a.im) - Math.abs(b.im)))
    //console.log('sorted', z)

    let zr = [] // Real parts
    let zp = [] // Positive imaginary
    let zn = [] // Negative imaginary
    for (let i = 0; i < z.length; i++) {
        if (Math.abs(z[i].im) <= tol * z[i].abs()) {
            zr.push(z[i].re)
        } else {
            if (z[i].im > 0) {
                zp.push(z[i])
            } else {
                zn.push(z[i])
            }
        }
    }
    //console.log('zr.length, z.length', zr.length, z.length)

    if (zr.length == z.length) {
        // Input is entirely real
        return [[], zr]
    }
    //console.log('sorted', z)
    if (zp.length != zn.length) {
        throw new Error('Array contains complex value with no matching conjugate')
    }
    let chunks = [[0]]
    let k = 0
    for (let i = 1; i < z.length; i++) {
        //console.log(k, i, z.length, chunks)
        if (Math.abs(z[i - 1].re - z[i].re) > tol * z[i - 1].abs()) {
            k += 1
            chunks.push([])
        }
        chunks[k].push(i)
    }
    for (const c of chunks) {
        let [k0, k1] = [c[0], c[c.length - 1]]
        //console.log('   index =>', k0, k1)
        // Sort on imaginary values
        z.slice(k0, k1 + 1).sort((a, b) => Math.abs(a.im) - Math.abs(b.im))
    }
    let two = new Complex(2, 0)
    let zc = zp.map((_, i) => zp[i].add(zn[i].conj()).div(two))

    //zr = asComplex(zr)

    return [zc, zr]
    //throw new Error('unimplemented')
}



function hypot(a: number, b: number): number {
    a = Math.abs(a)
    b = Math.abs(b)
    if (a < b) {
        let tmp = a
        a = b
        b = tmp
    }
    if (a == 0.0) {
        return 0
    }
    let ba = b / a
    return a * Math.sqrt(1.0 + ba * ba)
}
