
import { Complex, zprod, poly, cplxreal, asComplex } from './complex'
import { asArray, argmin, zeros, sum } from './numpy'

import { BA, SOS, ZPK } from './scipy'

/**
 * Convert a lowpass prototype to a lowpass with a different frequency
 * @param z Complex zeros
 * @param p Complex poles
 * @param k Constant
 * @param wo Angular Frequency of the low pass cutoff (rad/s)
 * @return ZPK
 *     - z Complex zeros
 *     - p Complex poles
 *     - k Constant
 */
export function lp2lp_zpk(z: Complex[], p: Complex[], k: number, wo: number): ZPK {
    z = asArray(z) as Complex[]
    p = asArray(p) as Complex[]

    let degree = _relative_degree(z, p)

    let w = new Complex(wo, 0)

    let z_lp = z.map(v => v.mul(w))
    let p_lp = p.map(v => v.mul(w))

    let k_lp = k * Math.pow(wo, degree)

    return { z: z_lp, p: p_lp, k: k_lp }
}

/**
 * Convert a lowpass prototype to a highpass with a different frequency
 * @param z Complex zeros
 * @param p Complex poles
 * @param k Constant
 * @param wo Angular Frequency of the high pass cutoff (rad/s)
 * @return ZPK
 *     - z Complex zeros
 *     - p Complex poles
 *     - k Constant
 */
export function lp2hp_zpk(z: Complex[], p: Complex[], k: number, wo: number): ZPK {
    z = asArray(z) as Complex[]
    p = asArray(p) as Complex[]

    let degree = _relative_degree(z, p)

    let w = new Complex(wo, 0)

    let z_hp = z.map(v => w.div(v))
    let p_hp = p.map(v => w.div(v))

    for (let i = 0; i < degree; i++) {
        z_hp.push(new Complex(0., 0.))
    }

    let numer = zprod(z.map(zi => zi.neg()))
    let denom = zprod(p.map(pi => pi.neg()))

    let k_hp = k * numer.div(denom).re
    return { z: z_hp, p: p_hp, k: k_hp }
}

/**
 * Convert a lowpass prototype to a bandpass with a different frequencies
 * @param z Complex zeros
 * @param p Complex poles
 * @param k Constant
 * @param wo Angular Frequency of the band pass cutoff (rad/s)
 * @param bw Angular Bandwidth of the band pass cutoff (rad/s)
 * @return ZPK
 *     - z Complex zeros
 *     - p Complex poles
 *     - k Constant
 */
export function lp2bp_zpk(z: Complex[], p: Complex[], k: number, wo: number, bw: number): ZPK {
    z = asArray(z) as Complex[]
    p = asArray(p) as Complex[]

    let degree = _relative_degree(z, p)

    const zbw2 = new Complex(bw / 2, 0)
    // Invert to a highpass filter with desired bandwidth
    const z_lp = z.map(zi => zi.mul(zbw2))
    const p_lp = p.map(pi => pi.mul(zbw2))

    const zwo = new Complex(wo * wo, 0)

    let z_bp_p = z_lp.map(zi => zi.add(zi.mul(zi).sub(zwo).sqrt()))
    let z_bp_n = z_lp.map(zi => zi.sub(zi.mul(zi).sub(zwo).sqrt()))
    let z_bp = [...z_bp_p, ...z_bp_n]

    let p_bp_p = p_lp.map(pi => pi.add(pi.mul(pi).sub(zwo).sqrt()))
    let p_bp_n = p_lp.map(pi => pi.sub(pi.mul(pi).sub(zwo).sqrt()))
    let p_bp = [...p_bp_p, ...p_bp_n]

    // Move any zeros that were at infinity to the center of the stopband
    for (let i = 0; i < degree; i++) {
        z_bp.push(new Complex(0, 0))
    }

    let k_bs = k * Math.pow(bw, degree)

    return { z: z_bp, p: p_bp, k: k_bs }
}

/**
 * Convert a lowpass prototype to a bandstop with a different frequencies
 * @param z Complex zeros
 * @param p Complex poles
 * @param k Constant
 * @param wo Angular Frequency of the band stop cutoff (rad/s)
 * @param bw Angular Bandwidth of the band stop cutoff (rad/s)
 * @return ZPK
 *     - z Complex zeros
 *     - p Complex poles
 *     - k Constant
 */
