
import { buttap, Complex } from '../scipy_signal.js'
import { deepEqualTolerance } from './deepEqualTolerance.js'

import test from 'node:test'
import suite from 'node:test'
import assert from 'node:assert'

suite('buttap', () => {
    test('buttap n=2', (t) => {
        let {z,p,k} = buttap(2)
        const z_expect = [
        ]
        deepEqualTolerance(z_expect, z, 1e-15)
        const p_expect = [
            new Complex(-0.7071067811865476, 0.7071067811865475),
            new Complex(-0.7071067811865476, -0.7071067811865475),
        ]
        deepEqualTolerance(p_expect, p, 1e-15)
        const k_expect = 1.0
        deepEqualTolerance(k_expect, k, 1e-15)
    })
    test('buttap n=3', (t) => {
        let {z,p,k} = buttap(3)
        const z_expect = [
        ]
        deepEqualTolerance(z_expect, z, 1e-15)
        const p_expect = [
            new Complex(-0.5000000000000001, 0.8660254037844386),
            new Complex(-1.0, -0.0),
            new Complex(-0.5000000000000001, -0.8660254037844386),
        ]
        deepEqualTolerance(p_expect, p, 1e-15)
        const k_expect = 1.0
        deepEqualTolerance(k_expect, k, 1e-15)
    })
    test('buttap n=4', (t) => {
        let {z,p,k} = buttap(4)
        const z_expect = [
        ]
        deepEqualTolerance(z_expect, z, 1e-15)
        const p_expect = [
            new Complex(-0.38268343236508984, 0.9238795325112867),
            new Complex(-0.9238795325112867, 0.3826834323650898),
            new Complex(-0.9238795325112867, -0.3826834323650898),
            new Complex(-0.38268343236508984, -0.9238795325112867),
        ]
        deepEqualTolerance(p_expect, p, 1e-15)
        const k_expect = 1.0
        deepEqualTolerance(k_expect, k, 1e-15)
    })
    test('buttap n=5', (t) => {
        let {z,p,k} = buttap(5)
        const z_expect = [
        ]
        deepEqualTolerance(z_expect, z, 1e-15)
        const p_expect = [
            new Complex(-0.30901699437494745, 0.9510565162951535),
            new Complex(-0.8090169943749475, 0.5877852522924731),
            new Complex(-1.0, -0.0),
            new Complex(-0.8090169943749475, -0.5877852522924731),
            new Complex(-0.30901699437494745, -0.9510565162951535),
        ]
        deepEqualTolerance(p_expect, p, 1e-15)
        const k_expect = 1.0
        deepEqualTolerance(k_expect, k, 1e-15)
    })
    test('buttap n=6', (t) => {
        let {z,p,k} = buttap(6)
        const z_expect = [
        ]
        deepEqualTolerance(z_expect, z, 1e-15)
        const p_expect = [
            new Complex(-0.25881904510252096, 0.9659258262890682),
            new Complex(-0.7071067811865476, 0.7071067811865475),
            new Complex(-0.9659258262890683, 0.25881904510252074),
            new Complex(-0.9659258262890683, -0.25881904510252074),
            new Complex(-0.7071067811865476, -0.7071067811865475),
            new Complex(-0.25881904510252096, -0.9659258262890682),
        ]
        deepEqualTolerance(p_expect, p, 1e-15)
        const k_expect = 1.0
        deepEqualTolerance(k_expect, k, 1e-15)
    })
})

