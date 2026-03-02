
import { Complex } from './complex'

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

export function zeros(n: number): number[] {
    let v = Array(n)
    for (let i = 0; i < n; i++) {
        v[i] = 0
    }
    return v
}
export function ones(n: number): number[] {
    let v = Array(n)
    for (let i = 0; i < n; i++) {
        v[i] = 1
    }
    return v
}

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
    let y = arange(0, n, 1).map(v => start + v * step)
    return y
}

export function asArray(x: number | number[] | Complex | Complex[]): (number | Complex)[] {
    if (Array.isArray(x)) {
        return x
    }
    return [x]
}

export function sum(values: number[]): number {
    let total = 0
    for (const value of values) {
        total += value
    }
    return total
}