export function lp2bs_zpk(z: Complex[], p: Complex[], k: number, wo: number, bw: number): ZPK {
    z = asArray(z) as Complex[]
    p = asArray(p) as Complex[]

    let degree = _relative_degree(z, p)

    const zbw2 = new Complex(bw / 2, 0)
    // Invert to a highpass filter with desired bandwidth
    const z_hp = z.map(zi => zbw2.div(zi))
    const p_hp = p.map(pi => zbw2.div(pi))

    const zwo = new Complex(wo * wo, 0)
    // Square root needs to produce complex result, not NaN
    let z_hp_p = z_hp.map(zi => zi.add(zi.mul(zi).sub(zwo).sqrt()))
    let z_hp_n = z_hp.map(zi => zi.sub(zi.mul(zi).sub(zwo).sqrt()))
    let z_bs = [...z_hp_p, ...z_hp_n]

    let p_hp_p = p_hp.map(pi => pi.add(pi.mul(pi).sub(zwo).sqrt()))
    let p_hp_n = p_hp.map(pi => pi.sub(pi.mul(pi).sub(zwo).sqrt()))
    let p_bs = [...p_hp_p, ...p_hp_n]

    // Move any zeros that were at infinity to the center of the stopband
    for (let i = 0; i < degree; i++) {
        z_bs.push(new Complex(0, wo))
    }
    for (let i = 0; i < degree; i++) {
        z_bs.push(new Complex(0, -wo))
    }

    let n1 = new Complex(-1, 0)
    let numer = zprod(z.map(zi => zi.mul(n1)))
    let denom = zprod(p.map(pi => pi.mul(n1)))

    let k_bs = k * numer.div(denom).re
    return { z: z_bs, p: p_bs, k: k_bs }
}

/**
 * Convert an analog filter to a digital filter using the bilinear transform
 * @param z Complex zeros
 * @param p Complex poles
 * @param k Constant
 * @return ZPK
 *     - z Complex zeros
 *     - p Complex poles
 *     - k Constant
 */
export function bilinear_zpk(z: Complex[], p: Complex[], k: number, fs: number): ZPK {
    z = asArray(z) as Complex[]
    p = asArray(p) as Complex[]

    const degree = _relative_degree(z, p)
    const fs2 = new Complex(2.0 * fs, 0)
    let z_z = z.map(zi => fs2.add(zi).div(fs2.sub(zi)))
    let p_z = p.map(zi => fs2.add(zi).div(fs2.sub(zi)))
    for (let i = 0; i < degree; i++) {
        z_z.push(new Complex(-1, 0))
    }
    let numer = zprod(z.map(zi => fs2.sub(zi)))
    let denom = zprod(p.map(zi => fs2.sub(zi)))
    let k_z = k * numer.div(denom).re
    return { z: z_z, p: p_z, k: k_z }
}

/**
 * Concert a ZPK filter representation to a BA filter representation
 * @param z Complex zeros
 * @param p Complex poles
 * @param k Constant
 * @return BA
 *      - b Polynomial coefficients numerator
 *      - a Polynomial coefficients denominator
 */
export function zpk2tf(z: Complex[], p: Complex[], k: number): BA {
    z = asArray(z) as Complex[]
    p = asArray(p) as Complex[]
    let a = poly(p).map(v => v.re)
    let b = poly(z).map(v => v.re * k)
    return { b, a }
}

/**
 * Concert a ZPK filter representation to a SOS filter representation
 * @param z Complex zeros
 * @param p Complex poles
 * @param k Constant
 * @return Second order section filter representation
 */
