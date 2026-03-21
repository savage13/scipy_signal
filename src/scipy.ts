
import { arange, asArray, linspace } from './numpy'
import { Complex, zpolyval_from_roots } from './complex'
import { lp2lp_zpk, lp2hp_zpk, lp2bp_zpk, lp2bs_zpk, zpk2tf, zpk2sos, bilinear_zpk } from './zpk'
import { filtfilt } from './filter'
import { polyval } from './poly'

export { Complex, zpolyval_from_roots, polymul, cplxreal, poly, asComplex } from './complex'
export { zeros, ones, linspace, arange } from './numpy'
export { lp2lp_zpk, lp2hp_zpk, lp2bp_zpk, lp2bs_zpk, zpk2tf, zpk2sos, bilinear_zpk } from './zpk'
export { filtfilt, sosfilt, sosfiltfilt } from './filter'
export { polyval } from './poly'

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

export type ZPK = {
    z: Complex[];
    p: Complex[];
    k: number;
}
export type BA = {
    b: number[];
    a: number[];
}
export type SOS = number[][]; // Second order sections

/**
 * Check is value is an integer
 * @param n Value
 * @return true if an integer
 *
 */
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

export function freqz_zpk(z: Complex[], p: Complex[], k: number, options: any = {}): { w: number[], h: Complex[] } {

    const TAU = 2 * Math.PI

    z = asArray(z) as Complex[]
    p = asArray(p) as Complex[]

    let w = freqz_options(options)

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

function freqz_options(options: any = {}): number[] {
    const TAU = 2 * Math.PI
    const default_options = {
        worN: 512,
        whole: false,
        fs: TAU,
    }
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
    return w
}

function _freqz(b: number[], a: number[], zm1: Complex[]): Complex[] {
    let h = []
    for (const zm of zm1) {
        let numer = polyval(b, zm) as Complex
        let denom = polyval(a, zm) as Complex
        h.push(numer.div(denom))
    }
    return h
}

export function freqz(b: number[], a: number[], options: any = {}): { w: number[], h: Complex[] } {
    const TAU = 2 * Math.PI

    let w = freqz_options(options)

    let zm1 = w.map(v => new Complex(0, v).exp())
    let h = _freqz(b, a, zm1)
    w = w.map(v => v * options.fs / TAU)

    return { w, h }
}

export function freqz_sos(sos: SOS, options: any = {}): { w: number[], h: Complex[] } {
    const TAU = 2 * Math.PI
    let n_sections = sos.length

    let w = freqz_options(options)

    let zm1 = w.map(v => new Complex(0, v).exp())

    let h = w.map(_ => new Complex(1, 0))

    for (let j = 0; j < n_sections; j++) {
        let row = sos[j];
        let b = row.slice(0, 3)
        let a = row.slice(3)
        let h0 = _freqz(b, a, zm1)
        h = h.map((_, i) => h[i].mul(h0[i]))
    }
    w = w.map(v => v * options.fs / TAU)
    return { w, h }
}


export function iirfilter(N: number, Wn: number | number[], options: any): ZPK | BA | SOS {
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
        case 'sos': return zpk2sos(z, p, k)
        default:
            throw new Error("unknown output type")
    }
}

export function butter(N: number, Wn: number | number[], options: any = {}): BA | ZPK | SOS {
    // N = order
    // Wn = frequencies
    // options
    options.ftype = 'butter'
    return iirfilter(N, Wn, options)
}


function butter_bandrej(cutoffs: number[], fs: number, order: number = 2): BA | ZPK | SOS {
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
