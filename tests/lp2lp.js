
import { buttap, lp2lp_zpk, Complex } from '../scipy_signal.js'
import { deepEqualTolerance } from './deepEqualTolerance.js'

import test from 'node:test'
import suite from 'node:test'
import assert from 'node:assert'

suite('lp2lp', () => {
    test('lp2lp n=2 0.1]', (t) => {
        let {z,p,k} = buttap(2)
        let wo = 0.1;
        ({z, p, k} = lp2lp_zpk(z, p, k, wo));
        const z_expect = [
        ]
        deepEqualTolerance(z_expect, z, 1e-15)
        const p_expect = [
            new Complex(-0.07071067811865477, 0.07071067811865475),
            new Complex(-0.07071067811865477, -0.07071067811865475),
        ]
        deepEqualTolerance(p_expect, p, 1e-15)
        const k_expect = 0.010000000000000002
        deepEqualTolerance(k_expect, k, 1e-15)
    })
    test('lp2lp n=2 0.4]', (t) => {
        let {z,p,k} = buttap(2)
        let wo = 0.4;
        ({z, p, k} = lp2lp_zpk(z, p, k, wo));
        const z_expect = [
        ]
        deepEqualTolerance(z_expect, z, 1e-15)
        const p_expect = [
            new Complex(-0.28284271247461906, 0.282842712474619),
            new Complex(-0.28284271247461906, -0.282842712474619),
        ]
        deepEqualTolerance(p_expect, p, 1e-15)
        const k_expect = 0.16000000000000003
        deepEqualTolerance(k_expect, k, 1e-15)
    })
    test('lp2lp n=3 0.1]', (t) => {
        let {z,p,k} = buttap(3)
        let wo = 0.1;
        ({z, p, k} = lp2lp_zpk(z, p, k, wo));
        const z_expect = [
        ]
        deepEqualTolerance(z_expect, z, 1e-15)
        const p_expect = [
            new Complex(-0.05000000000000002, 0.08660254037844387),
            new Complex(-0.1, -0.0),
            new Complex(-0.05000000000000002, -0.08660254037844387),
        ]
        deepEqualTolerance(p_expect, p, 1e-15)
        const k_expect = 0.0010000000000000002
        deepEqualTolerance(k_expect, k, 1e-15)
    })
    test('lp2lp n=3 0.4]', (t) => {
        let {z,p,k} = buttap(3)
        let wo = 0.4;
        ({z, p, k} = lp2lp_zpk(z, p, k, wo));
        const z_expect = [
        ]
        deepEqualTolerance(z_expect, z, 1e-15)
        const p_expect = [
            new Complex(-0.20000000000000007, 0.34641016151377546),
            new Complex(-0.4, -0.0),
            new Complex(-0.20000000000000007, -0.34641016151377546),
        ]
        deepEqualTolerance(p_expect, p, 1e-15)
        const k_expect = 0.06400000000000002
        deepEqualTolerance(k_expect, k, 1e-15)
    })
})