export function zpk2sos(z: Complex[], p: Complex[], k: number): SOS {
    let valid_pairings = ['nearest', 'keep_odd', 'minimal']
    let analog = false    // default
    let pairing = 'none'  // default
    z = asArray(z) as Complex[]
    p = asArray(p) as Complex[]
    if (pairing == 'none') {
        pairing = (analog) ? 'minimal' : 'nearest'
    }
    if (!valid_pairings.includes(pairing)) {
        throw new Error(`fparing must be one of the ${valid_pairings}, not ${pairing}`)
    }
    if (analog && pairing != 'minimal') {
        throw new Error(`for analog zpk2sos conversion, pairing must be minimal`)
    }
    if (z.length == 0 && p.length == 0) {
        if (!analog) {
            return [[k, 0., 0., 1., 0., 0.]]
        } else {
            return [[0., 0., k, 0., 0., 1.]]
        }
    }
    let n_sections = 1
    if (pairing != 'minimal') {
        // ensure we have the same number of poles and zeros, and make copies
        for (let i = p.length; i < z.length; i++) {
            p.push(new Complex(0, 0))
        }
        for (let i = z.length; i < p.length; i++) {
            z.push(new Complex(0, 0))
        }
        n_sections = Math.floor((Math.max(p.length, z.length) + 1) / 2)
        if (p.length % 2 == 1 && pairing == 'nearest') {
            p.push(new Complex(0, 0))
            z.push(new Complex(0, 0))
        }
        if (p.length != z.length) {
            throw new Error('number of poles != number of zeros (internal error)')
        }
    } else {
        if (p.length < z.length) {
            throw new Error('for analog zpk2sos conversion, must have p.length >= z.length')
        }
        n_sections = Math.floor((p.length + 1) / 2)
    }

    // Ensure we have comple conjugate pairs, flatten
    z = cplxreal(z).flat().map(v => asComplex(v))
    p = cplxreal(p).flat().map(v => asComplex(v))

    let idx_worst = null
    if (!analog) {
        // digital "worst" is the closet to the unit circle
        idx_worst = (v: Complex[]) => { return argmin(v.map(vi => Math.abs(1 - vi.abs()))) }
    } else {
        // analog "worst" is the closest to the imaginary axis
        idx_worst = (v: Complex[]) => { return argmin(v.map(vi => Math.abs(vi.re))) }
    }

    let sos: number[][] = Array(n_sections).fill(0).map(_ => zeros(6))

    let zero = new Complex(0, 0)
    // Construct the system, reversing order so the "worst" are last
    for (let si = n_sections - 1; si >= 0; si--) {
        let p1_idx = idx_worst(p)
        let p1 = p.splice(p1_idx, 1)[0]
        if (p1.is_real() && p.every(v => !v.is_real())) {
            // Special case (1): last remaining real pole
            if (pairing == 'minimal') {
                let z1_idx = nearest_real_complex_idx(z, p1, 'real')
                let z1 = z.splice(z1_idx, 1)[0]
                sos[si] = single_zpksos([z1, zero], [p1, zero], 1)
            } else if (z.length > 0) {
                let z1_idx = nearest_real_complex_idx(z, p1, 'real')
                let z1 = z.splice(z1_idx, 1)[0]
                sos[si] = single_zpksos([z1], [p1], 1)
            } else {
                sos[si] = single_zpksos([], [p1], 1)
            }
        } else if (p.length + 1 == z.length &&
            p1.im != 0 &&
            sum(p.map(v => v.re)) == 1.0 &&
            sum(z.map(v => v.re)) == 1.0) {
            // Special case (1): there's one real pole and one real zero left
            // and an equal number of poles and zeros to pair up
            // We *must* pair with a complex zero
            let z1_idx = nearest_real_complex_idx(z, p1, 'complex')
            let z1 = z.splice(z1_idx, 1)[0]
            sos[si] = single_zpksos([z1, z1.conj()], [p1, p1.conj()], 1)
        } else {
            let p2 = new Complex(0, 0)
            if (p1.is_real()) {
                let prealidx = []
                for (let i = 0; i < p.length; i++) {
                    if (p[i].is_real()) {
                        prealidx.push(i)
                    }
                }
                let pnz = prealidx.map(i => p[i])
                let p_idx = idx_worst(pnz)
                let p2_idx = prealidx[p_idx]
                p2 = p.splice(p2_idx, 1)[0]
            } else {
                p2 = p1.conj()
            }

            if (z.length > 0) {
                let z1_idx = nearest_real_complex_idx(z, p1, 'any')
                let z1 = z.splice(z1_idx, 1)[0]
                if (z1.im != 0) {
                    sos[si] = single_zpksos([z1, z1.conj()], [p1, p2], 1)
                } else {
                    if (z.length > 0) {
                        let z2_idx = nearest_real_complex_idx(z, p1, 'real')
                        let z2 = z.splice(z2_idx, 1)[0]
                        if (z2.im != 0) {
                            throw new Error(`Expected current zero to be real, got ${z2.re} ${z2.im}`)
                        }
                        sos[si] = single_zpksos([z1, z2], [p1, p2], 1)
                    } else {
                        sos[si] = single_zpksos([z1], [p1, p2], 1)
                    }
                }
            } else {
                sos[si] = single_zpksos([], [p1, p2], 1)
            }
        }
    }
    if (z.length != 0 || p.length != 0) {
        throw new Error('Remaining zeros and poles exists, internal error')
    }
    for (let i = 0; i < 3; i++) {
        sos[0][i] *= k
    }
    return sos
}

function single_zpksos(z: Complex[], p: Complex[], k: number): number[] {
    let sos = zeros(6)
    let { b, a } = zpk2tf(z, p, k)
    let nb = b.length
    for (let i = 0; i < b.length; i++) {
        sos[3 - nb + i] = b[i]
    }
    let na = b.length
    for (let i = 0; i < a.length; i++) {
        sos[6 - na + i] = a[i]
    }
    return sos
}

function _relative_degree(z: Complex[], p: Complex[]): number {
    let degree = p.length - z.length
    if (degree < 0) {
        throw new Error("Improper transfer function. Must have at least as many poles as zeros.")
    }
    return degree
}

function nearest_real_complex_idx(fro: Complex[], to: Complex, which: string): number {
    // Get the next closest real or complex element based on distance
    if (!(['real', 'complex', 'any'].includes(which))) {
        throw new Error('which in nearest_real_complex_idx must be real, complex or any')
    }
    let decor = (v: any, i: number) => [v, i]
    let undecor = (a: any[]) => a[1]
    let argsort = (arr: any[]) => arr.map(decor).sort().map(undecor)
    let order = argsort(fro.map(v => v.sub(to).abs()))
    if (which == 'any') {
        return order[0]
    }
    let tmp = order.map(i => fro[i]) // reordered array
    let mask = tmp.map(v => v.im == 0) // isreal
    if (which == 'complex') {
        mask = mask.map(v => !v) // invert
    }
    for (let i = 0; i < mask.length; i++) {
        if (mask[i]) {
            return order[i]
        }
    }
    throw new Error('cannot find nearest value')
}
