
import { arange, zeros, asArray, sum, linspace, argmin } from './numpy.js'
import { Complex, zprod, poly, zpolyval_from_roots, cplxreal, asComplex } from './complex.js'

export { Complex, zpolyval_from_roots, polymul, cplxreal, poly } from './complex.js'
export { zeros, ones, linspace, arange } from './numpy.js'

const band_dict: { [key: string]: string } = {
    'band': 'bandpass',
    'bandpass': 'bandpass',
    'pass': 'bandpass',
    'bp': 'bandpass',

    'bs': 'bandstop',
    'bandstop': 'bandstop',
    'bands': 'bandstop',
    'stop': 'bandstop',

    'l': 'lowpass',
    'low': 'lowpass',
    'lowpass': 'lowpass',
    'lp': 'lowpass',

    'high': 'highpass',
    'highpass': 'highpass',
    'h': 'highpass',
    'hp': 'highpass',
}

const filter_dict: { [key: string]: string } = {
    'butter': 'butter',
    'butterworth': 'butter',

    // 'cauer': [ellipap, ellipord],
    // 'elliptic': [ellipap, ellipord],
    // 'ellip': [ellipap, ellipord],

    // 'bessel': 'bessel',
    // 'bessel_phase': [besselap],
    // 'bessel_delay': [besselap],
    // 'bessel_mag': [besselap],

    // 'cheby1': [cheb1ap, cheb1ord],
    // 'chebyshev1': [cheb1ap, cheb1ord],
    // 'chebyshevi': [cheb1ap, cheb1ord],

    // 'cheby2': [cheb2ap, cheb2ord],
    // 'chebyshev2': [cheb2ap, cheb2ord],
    // 'chebyshevii': [cheb2ap, cheb2ord],
}

type ZPK = {
    z: Complex[];
    p: Complex[];
    k: number;
}
type BA = {
    b: number[];
    a: number[];
}
type SOS = number[][]; // Second order sections


function is_number(n: any): boolean {
    return parseInt(n) == n
}

function is_positive_number(n: any): boolean {
    return is_number(n) && n > 0
}

export function buttap(N: number): ZPK {
    if (!is_positive_number(N)) {
        throw new Error("Filter order must be a nonnegative integer")
    }
    let z: Complex[] = []
    let m = arange(-N + 1, N, 2)

    let p = m.map(mi => new Complex(Math.PI * mi / (2 * N), 0))
        .map(mi => mi.mul(new Complex(0, 1)))
        .map(mi => mi.exp())
        .map(mi => mi.neg())
    let k = 1.0
    return { z, p, k }
}

function _relative_degree(z: Complex[], p: Complex[]): number {
    let degree = p.length - z.length
    if (degree < 0) {
        throw new Error("Improper transfer function. Must have at least as many poles as zeros.")
    }
    return degree
}

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

export function zpk2tf(z: Complex[], p: Complex[], k: number): BA {
    z = asArray(z) as Complex[]
    p = asArray(p) as Complex[]
    let a = poly(p).map(v => v.re)
    let b = poly(z).map(v => v.re * k)
    return { b, a }
}

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

export function lfilter_zi(b: number[], a: number[]): number[] {
    b = [...asArray(b) as number[]]
    a = [...asArray(a) as number[]]

    if (a[0] != 1.0) {
        throw new Error("a[0] must be 1.0")
    }
    let n = Math.max(a.length, b.length)
    for (let i = a.length; i < n; i++) {
        a.push(0)
    }
    for (let i = b.length; i < n; i++) {
        b.push(0)
    }
    // np.eye(n-1) - scipy.linalg.companion(a)
    let IminusA = a.slice(1)
    IminusA[0] += 1
    let B = b.map((_, i) => b[i] - a[i] * b[0])
    B.shift()

    let zi = zeros(n - 1)
    zi[0] = sum(B) / sum(IminusA)
    let asum = 1.0
    let csum = 0.0
    for (let k = 1; k < n - 1; k++) {
        asum += a[k]
        csum += b[k] - a[k] * b[0]
        zi[k] = asum * zi[0] - csum
    }
    return zi
}

