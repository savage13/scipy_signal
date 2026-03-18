
import { butter } from '../scipy_signal.js'
import { deepEqualTolerance } from './deepEqualTolerance.js'

import test from 'node:test'
import suite from 'node:test'
import assert from 'node:assert'

suite('butter', () => {
    test('butter order 2 [0.4, 0.6]', (t) => {
        const options = { btype: 'bandstop', analog: false }
        let W = [0.4, 0.6]
        let {b, a} = butter(2, W, options)
        const b_expect = [0.6389455251590224, -2.837488134051036e-16, 1.2778910503180447, -2.837488134051036e-16, 0.6389455251590224]
        deepEqualTolerance(b_expect, b, 7e-15)
        const a_expect = [1.0, -2.220446049250313e-16, 1.1429805025399014, -1.249000902703301e-16, 0.41280159809618866]
        deepEqualTolerance(a_expect, a, 7e-15)
    })
    test('butter order 2 [0.1, 0.2]', (t) => {
        const options = { btype: 'bandstop', analog: false }
        let W = [0.1, 0.2]
        let {b, a} = butter(2, W, options)
        const b_expect = [0.8005924034645701, -2.8888993638327447, 4.207298572884507, -2.888899363832745, 0.8005924034645704]
        deepEqualTolerance(b_expect, b, 7e-15)
        const a_expect = [1.0, -3.212440815469486, 4.167131841756085, -2.565357912196003, 0.6413515380575628]
        deepEqualTolerance(a_expect, a, 7e-15)
    })
    test('butter order 3 [0.4, 0.6]', (t) => {
        const options = { btype: 'bandstop', analog: false }
        let W = [0.4, 0.6]
        let {b, a} = butter(3, W, options)
        const b_expect = [0.5276243825019434, -3.5146844268437297e-16, 1.5828731475058304, -7.02936885368746e-16, 1.5828731475058304, -3.5146844268437307e-16, 0.5276243825019434]
        deepEqualTolerance(b_expect, b, 7e-15)
        const a_expect = [1.0, -7.494005416219807e-16, 1.7600418803431692, -9.992007221626409e-16, 1.1828932620378312, -3.191891195797325e-16, 0.27805991763454657]
        deepEqualTolerance(a_expect, a, 7e-15)
    })
    test('butter order 3 [0.1, 0.2]', (t) => {
        const options = { btype: 'bandstop', analog: false }
        let W = [0.1, 0.2]
        let {b, a} = butter(3, W, options)
        const b_expect = [0.7294407226390824, -3.948227894368847, 9.311817846210698, -12.180587981397194, 9.311817846210698, -3.9482278943688485, 0.7294407226390829]
        deepEqualTolerance(b_expect, b, 7e-15)
        const a_expect = [1.0, -4.848040906675274, 10.249757672776639, -12.048529597646557, 8.300684096610821, -3.1804732658130543, 0.5320753683120919]
        deepEqualTolerance(a_expect, a, 7e-15)
    })
})

