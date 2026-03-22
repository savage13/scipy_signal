
import { Complex } from './complex'

/**
 * Generate increasing or decreasing array
 * @param v0 start
 * @param v1 end
 * @param dk point spacing
 * @return generated array
 */
export function arange(v0: number, v1: number, dk: number): number[] {
    let out = []
    let v = v0
    let i = 0
    while (v < v1) {
        out.push(v)
        i += 1
        v = v0 + dk * i
    }
    return out
}
/**
 * Generate an array of zeros
 * @param n size of array
 * @return array of zeros
 */
export function zeros(n: number): number[] {
    let v = Array(n)
    for (let i = 0; i < n; i++) {
        v[i] = 0
    }
    return v
}
/**
 * Generate an array of ones
 * @param n size of array
 * @return array of ones
 */
export function ones(n: number): number[] {
    let v = Array(n)
    for (let i = 0; i < n; i++) {
        v[i] = 1
    }
    return v
}

/**
 * Find index of minimum value in an array
 * @param v array of values
 * @return index of minimum value
 */
export function argmin(v: number[]): number {
    if (v.length == 0)
        throw new Error("emtpy array into argmin")
    let k = 0;
    //console.log('argmin', v)
    for (let i = 1; i < v.length; i++) {
        if (v[i] < v[k]) {
            k = i
        }
    }
    return k

}
/**
 * Generate a linear sequence, array
 * @param start initial value
 * @param stop ending value
 * @param n number of values
 * @param options generation options
 *     - endpoint - include stop value (default: true)
 * @return generated sequence
 */
export function linspace(start: number, stop: number, n: number, options: any = {}): number[] {
    let default_options = {
        endpoint: true,
    }
    options = Object.assign({}, default_options, options)

    let div = n
    if (options.endpoint) {
        div = n - 1
    }

    let delta = stop - start
    if (delta == 0.0) {
        return zeros(n).map(_ => start)
    }
    let step = delta / div
    let y
    if (div > 0) {
        y = arange(0, n, 1).map(v => start + v * step)
    } else {
        y = arange(0, n, 1).map(v => start + v * delta)
    }
    return y
}

/**
 * Make sure a value is an array
 * @param x input value
 * @return output array
 */
export function asArray(x: number | number[] | Complex | Complex[]): (number | Complex)[] {
    if (Array.isArray(x)) {
        return x
    }
    return [x]
}

/**
 * Calculate the sum of an array
 * @param values input array
 * @return summation of the input array
 */
export function sum(values: number[]): number {
    let total = 0
    for (const value of values) {
        total += value
    }
    return total
}

