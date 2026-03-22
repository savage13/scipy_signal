
/**
 * Complex number
 */
export class Complex {
    re: number;
    im: number;
    /**
     * @constructor
     * @param re - Real part
     * @param im - Imaginary part
     *
     * @return - Complex number (re, im)
     */
    constructor(re: number, im: number) {
        this.re = re
        this.im = im
    }
    /**
     * Copy a complex number
     *
     * @return {Complex} - Copy of Complex number (re, im)
     */
    copy(): Complex {
        return new Complex(this.re, this.im)
    }
    /**
     * Take exponential of complex number
     * @return exp(this)
     */
    exp(): Complex {
        const x = this.re
        const y = this.im
        let ex = Math.exp(x)
        let re = ex * Math.cos(y)
        let im = ex * Math.sin(y)
        return new Complex(re, im)
    }
    /**
     * Take negative of complex number
     * @return -1 * this
     */
    neg(): Complex {
        return this.mul(new Complex(-1, 0))
    }
    /**
     * Multiply two complex numbers
     * @return a * b
     */
    mul(z: Complex): Complex {
        let a = this.re
        let b = this.im
        let c = z.re
        let d = z.im
        return new Complex(a * c - b * d, a * d + b * c)
    }
    /**
     * Compare two complex number within an absolute tolerance
     * @param z
     * @return true if ||this-z|| < 1e-13
     */
    cmp(z: Complex): boolean {
        let dx = Math.abs(this.re - z.re)
        let dy = Math.abs(this.im - z.im)
        return dx < 1e-13 && dy < 1e-13
    }
    // See numpy (https://github.com/numpy/numpy/blob/.../numpy/_core/src/npymath/npy_math_complex.c.src) csqrt()
    /**
     * Take square root of a complex number
     * @return this^(1/2)
     */
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
    /**
     * Divide two complex numbers
     * @param z complex denominator
     * @return this / z
     */
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
    /**
     * Add two complex numbers
     * @param z complex number to add
     * @return this + z
     */
    add(z: Complex): Complex {
        let x = this.re
        let y = this.im
        let u = z.re
        let v = z.im
        return new Complex(x + u, y + v)
    }
    /**
     * Subtract two complex numbers
     * @param z complex number to subtract
     * @return this - z
     */
    sub(z: Complex): Complex {
        let x = this.re
        let y = this.im
        let u = z.re
        let v = z.im
        return new Complex(x - u, y - v)
    }
    /**
     * Convert to a string
     * @return "(re, im)"
     */
    str(): string {
        return `(${this.re}, ${this.im})`
    }
    /**
     * Take absolute value of a complex number
     * @return ||this||
     */
    abs(): number {
        return Math.sqrt(this.re * this.re + this.im * this.im)
    }
    /**
     * Take conjugate of a complex number
     * @return (re, -im)
     */
    conj(): Complex {
        return new Complex(this.re, -this.im)
    }
    /**
     * Check is complex is real
     * @return true if im == 0
     */
    is_real(): boolean {
        return this.im == 0.0
    }
    /**
     * Check if complex is zero
     * @return true if real and imag == 0
     */
    is_zero(): boolean {
        return this.re == 0 && this.im == 0
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

/**
 * Multiply an array of Complex numbers
 * @param v array of complex number to multiply
 * @returns v[0] * v[1] * .... v[n-1]
 */
export function zprod(v: Complex[]): Complex {
    let out = new Complex(1, 0)
    for (let i = 0; i < v.length; i++) {
        out = out.mul(v[i])
    }
    return out
}

/**
 * Compute value of complex polynomial defined by roots at a value
 * @param x value to evaluate at
 * @param r roots of the polynomial
 * @return (x - r[0]) * (x - r[1]) * (x - r[2]) ... (x - r[n-1])
 */
export function zpolyval_from_roots(x: Complex, r: Complex[]): Complex {
    // tensor=True is only important when x is multidimensional
    let dx = r.map(root => x.sub(root))
    return zprod(dx)
}

function trimseq(a: Complex[]): Complex[] {
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

/**
 * Multiply two complex polynomials
 * @param a complex polynomial
 * @param b complex polynomial
 * @param a * b polynomial
 */
export function polymul(a: Complex[], b: Complex[]): Complex[] {
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

/**
 * Find complex polynomial coefficients from a set of roots
 * @param roots polynomial roots
 * @return polynomial coefficients
 */
export function poly(roots: Complex[]): Complex[] {
    const one = new Complex(1, 0)
    let p = [new Complex(1, 0)]
    for (const root of roots) {
        p = polymul(p, [one.copy(), root.neg()])
    }
    return p
}

/**
 * Check if value is complex
 * @param v value
 * @return true if value is Complex (instanceof)
 */
export function isComplex(v: any): boolean {
    return (v instanceof Complex)
}
/**
 * Check is value is real
 * @param v value
 * @return true if value is either an integer or number
 */
export function isReal(v: any): boolean {
    return (parseInt(v, 10) == v) || (parseFloat(v) == v)
}

/**
 * Convert a value to Complex
 *  This is throw an exception on a non-numeric value
 *
 * @param v value
 * @return Complex value
 */
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

/**
 * Split into complex and real parts, combining conjugate pairs.
 * @param z Complex array to be sorted and split
 * @param tol tolerance (1e-14)
 * @return [ c, r]
 *     - c Complex elements of `z`, with each pair represented by a single value
 *        having positive imaginary part, sorted first by real part, and then
 *       by magnitude of imaginary part. The pairs are averaged when combined
 *       to reduce error.
 *     - r Real elements of `z` (those having imaginary part less than
 *      `tol` times their magnitude), sorted by value.
 *
 * Documentation taken from
 *  https://github.com/scipy/scipy/blob/v1.17.0/scipy/signal/_filter_design.py#L983
 */
export function cplxreal(z: Complex[], tol: number = -1): [Complex[], number[]] {
    if (!Array.isArray(z)) { z = [z] } // asArray
    if (z.length == 0) {
        return [[], []]
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


/**
 * Compute hypot of a and b
 * @param a - a value
 * @param b - b value
 *
 * @return sqrt(a*a+b*b)
 */
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
