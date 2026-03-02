
import { zpolyval_from_roots, Complex } from '../scipy_signal.js'
import { deepEqualTolerance } from './deepEqualTolerance.js'

import test from 'node:test'
import suite from 'node:test'
import assert from 'node:assert'

suite('polyvalfromroots', () => {
    test('zpolyval_from_roots (1+0j) [(1+0j), (2+0j), (3+0j)]', (t) => {
        let x = new Complex(1.0,0.0)
        let r = [new Complex(1.0, 0.0), new Complex(2.0, 0.0), new Complex(3.0, 0.0)]
        let y = zpolyval_from_roots(x,r)
        const y_expect = new Complex(0.0, -0.0)
        deepEqualTolerance(y_expect, y, 1e-15)
    })
    test('zpolyval_from_roots 0j [(-1+0j), 0j, (1+0j)]', (t) => {
        let x = new Complex(0.0,0.0)
        let r = [new Complex(-1.0, 0.0), new Complex(0.0, 0.0), new Complex(1.0, 0.0)]
        let y = zpolyval_from_roots(x,r)
        const y_expect = new Complex(-0.0, 0.0)
        deepEqualTolerance(y_expect, y, 1e-15)
    })
    test('zpolyval_from_roots (1+0j) [(-1+0j), 0j, (1+0j)]', (t) => {
        let x = new Complex(1.0,0.0)
        let r = [new Complex(-1.0, 0.0), new Complex(0.0, 0.0), new Complex(1.0, 0.0)]
        let y = zpolyval_from_roots(x,r)
        const y_expect = new Complex(0.0, 0.0)
        deepEqualTolerance(y_expect, y, 1e-15)
    })
    test('zpolyval_from_roots (2+0j) [(-1+0j), 0j, (1+0j)]', (t) => {
        let x = new Complex(2.0,0.0)
        let r = [new Complex(-1.0, 0.0), new Complex(0.0, 0.0), new Complex(1.0, 0.0)]
        let y = zpolyval_from_roots(x,r)
        const y_expect = new Complex(6.0, 0.0)
        deepEqualTolerance(y_expect, y, 1e-15)
    })
    test('zpolyval_from_roots (3+0j) [(-1+0j), 0j, (1+0j)]', (t) => {
        let x = new Complex(3.0,0.0)
        let r = [new Complex(-1.0, 0.0), new Complex(0.0, 0.0), new Complex(1.0, 0.0)]
        let y = zpolyval_from_roots(x,r)
        const y_expect = new Complex(24.0, 0.0)
        deepEqualTolerance(y_expect, y, 1e-15)
    })
    test('zpolyval_from_roots (-2+0j) [(-2+0j), 0j]', (t) => {
        let x = new Complex(-2.0,0.0)
        let r = [new Complex(-2.0, 0.0), new Complex(0.0, 0.0)]
        let y = zpolyval_from_roots(x,r)
        const y_expect = new Complex(-0.0, 0.0)
        deepEqualTolerance(y_expect, y, 1e-15)
    })
    test('zpolyval_from_roots (1+0j) [(-2+0j), 0j]', (t) => {
        let x = new Complex(1.0,0.0)
        let r = [new Complex(-2.0, 0.0), new Complex(0.0, 0.0)]
        let y = zpolyval_from_roots(x,r)
        const y_expect = new Complex(3.0, 0.0)
        deepEqualTolerance(y_expect, y, 1e-15)
    })
    test('zpolyval_from_roots (-2+0j) [(-1+0j), (1+0j)]', (t) => {
        let x = new Complex(-2.0,0.0)
        let r = [new Complex(-1.0, 0.0), new Complex(1.0, 0.0)]
        let y = zpolyval_from_roots(x,r)
        const y_expect = new Complex(3.0, -0.0)
        deepEqualTolerance(y_expect, y, 1e-15)
    })
    test('zpolyval_from_roots (1+0j) [(-1+0j), (1+0j)]', (t) => {
        let x = new Complex(1.0,0.0)
        let r = [new Complex(-1.0, 0.0), new Complex(1.0, 0.0)]
        let y = zpolyval_from_roots(x,r)
        const y_expect = new Complex(0.0, 0.0)
        deepEqualTolerance(y_expect, y, 1e-15)
    })
})

