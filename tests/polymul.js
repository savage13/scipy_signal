
import { polymul, Complex } from '../scipy_signal.js'
import { deepEqualTolerance } from './deepEqualTolerance.js'

import test from 'node:test'
import suite from 'node:test'
import assert from 'node:assert'

suite('polymul', () => {
    test('polymul [1, 2, 3] [3, 2, 1]', (t) => {
        let a = [new Complex(1, 0), new Complex(2, 0), new Complex(3, 0)]
        let b = [new Complex(3, 0), new Complex(2, 0), new Complex(1, 0)]
        let y = polymul(a,b)
        const y_expect = [new Complex(3.0, 0.0), new Complex(8.0, 0.0), new Complex(14.0, 0.0), new Complex(8.0, 0.0), new Complex(3.0, 0.0)]
        deepEqualTolerance(y_expect, y, 1e-15)
    })
    test('polymul [3, 2, 1] [1, 2, 3]', (t) => {
        let a = [new Complex(3, 0), new Complex(2, 0), new Complex(1, 0)]
        let b = [new Complex(1, 0), new Complex(2, 0), new Complex(3, 0)]
        let y = polymul(a,b)
        const y_expect = [new Complex(3.0, 0.0), new Complex(8.0, 0.0), new Complex(14.0, 0.0), new Complex(8.0, 0.0), new Complex(3.0, 0.0)]
        deepEqualTolerance(y_expect, y, 1e-15)
    })
    test('polymul [3, 2, 1] [1]', (t) => {
        let a = [new Complex(3, 0), new Complex(2, 0), new Complex(1, 0)]
        let b = [new Complex(1, 0)]
        let y = polymul(a,b)
        const y_expect = [new Complex(3.0, 0.0), new Complex(2.0, 0.0), new Complex(1.0, 0.0)]
        deepEqualTolerance(y_expect, y, 1e-15)
    })
    test('polymul [3, 2, 1] [0]', (t) => {
        let a = [new Complex(3, 0), new Complex(2, 0), new Complex(1, 0)]
        let b = [new Complex(0, 0)]
        let y = polymul(a,b)
        const y_expect = [new Complex(0.0, 0.0), new Complex(0.0, 0.0), new Complex(0.0, 0.0)]
        deepEqualTolerance(y_expect, y, 1e-15)
    })
    test('polymul [3, 2, 1] [0, 0, 0, 0]', (t) => {
        let a = [new Complex(3, 0), new Complex(2, 0), new Complex(1, 0)]
        let b = [new Complex(0, 0), new Complex(0, 0), new Complex(0, 0), new Complex(0, 0)]
        let y = polymul(a,b)
        const y_expect = [new Complex(0.0, 0.0), new Complex(0.0, 0.0), new Complex(0.0, 0.0)]
        deepEqualTolerance(y_expect, y, 1e-15)
    })
    test('polymul [1, 2] [(1+1j), (2-1j)]', (t) => {
        let a = [new Complex(1, 0), new Complex(2, 0)]
        let b = [new Complex(1.0, 1.0), new Complex(2.0, -1.0)]
        let y = polymul(a,b)
        const y_expect = [new Complex(1.0, 1.0), new Complex(4.0, 1.0), new Complex(4.0, -2.0)]
        deepEqualTolerance(y_expect, y, 1e-15)
    })
})

