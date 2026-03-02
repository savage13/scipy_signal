
import { buttap, lp2bp_zpk, Complex } from '../scipy_signal.js'
import { deepEqualTolerance } from './deepEqualTolerance.js'

import test from 'node:test'
import suite from 'node:test'
import assert from 'node:assert'

suite('lp2bp', () => {
    test('lp2bp n=2 [0.1, 0.2]', (t) => {
        let fs = 2.0
        let {z,p,k} = buttap(2)
        let Wn = [0.1, 0.2]
        let w = [2 * fs * Math.tan(Math.PI * Wn[0] / fs), 2 * fs * Math.tan(Math.PI * Wn[1] / fs)]
        let bw = w[1] - w[0]
        let wo = Math.sqrt(w[1] * w[0]);
        ({z, p, k} = lp2bp_zpk(z, p, k, wo, bw));
        const z_expect = [
            new Complex(0.0, 0.0),
            new Complex(0.0, 0.0),
        ]
        deepEqualTolerance(z_expect, z, 3e-13)
        const p_expect = [
            new Complex(-0.17452632039206406, -0.6739424214396487),
            new Complex(-0.17452632039206406, 0.6739424214396487),
            new Complex(-0.2965065146457179, 1.1449752564774305),
            new Complex(-0.2965065146457179, -1.1449752564774305),
        ]
        deepEqualTolerance(p_expect, p, 3e-13)
        const k_expect = 0.44374386336746063
        deepEqualTolerance(k_expect, k, 3e-13)
    })
    test('lp2bp n=2 [0.4, 0.6]', (t) => {
        let fs = 2.0
        let {z,p,k} = buttap(2)
        let Wn = [0.4, 0.6]
        let w = [2 * fs * Math.tan(Math.PI * Wn[0] / fs), 2 * fs * Math.tan(Math.PI * Wn[1] / fs)]
        let bw = w[1] - w[0]
        let wo = Math.sqrt(w[1] * w[0]);
        ({z, p, k} = lp2bp_zpk(z, p, k, wo, bw));
        const z_expect = [
            new Complex(0.0, 0.0),
            new Complex(0.0, 0.0),
        ]
        deepEqualTolerance(z_expect, z, 3e-13)
        const p_expect = [
            new Complex(-0.7081588076630846, -3.086541829461103),
            new Complex(-0.7081588076630846, 3.086541829461103),
            new Complex(-1.1298645567158037, 4.924565193839991),
            new Complex(-1.1298645567158037, -4.924565193839991),
        ]
        deepEqualTolerance(p_expect, p, 3e-13)
        const k_expect = 6.7566597760053755
        deepEqualTolerance(k_expect, k, 3e-13)
    })
    test('lp2bp n=3 [0.1, 0.2]', (t) => {
        let fs = 2.0
        let {z,p,k} = buttap(3)
        let Wn = [0.1, 0.2]
        let w = [2 * fs * Math.tan(Math.PI * Wn[0] / fs), 2 * fs * Math.tan(Math.PI * Wn[1] / fs)]
        let bw = w[1] - w[0]
        let wo = Math.sqrt(w[1] * w[0]);
        ({z, p, k} = lp2bp_zpk(z, p, k, wo, bw));
        const z_expect = [
            new Complex(0.0, 0.0),
            new Complex(0.0, 0.0),
            new Complex(0.0, 0.0),
        ]
        deepEqualTolerance(z_expect, z, 3e-13)
        const p_expect = [
            new Complex(-0.11537102609206894, -0.6504248572295293),
            new Complex(-0.33307051181674, -0.8440732325873211),
            new Complex(-0.11537102609206894, 0.6504248572295293),
            new Complex(-0.21769948572467113, 1.227319906199093),
            new Complex(-0.33307051181674, 0.8440732325873211),
            new Complex(-0.21769948572467113, -1.227319906199093),
        ]
        deepEqualTolerance(p_expect, p, 3e-13)
        const k_expect = 0.29559599137467535
        deepEqualTolerance(k_expect, k, 3e-13)
    })
    test('lp2bp n=3 [0.4, 0.6]', (t) => {
        let fs = 2.0
        let {z,p,k} = buttap(3)
        let Wn = [0.4, 0.6]
        let w = [2 * fs * Math.tan(Math.PI * Wn[0] / fs), 2 * fs * Math.tan(Math.PI * Wn[1] / fs)]
        let bw = w[1] - w[0]
        let wo = Math.sqrt(w[1] * w[0]);
        ({z, p, k} = lp2bp_zpk(z, p, k, wo, bw));
        const z_expect = [
            new Complex(0.0, 0.0),
            new Complex(0.0, 0.0),
            new Complex(0.0, 0.0),
        ]
        deepEqualTolerance(z_expect, z, 3e-13)
        const p_expect = [
            new Complex(-0.4717925426690115, -2.982520514185273),
            new Complex(-1.2996787849316245, -3.782966436012703),
            new Complex(-0.4717925426690115, 2.982520514185273),
            new Complex(-0.8278862422626132, 5.23363020320623),
            new Complex(-1.2996787849316245, 3.782966436012703),
            new Complex(-0.8278862422626132, -5.23363020320623),
        ]
        deepEqualTolerance(p_expect, p, 3e-13)
        const k_expect = 17.562974735750096
        deepEqualTolerance(k_expect, k, 3e-13)
    })
})

