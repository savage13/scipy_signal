
import { buttap, lp2hp_zpk, Complex } from '../scipy_signal.js'
import { deepEqualTolerance } from './deepEqualTolerance.js'

import test from 'node:test'
import suite from 'node:test'
import assert from 'node:assert'

suite('lp2hp', () => {
    test('lp2hp n=2 0.1]', (t) => {
        let fs = 2.0;
        let {z,p,k} = buttap(2)
        let wo = 0.1;
        let w = 2 * fs * Math.tan(Math.PI * wo / fs);
        ({z, p, k} = lp2hp_zpk(z, p, k, w));
        const z_expect = [
            new Complex(0.0, 0.0),
            new Complex(0.0, 0.0),
        ]
        deepEqualTolerance(z_expect, z, 1e-15)
        const p_expect = [
            new Complex(-0.4479788471516627, -0.44797884715166264),
            new Complex(-0.4479788471516627, 0.44797884715166264),
        ]
        deepEqualTolerance(p_expect, p, 1e-15)
        const k_expect = 1.0
        deepEqualTolerance(k_expect, k, 1e-15)
    })
    test('lp2hp n=2 0.4]', (t) => {
        let fs = 2.0;
        let {z,p,k} = buttap(2)
        let wo = 0.4;
        let w = 2 * fs * Math.tan(Math.PI * wo / fs);
        ({z, p, k} = lp2hp_zpk(z, p, k, w));
        const z_expect = [
            new Complex(0.0, 0.0),
            new Complex(0.0, 0.0),
        ]
        deepEqualTolerance(z_expect, z, 1e-15)
        const p_expect = [
            new Complex(-2.0549725934920313, -2.054972593492031),
            new Complex(-2.0549725934920313, 2.054972593492031),
        ]
        deepEqualTolerance(p_expect, p, 1e-15)
        const k_expect = 1.0
        deepEqualTolerance(k_expect, k, 1e-15)
    })
    test('lp2hp n=3 0.1]', (t) => {
        let fs = 2.0;
        let {z,p,k} = buttap(3)
        let wo = 0.1;
        let w = 2 * fs * Math.tan(Math.PI * wo / fs);
        ({z, p, k} = lp2hp_zpk(z, p, k, w));
        const z_expect = [
            new Complex(0.0, 0.0),
            new Complex(0.0, 0.0),
            new Complex(0.0, 0.0),
        ]
        deepEqualTolerance(z_expect, z, 1e-15)
        const p_expect = [
            new Complex(-0.3167688806490726, -0.5486597955409153),
            new Complex(-0.6335377612981451, -0.0),
            new Complex(-0.3167688806490726, 0.5486597955409153),
        ]
        deepEqualTolerance(p_expect, p, 1e-15)
        const k_expect = 1.0
        deepEqualTolerance(k_expect, k, 1e-15)
    })
    test('lp2hp n=3 0.4]', (t) => {
        let fs = 2.0;
        let {z,p,k} = buttap(3)
        let wo = 0.4;
        let w = 2 * fs * Math.tan(Math.PI * wo / fs);
        ({z, p, k} = lp2hp_zpk(z, p, k, w));
        const z_expect = [
            new Complex(0.0, 0.0),
            new Complex(0.0, 0.0),
            new Complex(0.0, 0.0),
        ]
        deepEqualTolerance(z_expect, z, 1e-15)
        const p_expect = [
            new Complex(-1.453085056010722, -2.5168171447296377),
            new Complex(-2.9061701120214436, -0.0),
            new Complex(-1.453085056010722, 2.5168171447296377),
        ]
        deepEqualTolerance(p_expect, p, 1e-15)
        const k_expect = 1.0
        deepEqualTolerance(k_expect, k, 1e-15)
    })
    test('lp2hp n=2 0.7]', (t) => {
        let fs = 2.0;
        let {z,p,k} = buttap(2)
        let wo = 0.7;
        let w = 2 * fs * Math.tan(Math.PI * wo / fs);
        ({z, p, k} = lp2hp_zpk(z, p, k, w));
        const z_expect = [
            new Complex(0.0, 0.0),
            new Complex(0.0, 0.0),
        ]
        deepEqualTolerance(z_expect, z, 1e-15)
        const p_expect = [
            new Complex(-5.5511007890826, -5.551100789082599),
            new Complex(-5.5511007890826, 5.551100789082599),
        ]
        deepEqualTolerance(p_expect, p, 1e-15)
        const k_expect = 1.0
        deepEqualTolerance(k_expect, k, 1e-15)
    })
    test('lp2hp n=2 0.9]', (t) => {
        let fs = 2.0;
        let {z,p,k} = buttap(2)
        let wo = 0.9;
        let w = 2 * fs * Math.tan(Math.PI * wo / fs);
        ({z, p, k} = lp2hp_zpk(z, p, k, w));
        const z_expect = [
            new Complex(0.0, 0.0),
            new Complex(0.0, 0.0),
        ]
        deepEqualTolerance(z_expect, z, 1e-15)
        const p_expect = [
            new Complex(-17.85798604301423, -17.85798604301423),
            new Complex(-17.85798604301423, 17.85798604301423),
        ]
        deepEqualTolerance(p_expect, p, 1e-15)
        const k_expect = 1.0
        deepEqualTolerance(k_expect, k, 1e-15)
    })
})