function validate_pad(padtype: string, padlen: number, x: number[], axis: number, ntaps: number): { edge: number, ext: number[] } {
    const padtypes = { even: 1, odd: 1, constant: 1, none: 1 }
    let edge = 0
    if (!(padtype in padtypes)) {
        throw new Error(`Unknown value ${padtype} given to padtype`)
    }
    if (padtype == 'none') {
        padlen = 0
    }
    if (padlen < 0) {
        edge = ntaps * 3
    } else {
        edge = padlen
    }
    if (axis != -1 && axis != 0) {
        throw new Error("Unimplemented filter of multiple axis, 0 or -1 supported")
    }
    if (Array.isArray(x[0])) {
        throw new Error("Unoimplmented filter of multiple dimension data")
    }
    let ext: number[] = []
    if (padtype != 'none' && edge > 0) {
        switch (padtype) {
            case 'even':
                throw new Error("unimplemented pad type")
            case 'odd': ext = odd_ext(x, edge); break;
            case 'constant':
                throw new Error("unimplemented pad type")
        }
    } else {
        ext = x
    }
    return { edge, ext }
}

function odd_ext(x: number[], n: number): number[] {
    if (n < 1) {
        return x
    }
    if (n > (x.length - 1)) {
        throw new Error(`The extension length ${n} is too big ${x.length - 1}`)
    }
    let m = x.length
    const x0 = x[0]
    const x1 = x[m - 1]
    let left_end = Array(n).fill(0).map((_, i) => 2 * x0 - x[n - i])
    let right_end = Array(n).fill(0).map((_, i) => 2 * x1 - x[m - i - 2])
    return [...left_end, ...x, ...right_end]
}

export function lfilter(b: number[], a: number[], x: number[], axis: number, zi: number[]): { y: number[], zf: number[] } {
    axis = axis * 1 // unused
    const z = [...zi]
    const y = zeros(x.length)
    for (let i = 0; i < x.length; i++) {
        let ai = 0
        let bi = 0
        let zi = 0
        y[i] = z[zi] + b[bi] * x[i]
        ai++
        bi++
        for (let n = 0; n < b.length - 2; n++) {
            z[zi] = z[zi + 1] + x[i] * b[bi] - y[i] * a[ai]
            ai++
            bi++
            zi++
        }
        z[zi] = x[i] * b[bi] - y[i] * a[ai]
    }
    return { y, zf: z }
}

export function filtfilt(b: number[], a: number[], x: number[]): number[] {
    let axis = -1
    // let method = 'pad'
    let padtype = 'odd' // Only supported
    let padlen = -1

    b = asArray(b) as number[]
    a = asArray(a) as number[]
    x = asArray(x) as number[]

    let ntaps = Math.max(a.length, b.length)
    let { edge, ext } = validate_pad(padtype, padlen, x, axis, ntaps)

    let zi = lfilter_zi(b, a)

    const zi_fwd = zi.map(v => v * ext[0])

    let { y } = lfilter(b, a, ext, axis, zi_fwd)

    let yrev = y.toReversed()

    let zi_rev = zi.map(v => v * yrev[0]);
    ({ y } = lfilter(b, a, yrev, axis, zi_rev));

    y = y.toReversed()

    if (edge > 0) {
        y = [...y.slice(edge, -edge)]
    }
    return y
}

export function freqz_zpk(z: Complex[], p: Complex[], k: number, options: any = {}): { w: number[], h: Complex[] } {
    const default_options = {
        worN: 512,
        whole: false,
        fs: 2 * Math.PI,
    }

    const TAU = 2 * Math.PI

    z = asArray(z) as Complex[]
    p = asArray(p) as Complex[]

    options = Object.assign({}, default_options, options)

    let lastpoint = (options.whole) ? TAU : Math.PI

    let w: number[] = []
    if (options.worN == -1) { // none
        w = linspace(0, lastpoint, 512, { endpoint: false })
    } else if (Number.isInteger(options.worN)) {
        w = linspace(0, lastpoint, options.worN, { endpoint: false })
    } else {
        w = asArray(options.worN) as number[]
        w = w.map(v => TAU * v / options.fs)
    }
    let zm1 = w.map(v => new Complex(0, v).exp())
    let h: Complex[] = []
    let k0 = new Complex(k, 0)
    for (const zm of zm1) {
        let numer = zpolyval_from_roots(zm, z)
        let denom = zpolyval_from_roots(zm, p)
        h.push(numer.div(denom).mul(k0))
    }

    w = w.map(v => v * options.fs / TAU)

    return { w, h }
}


