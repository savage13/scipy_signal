
import { Complex, asComplex, polyval } from '../scipy_signal.js'

import { deepEqualTolerance } from './deepEqualTolerance.js'

import test from 'node:test'
import suite from 'node:test'
import assert from 'node:assert'

suite('polyval', () => {
    test("empty", (t) => {
        deepEqualTolerance(polyval([], 0), 0)
    })
    test("constant", (t) => {
        deepEqualTolerance(polyval([0], 0), 0)
        deepEqualTolerance(polyval([1], 1), 1)
        deepEqualTolerance(polyval([1], 2), 1)
        deepEqualTolerance(polyval([1], -4.3), 1)
    })
    test("linear", (t) => {
        deepEqualTolerance(polyval([1, 1], 1), 2)
        deepEqualTolerance(polyval([1, 2], 1), 3)
        deepEqualTolerance(polyval([1, 1], 2), 3)

        deepEqualTolerance(polyval([1, 1], 2), 3)
    })
    test("long", (t) => {
        deepEqualTolerance(polyval([1, 2, 3, 4, 5], 1), 15)
        deepEqualTolerance(polyval([1, 2, 3, 4, 5], 2), 57)
    })

    test("complex linear", (t) => {
        deepEqualTolerance(polyval([1, 2], new Complex(1, 0)), new Complex(3, 0))
        deepEqualTolerance(polyval([1, 1], new Complex(1, 0)), new Complex(2, 0))
        deepEqualTolerance(polyval([1, 1], new Complex(0, 0)), new Complex(1, 0))
        deepEqualTolerance(polyval([1, 1], new Complex(2, 0)), new Complex(3, 0))
        deepEqualTolerance(polyval([1, 2], new Complex(2, 0)), new Complex(4, 0))
        deepEqualTolerance(polyval([0, 2], new Complex(2, 0)), new Complex(2, 0))
    })
    test("complex long", (t) => {
        deepEqualTolerance(polyval([1, 2, 3], new Complex(1, 0)), new Complex(6, 0))
        deepEqualTolerance(polyval([1, 2, 3, 4, 5], new Complex(1, 0)), new Complex(15, 0))
        deepEqualTolerance(polyval([1, 2, 3, 4, 5], new Complex(2, 0)), new Complex(57, 0))
        deepEqualTolerance(polyval([1, 2, 3, 4, 5], new Complex(0, 1)), new Complex(3, 2))
        deepEqualTolerance(polyval([1, 2, 3, 4, 5], new Complex(1, 1)), new Complex(1, 14))
        deepEqualTolerance(polyval([1, 2, 3, 4, 5], new Complex(2, 3)), new Complex(-213, -54))
        deepEqualTolerance(polyval([1.1, 2.2, 3.3], new Complex(2, 3)), new Complex(2.2, 19.8))
        deepEqualTolerance(polyval([1.1, -2.2, 3.3], new Complex(2, 3)), new Complex(-6.6, 6.6))
    })
})
