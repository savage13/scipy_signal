
import { Complex } from '../scipy_signal.js'
import { deepEqualTolerance } from './deepEqualTolerance.js'

import test from 'node:test'
import suite from 'node:test'
import assert from 'node:assert'

suite('complex', () => {
    test('new', (t) => {
        deepEqualTolerance(new Complex(0,0), { re:0, im: 0})
        deepEqualTolerance(new Complex(1,0), { re:1, im: 0})
        deepEqualTolerance(new Complex(0,1), { re:0, im: 1})
        deepEqualTolerance(new Complex(1,1), { re:1, im: 1})
    })
    test('copy', (t) => {
        deepEqualTolerance(new Complex(0,0).copy(), { re:0, im: 0})
        deepEqualTolerance(new Complex(1,0).copy(), { re:1, im: 0})
        deepEqualTolerance(new Complex(0,1).copy(), { re:0, im: 1})
        deepEqualTolerance(new Complex(1,1).copy(), { re:1, im: 1})
    })
    test('neg', (t) => {
        deepEqualTolerance(new Complex(0,0).neg(), { re:0, im: 0})
        deepEqualTolerance(new Complex(1,0).neg(), { re:-1, im: 0})
        deepEqualTolerance(new Complex(0,1).neg(), { re:0, im: -1})
        deepEqualTolerance(new Complex(1,1).neg(), { re:-1, im: -1})
    })
    test('mul', (t) => {
        let z = new Complex(0,0)
        let a = new Complex(1,0)
        let b = new Complex(0,1)
        let c = new Complex(-1,0)
        let d = new Complex(0,-1)
        deepEqualTolerance(z.mul(a), { re:0, im: 0})
        deepEqualTolerance(z.mul(b), { re:0, im: 0})
        deepEqualTolerance(z.mul(c), { re:0, im: 0})
        deepEqualTolerance(z.mul(d), { re:0, im: 0})
        deepEqualTolerance(z.mul(z), { re:0, im: 0})

        deepEqualTolerance(a.mul(a), { re:1, im:0})
        deepEqualTolerance(a.mul(b), { re:0, im: 1})
        deepEqualTolerance(a.mul(c), { re:-1, im: 0})
        deepEqualTolerance(a.mul(d), { re:0, im: -1})

        deepEqualTolerance(b.mul(a), { re:0, im:1})
        deepEqualTolerance(b.mul(b), { re:-1, im: 0})
        deepEqualTolerance(b.mul(c), { re:0, im: -1})
        deepEqualTolerance(b.mul(d), { re:1, im: 0})


        deepEqualTolerance(c.mul(a), { re:-1, im:0})
        deepEqualTolerance(c.mul(b), { re:0, im: -1})
        deepEqualTolerance(c.mul(c), { re:1, im: 0})
        deepEqualTolerance(c.mul(d), { re:0, im: 1})

        deepEqualTolerance(d.mul(a), { re:0, im:-1})
        deepEqualTolerance(d.mul(b), { re:1, im: 0})
        deepEqualTolerance(d.mul(c), { re:0, im: 1})
        deepEqualTolerance(d.mul(d), { re:-1, im: 0})
    })
    test('is_zero', (t) => {
        let z = new Complex(0,0)
        let r = new Complex(1,0)
        let i = new Complex(0,1)
        deepEqualTolerance(z.is_zero(), true)
        deepEqualTolerance(r.is_zero(), false)
        deepEqualTolerance(i.is_zero(), false)
        deepEqualTolerance(new Complex(1e-16,0).is_zero(), false)
        deepEqualTolerance(new Complex(0,1e-16).is_zero(), false)
    })
    test('add', (t) => {
        let z = new Complex(0,0)
        let a = new Complex(1,0)
        let b = new Complex(0,1)
        let c = new Complex(-1,0)
        let d = new Complex(0,-1)
        deepEqualTolerance(z.add(z), { re:0, im: 0})
        deepEqualTolerance(z.add(a), { re:1, im: 0})
        deepEqualTolerance(z.add(b), { re:0, im: 1})
        deepEqualTolerance(z.add(c), { re:-1, im: 0})
        deepEqualTolerance(z.add(d), { re:0, im: -1})

        deepEqualTolerance(a.add(a), { re:2, im:0})
        deepEqualTolerance(a.add(b), { re:1, im: 1})
        deepEqualTolerance(a.add(c), { re:0, im: 0})
        deepEqualTolerance(a.add(d), { re:1, im: -1})

        deepEqualTolerance(b.add(a), { re:1, im:1})
        deepEqualTolerance(b.add(b), { re:0, im: 2})
        deepEqualTolerance(b.add(c), { re:-1, im: 1})
        deepEqualTolerance(b.add(d), { re:0, im: 0})

        deepEqualTolerance(c.add(a), { re:0, im:0})
        deepEqualTolerance(c.add(b), { re:-1, im: 1})
        deepEqualTolerance(c.add(c), { re:-2, im: 0})
        deepEqualTolerance(c.add(d), { re:-1, im: -1})

        deepEqualTolerance(d.add(a), { re:1, im:-1})
        deepEqualTolerance(d.add(b), { re:0, im: 0})
        deepEqualTolerance(d.add(c), { re:-1, im: -1})
        deepEqualTolerance(d.add(d), { re:0, im: -2})
    })
    test('sub', (t) => {
        let z = new Complex(0,0)
        let a = new Complex(1,0)
        let b = new Complex(0,1)
        let c = new Complex(-1,0)
        let d = new Complex(0,-1)
        deepEqualTolerance(z.sub(z), { re:0, im: 0})
        deepEqualTolerance(z.sub(a), { re:-1, im: 0})
        deepEqualTolerance(z.sub(b), { re:0, im: -1})
        deepEqualTolerance(z.sub(c), { re:1, im: 0})
        deepEqualTolerance(z.sub(d), { re:0, im: 1})

        deepEqualTolerance(a.sub(a), { re:0, im:0})
        deepEqualTolerance(a.sub(b), { re:1, im: -1})
        deepEqualTolerance(a.sub(c), { re:2, im: 0})
        deepEqualTolerance(a.sub(d), { re:1, im: 1})

        deepEqualTolerance(b.sub(a), { re:-1, im:1})
        deepEqualTolerance(b.sub(b), { re:0, im: 0})
        deepEqualTolerance(b.sub(c), { re:1, im: 1})
        deepEqualTolerance(b.sub(d), { re:0, im: 2})

        deepEqualTolerance(c.sub(a), { re:-2, im:0})
        deepEqualTolerance(c.sub(b), { re:-1, im: -1})
        deepEqualTolerance(c.sub(c), { re:0, im: 0})
        deepEqualTolerance(c.sub(d), { re:-1, im: 1})

        deepEqualTolerance(d.sub(a), { re:-1, im:-1})
        deepEqualTolerance(d.sub(b), { re:0, im: -2})
        deepEqualTolerance(d.sub(c), { re:1, im: -1})
        deepEqualTolerance(d.sub(d), { re:0, im: 0})
    })
    
    test('abs', (t) => {
        let z = new Complex(0,0)
        let a = new Complex(1,0)
        let b = new Complex(0,1)
        let c = new Complex(-1,0)
        let d = new Complex(0,-1)

        deepEqualTolerance(a.abs(), 1)
        deepEqualTolerance(b.abs(), 1)
        deepEqualTolerance(c.abs(), 1)
        deepEqualTolerance(d.abs(), 1)
        deepEqualTolerance(z.abs(), 0)

        let x = new Complex(3.2,0)
        deepEqualTolerance(a.mul(x).abs(), 3.2)
        deepEqualTolerance(a.add(b).abs(), Math.sqrt(2))
        deepEqualTolerance(a.add(d).abs(), Math.sqrt(2))
        deepEqualTolerance(a.add(c).abs(), 0)
        deepEqualTolerance(a.sub(c).abs(), 2)
    })
    test('sqrt',(t) => {
        let z = new Complex(0,0)
        let a = new Complex(1,0)
        let b = new Complex(0,1)
        let c = new Complex(-1,0)
        let d = new Complex(0,-1)

        deepEqualTolerance(z.sqrt(), {re: 0.0, im: 0})
        deepEqualTolerance(a.sqrt(), {re: 1, im: 0})
        deepEqualTolerance(b.sqrt(), {re: Math.sqrt(2)/2, im: Math.sqrt(2)/2})
        deepEqualTolerance(c.sqrt(), {re: 0, im: 1})
        deepEqualTolerance(d.sqrt(), {re: Math.sqrt(2)/2, im: -Math.sqrt(2)/2})
        deepEqualTolerance(new Complex(1,-0).sqrt(), {
            re: 1, im:0})
        deepEqualTolerance(new Complex(1,-1e-16).sqrt(), {
            re: 1, im:0})
        deepEqualTolerance(new Complex(2,-3).sqrt(), {
            re: 1.6741492280355401, im: -0.8959774761298381
        })

    })
    test('div',(t) => {
                let z = new Complex(0,0)
        let a = new Complex(1,0)
        let b = new Complex(0,1)
        let c = new Complex(-1,0)
        let d = new Complex(0,-1)

        deepEqualTolerance(z.div(z), { re:NaN, im: NaN})
        deepEqualTolerance(z.div(a), { re:0, im: 0})
        deepEqualTolerance(z.div(b), { re:0, im: 0})
        deepEqualTolerance(z.div(c), { re:0, im: 0})
        deepEqualTolerance(z.div(d), { re:0, im: 0})

        deepEqualTolerance(a.div(a), { re:1, im:0})
        deepEqualTolerance(a.div(b), { re:0, im: -1})
        deepEqualTolerance(a.div(c), { re:-1, im: 0})
        deepEqualTolerance(a.div(d), { re:0, im: 1})

        deepEqualTolerance(b.div(a), { re:0, im:1})
        deepEqualTolerance(b.div(b), { re:1, im: 0})
        deepEqualTolerance(b.div(c), { re:0, im: -1})
        deepEqualTolerance(b.div(d), { re:-1, im: 0})

        deepEqualTolerance(c.div(a), { re:-1, im:0})
        deepEqualTolerance(c.div(b), { re:0, im: 1})
        deepEqualTolerance(c.div(c), { re:1, im: 0})
        deepEqualTolerance(c.div(d), { re:0, im: -1})

        deepEqualTolerance(d.div(a), { re:0, im:-1})
        deepEqualTolerance(d.div(b), { re:-1, im: 0})
        deepEqualTolerance(d.div(c), { re:0, im: 1})
        deepEqualTolerance(d.div(d), { re:1, im: 0})


    })
    test('exp',(t) => {
        let z = new Complex(0,0)
        let a = new Complex(1,0)
        let b = new Complex(0,1)
        let c = new Complex(-1,0)
        let d = new Complex(0,-1)

        deepEqualTolerance(z.exp(), {re: 1.0, im: 0})
        deepEqualTolerance(a.exp(), {re: Math.exp(1), im: 0})
        deepEqualTolerance(c.exp(), {re: Math.exp(-1), im: 0})
        deepEqualTolerance(b.exp(), {re: Math.cos(1), im: Math.sin(1)})
        deepEqualTolerance(d.exp(), {re: Math.cos(-1), im: Math.sin(-1)})
        deepEqualTolerance(new Complex(1,1).exp(), {
            re: Math.exp(1) * Math.cos(1),
            im: Math.exp(1) * Math.sin(1)})

    })
})
