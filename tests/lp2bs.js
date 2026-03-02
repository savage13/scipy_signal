
import { buttap, lp2bs_zpk, Complex } from '../scipy_signal.js'
import { deepEqualTolerance } from './deepEqualTolerance.js'

import test from 'node:test'
import suite from 'node:test'
import assert from 'node:assert'

suite('lp2bs', () => {
    test('lp2bs n=2 [0.1, 0.2]', (t) => {
        let {z,p,k} = buttap(2)
        let w = [0.1, 0.2]
        let bw = w[1] - w[0]
        let wo = Math.sqrt(w[1] * w[0]);
        ({z, p, k} = lp2bs_zpk(z, p, k, wo, bw));
        const z_expect = [
            new Complex(0.0, 0.14142135623730953),
            new Complex(0.0, 0.14142135623730953),
            new Complex(-0.0, -0.14142135623730953),
            new Complex(-0.0, -0.14142135623730953),
        ]
        deepEqualTolerance(z_expect, z, 1e-15)
        const p_expect = [
            new Complex(-0.026533650707702902, 0.10634089301962805),
            new Complex(-0.026533650707702902, -0.10634089301962805),
            new Complex(-0.044177027410951863, -0.1770515711382828),
            new Complex(-0.044177027410951863, 0.1770515711382828),
        ]
        deepEqualTolerance(p_expect, p, 1e-15)
        const k_expect = 1.0
        deepEqualTolerance(k_expect, k, 1e-15)
    })
    test('lp2bs n=2 [0.4, 0.6]', (t) => {
        let {z,p,k} = buttap(2)
        let w = [0.4, 0.6]
        let bw = w[1] - w[0]
        let wo = Math.sqrt(w[1] * w[0]);
        ({z, p, k} = lp2bs_zpk(z, p, k, wo, bw));
        const z_expect = [
            new Complex(0.0, 0.4898979485566356),
            new Complex(0.0, 0.4898979485566356),
            new Complex(-0.0, -0.4898979485566356),
            new Complex(-0.0, -0.4898979485566356),
        ]
        deepEqualTolerance(z_expect, z, 1e-15)
        const p_expect = [
            new Complex(-0.06050668406519025, 0.41929352747007603),
            new Complex(-0.06050668406519025, -0.41929352747007603),
            new Complex(-0.08091467217211923, -0.5607148837073855),
            new Complex(-0.08091467217211923, 0.5607148837073855),
        ]
        deepEqualTolerance(p_expect, p, 1e-15)
        const k_expect = 1.0
        deepEqualTolerance(k_expect, k, 1e-15)
    })
    test('lp2bs n=3 [0.1, 0.2]', (t) => {
        let {z,p,k} = buttap(3)
        let w = [0.1, 0.2]
        let bw = w[1] - w[0]
        let wo = Math.sqrt(w[1] * w[0]);
        ({z, p, k} = lp2bs_zpk(z, p, k, wo, bw));
        const z_expect = [
            new Complex(0.0, 0.14142135623730953),
            new Complex(0.0, 0.14142135623730953),
            new Complex(0.0, 0.14142135623730953),
            new Complex(-0.0, -0.14142135623730953),
            new Complex(-0.0, -0.14142135623730953),
            new Complex(-0.0, -0.14142135623730953),
        ]
        deepEqualTolerance(z_expect, z, 1e-15)
        const p_expect = [
            new Complex(-0.01758348588305032, 0.10266106975381584),
            new Complex(-0.05, 0.13228756555322957),
            new Complex(-0.01758348588305032, -0.10266106975381584),
            new Complex(-0.032416514116949686, -0.18926361013225967),
            new Complex(-0.05, -0.13228756555322957),
            new Complex(-0.032416514116949686, 0.18926361013225967),
        ]
        deepEqualTolerance(p_expect, p, 1e-15)
        const k_expect = 1.0
        deepEqualTolerance(k_expect, k, 1e-15)
    })
    test('lp2bs n=3 [0.4, 0.6]', (t) => {
        let {z,p,k} = buttap(3)
        let w = [0.4, 0.6]
        let bw = w[1] - w[0]
        let wo = Math.sqrt(w[1] * w[0]);
        ({z, p, k} = lp2bs_zpk(z, p, k, wo, bw));
        const z_expect = [
            new Complex(0.0, 0.4898979485566356),
            new Complex(0.0, 0.4898979485566356),
            new Complex(0.0, 0.4898979485566356),
            new Complex(-0.0, -0.4898979485566356),
            new Complex(-0.0, -0.4898979485566356),
            new Complex(-0.0, -0.4898979485566356),
        ]
        deepEqualTolerance(z_expect, z, 1e-15)
        const p_expect = [
            new Complex(-0.04125318793430266, 0.40844948387891905),
            new Complex(-0.09999999999999998, 0.4795831523312719),
            new Complex(-0.04125318793430266, -0.40844948387891905),
            new Complex(-0.05874681206569733, -0.5816545646358067),
            new Complex(-0.09999999999999998, -0.4795831523312719),
            new Complex(-0.05874681206569733, 0.5816545646358067),
        ]
        deepEqualTolerance(p_expect, p, 1e-15)
        const k_expect = 1.0
        deepEqualTolerance(k_expect, k, 1e-15)
    })
})