export function iirfilter(N: number, Wn: number | number[], options: any): ZPK | BA {
    let fs = 1.0
    let warped = []
    let z: Complex[]
    let p: Complex[]
    let k: number

    const output_types = ["ba", "sos", "zpk"]
    const default_options = {
        btype: 'bandpass',
        analog: false,
        ftype: 'butter',
        output: 'ba',
    }

    // Option Processing
    Wn = asArray(Wn) as number[]
    if (Wn.length > 1 && Wn[0] >= Wn[1]) {
        throw new Error("Wn[0] must be less than Wn[1]")
    }

    // Set default options
    options = Object.assign({}, default_options, options)

    let btype = band_dict[options.btype.toLowerCase()]
    if (btype === undefined) {
        throw new Error(`${options.btype} is an invalid bandtype for filter`)
    }
    let ftype = filter_dict[options.ftype.toLowerCase()]
    if (ftype === undefined) {
        throw new Error(`${options.ftype} is not a valid basic IIR filter`)
    }
    if (!output_types.includes(options.output)) {
        throw new Error(`${options.output} is not a valid output form`)
    }

    // Low pass prototype
    switch (ftype) {
        case 'butter': ({ z, p, k } = buttap(N)); break
        default:
            throw new Error(`${options.ftype} not implemented in iirfilter`)
    }

    // Pre-warp frequencies for digital filter design
    if (!options.analog) {
        if (Wn.some(w => w <= 0 || w >= 1)) {
            throw new Error('Digital filter critical frequencies must be 0 < Wn < 1')
        }
        fs = 2.0
        warped = Wn.map(w => 2 * fs * Math.tan(Math.PI * w / fs))
    } else {
        warped = Wn
    }

    switch (btype) {
        case 'lowpass':
            ({ z, p, k } = lp2lp_zpk(z, p, k, warped[0]))
            break
        case 'highpass':
            ({ z, p, k } = lp2hp_zpk(z, p, k, warped[0]))
            break
        case 'bandpass':
            {
                let bw = warped[1] - warped[0]
                let wo = Math.sqrt(warped[0] * warped[1]);
                ({ z, p, k } = lp2bp_zpk(z, p, k, wo, bw))
            }
            break
        case 'bandstop':
            {
                let bw = warped[1] - warped[0]
                let wo = Math.sqrt(warped[0] * warped[1]);
                ({ z, p, k } = lp2bs_zpk(z, p, k, wo, bw))
            }
            break
    }
    if (!options.analog) {
        ({ z, k, p } = bilinear_zpk(z, p, k, fs));
    }

    switch (options.output) {
        case 'zpk': return { z, p, k }
        case 'ba': return zpk2tf(z, p, k)
        case 'sos': throw new Error("sos output not implemented")
        default:
            throw new Error("unknown output type")
    }
}

export function butter(N: number, Wn: number | number[], options: any = {}): BA | ZPK {
    // N = order
    // Wn = frequencies
    // options
    options.ftype = 'butter'
    return iirfilter(N, Wn, options)
}


function butter_bandrej(cutoffs: number[], fs: number, order: number = 2): BA | ZPK {
    const options = { btype: 'bandstop', analog: false }
    const nyq = 0.5 * fs
    const normal_cutoffs = cutoffs.map(f => f / nyq)
    return butter(order, normal_cutoffs, options)
}

export function butter_bandrej_filtfilt(data: number[], cutoffs: number[], fs: number, order: number = 2): number[] {
    // data - 1D array of data
    // cutoffs - []
    let { b, a } = butter_bandrej(cutoffs, fs, order) as BA
    return filtfilt(b, a, data)
}
