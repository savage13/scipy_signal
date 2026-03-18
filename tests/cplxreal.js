
import { cplxreal, Complex } from '../scipy_signal.js'
import { deepEqualTolerance } from './deepEqualTolerance.js'

import test from 'node:test'
import suite from 'node:test'
import assert from 'node:assert'

suite('cplxreal', () => {
    test("empty", (t) => {
        deepEqualTolerance(cplxreal([]), [[],[]])
    })
    test("single real", (t) => {
        deepEqualTolerance(cplxreal([1]), [[],[1]])
        deepEqualTolerance(cplxreal([0]), [[],[0]])
        deepEqualTolerance(cplxreal([-2]), [[],[-2]])
        deepEqualTolerance(cplxreal([-2.3]), [[],[-2.3]])
    })
    test("multiple real", (t) => {
        deepEqualTolerance(cplxreal([1,2,3]), [[],[1,2,3]])
        deepEqualTolerance(cplxreal([3,2,1]), [[],[1,2,3]])
        deepEqualTolerance(cplxreal([2,3,1]), [[],[1,2,3]])
        deepEqualTolerance(cplxreal([2,1,3]), [[],[1,2,3]])
        deepEqualTolerance(cplxreal([2,1,-3]), [[],[-3,1,2]])
        deepEqualTolerance(cplxreal([2.8,1.1,-3.2]), [[],[-3.2,1.1,2.8]])
    })
    test("single complex pair", (t) => {
        deepEqualTolerance(cplxreal([ new Complex(0,1), new Complex(0,-1) ]), [
            [new Complex(0,1)],[]
        ])
        deepEqualTolerance(cplxreal([ new Complex(0,-1), new Complex(0,1) ]), [
            [new Complex(0,1)],[]
        ])
        deepEqualTolerance(cplxreal([ new Complex(0,0), new Complex(0,0) ]), [
            [],[0,0]
        ])
        deepEqualTolerance(cplxreal([ new Complex(1,1), new Complex(1,-1) ]), [
            [new Complex(1,1)],[]
        ])
        deepEqualTolerance(cplxreal([ new Complex(Math.PI/2,Math.PI), new Complex(Math.PI/2,-Math.PI) ]), [
            [new Complex(Math.PI/2,Math.PI)],[]
        ])
    })
    test("multiple complex pair", (t) => {
        deepEqualTolerance(cplxreal([
            new Complex(0,1), new Complex(0,-1),            new Complex(1,1), new Complex(1,-1),
        ]), [
            [  new Complex(0,1),                new Complex(1,1)            ],
            []
        ])
        deepEqualTolerance(cplxreal([
            new Complex(0,-1), new Complex(0,1),            new Complex(1,1), new Complex(1,-1),
        ]), [
            [   new Complex(0,1),                new Complex(1,1)            ],
            []
        ])
        deepEqualTolerance(cplxreal([
            new Complex(0,-1), new Complex(0,1),            new Complex(1,-1), new Complex(1,1),
        ]), [
            [  new Complex(0,1),                new Complex(1,1)            ],
            []
        ])
        deepEqualTolerance(cplxreal([
            new Complex(0,1), new Complex(0,-1),            new Complex(1,-1), new Complex(1,1),
        ]), [
            [  new Complex(0,1),                new Complex(1,1)            ],
            []
        ])
        deepEqualTolerance(cplxreal([
            new Complex(0,1), new Complex(0,-1),            new Complex(0,-2), new Complex(0,2),
        ]), [
            [  new Complex(0,1),                new Complex(0,2)            ],
            []
        ])
        deepEqualTolerance(cplxreal([
            new Complex(0,1), new Complex(0,-1),            new Complex(0,-2), new Complex(0,2),
            new Complex(0,-2), new Complex(0,2),
        ]), [
            [  new Complex(0,1),                new Complex(0,2), new Complex(0,2)            ],
            []
        ])
        deepEqualTolerance(cplxreal([
            new Complex(0,1), new Complex(0,-1),            new Complex(0,-2), new Complex(0,2),
            new Complex(0,-2), new Complex(0,2),
            new Complex(1,1), new Complex(1,-1),            new Complex(1,-2), new Complex(1,2),
            new Complex(1,-2), new Complex(1,2),
        ]), [
            [  new Complex(0,1),                new Complex(0,2), new Complex(0,2),
               new Complex(1,1),                new Complex(1,2), new Complex(1,2),
            ],
            []
        ])
        deepEqualTolerance(cplxreal([
            new Complex(0,1), new Complex(0,-1),            new Complex(0,-2), new Complex(0,2),
            new Complex(0,-2), new Complex(0,2),
            new Complex(1,1), new Complex(1,-1),            new Complex(1,-2), new Complex(1,2),
            new Complex(1,-2), new Complex(1,2),
            new Complex(-1,1), new Complex(-1,-1),            new Complex(-1,-2), new Complex(-1,2),
            new Complex(-1,-2), new Complex(-1,2),
        ]), [
            [  new Complex(-1,1),                new Complex(-1,2), new Complex(-1,2),
               new Complex(0,1),                new Complex(0,2), new Complex(0,2),
               new Complex(1,1),                new Complex(1,2), new Complex(1,2),
            ],
            []
        ])
    })
    test("complex pair plus real", (t) => {
        deepEqualTolerance(cplxreal([0, new Complex(0,1), new Complex(0,-1)]),
                           [[new Complex(0,1)],[0]])
        deepEqualTolerance(cplxreal([0, -2.3,4.5,new Complex(0,1), new Complex(0,-1)]),
                           [[new Complex(0,1)],[-2.3,0,4.5]])
    })
})

