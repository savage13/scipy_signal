
import { SOS } from './scipy'
import { asArray, sum, zeros } from './numpy'

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

export function sosfilt_zi(sos: SOS): number[][] {
    if (sos[0].length != 6) {
        throw new Error('sos mut be shape (n_sections, 6)')
    }
    let n_sections = sos.length
    let scale = 1.0
    let zi = []
    for (let i = 0; i < n_sections; i++) {
        let b = sos[i].slice(0, 3)
        let a = sos[i].slice(3)
        zi.push(lfilter_zi(b, a).map(v => v * scale))
        // If H(z) = B(z)/A(z) is this section's transfer function, then
        // b.sum()/a.sum() is H(1), the gain at omega=0.  That's the steady
        // state value of this section's step response.
        scale *= sum(b) / sum(a)
    }
    return zi
}

// after https://github.com/scipy/scipy/blob/v1.17.0/scipy/signal/_sosfilt.pyx
function _sosfilt(sos: SOS, xin: number[], zi: number[][]): number[] {
    let x = [...xin]
    let n_sections = sos.length
    for (let i = 0; i < x.length; i++) {
        let x_cur = 1.0 * x[i]
        for (let j = 0; j < n_sections; j++) {
            let x_new = sos[j][0] * x_cur + zi[j][0]
            zi[j][0] = sos[j][1] * x_cur - sos[j][4] * x_new + zi[j][1]
            zi[j][1] = sos[j][2] * x_cur - sos[j][5] * x_new
            x_cur = x_new
        }
        x[i] = x_cur
    }
    return x
}


export function sosfilt(sos: SOS, x: number[], zi: number[][]): number[] {
    // Extra preprocessing here if necessary
    if (zi == undefined) {
        zi = sos.map(_ => [0, 0])
    }
    return _sosfilt(sos, x, zi)
}

export function sosfiltfilt(sos: SOS, x: number[]): number[] {
    let axis = -1 // only 1D presently
    let padtype = 'odd'
    let padlen = -1 // none

    x = asArray(x) as number[]

    // validate sos and x
    let n_sections = sos.length
    let ntaps = 2 * n_sections + 1
    ntaps -= Math.min(sos.filter(v => v[2] == 0).length, sos.filter(v => v[5] == 0).length)
    let { edge, ext } = validate_pad(padtype, padlen, x, axis, ntaps)

    // Initial conditions
    let zi = sosfilt_zi(sos)
    let zi_fwd = zi.map(v => [v[0] * ext[0], v[1] * ext[0]])

    // Forward filter
    let y = sosfilt(sos, ext, zi_fwd)

    // Reverse
    let yrev = y.toReversed()

    // Initial conditions
    let zi_rev = zi.map(v => [v[0] * yrev[0], v[1] * yrev[0]]);

    // Reverse filter
    y = sosfilt(sos, yrev, zi_rev)

    // Reverse reverse data
    y = y.toReversed()
    if (edge > 0) {
        y = [...y.slice(edge, -edge)]
    }
    return y
}
