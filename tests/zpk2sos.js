
import { zpk2sos, iirfilter } from '../scipy_signal.js'
import { deepEqualTolerance } from './deepEqualTolerance.js'

import test from 'node:test'
import suite from 'node:test'
import assert from 'node:assert'

suite('zpk2sos', () => {
    test('zpk2sos order 2 0.5 lp', (t) => {
        const options = { btype: 'lp', analog: false, output: 'zpk' }
        let W = 0.5
        let {z, p, k} = iirfilter(2, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, 2.0, 1.0, 1.0, -1.8403695052228406e-16, 0.17157287525380993]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 3 0.5 lp', (t) => {
        const options = { btype: 'lp', analog: false, output: 'zpk' }
        let W = 0.5
        let {z, p, k} = iirfilter(3, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, 2.0, 1.0, 1.0, -5.551115123125783e-17, 0.0], [1.0, 1.0, 0.0, 1.0, -2.181844762999715e-16, 0.3333333333333333]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 4 0.5 lp', (t) => {
        const options = { btype: 'lp', analog: false, output: 'zpk' }
        let W = 0.5
        let {z, p, k} = iirfilter(4, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, 2.0, 1.0, 1.0, -1.380311211346245e-16, 0.03956612989658006], [1.0, 2.0, 1.0, 1.0, -1.6090019677120785e-16, 0.4464626921716895]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 5 0.5 lp', (t) => {
        const options = { btype: 'lp', analog: false, output: 'zpk' }
        let W = 0.5
        let {z, p, k} = iirfilter(5, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, 2.0, 1.0, 1.0, -5.551115123125783e-17, 0.0], [1.0, 2.0, 1.0, 1.0, -1.4129027183751183e-16, 0.10557280900008409], [1.0, 1.0, 0.0, 1.0, -1.7619734466858037e-16, 0.5278640450004206]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 6 0.5 lp', (t) => {
        const options = { btype: 'lp', analog: false, output: 'zpk' }
        let W = 0.5
        let {z, p, k} = iirfilter(6, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, 2.0, 1.0, 1.0, -1.081958255159695e-16, 0.017332380120999257], [1.0, 2.0, 1.0, 1.0, -1.8403695052228406e-16, 0.17157287525380993], [1.0, 2.0, 1.0, 1.0, -2.4421282935186824e-16, 0.5887907064808634]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 7 0.5 lp', (t) => {
        const options = { btype: 'lp', analog: false, output: 'zpk' }
        let W = 0.5
        let {z, p, k} = iirfilter(7, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, 2.0, 1.0, 1.0, -5.551115123125783e-17, 0.0], [1.0, 2.0, 1.0, 1.0, -1.1434072195250222e-16, 0.05209508360168705], [1.0, 2.0, 1.0, 1.0, -1.3039086490297502e-16, 0.2319141134796166], [1.0, 1.0, 0.0, 1.0, -6.235934422007652e-17, 0.6359638059755862]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 2 0.5 hp', (t) => {
        const options = { btype: 'hp', analog: false, output: 'zpk' }
        let W = 0.5
        let {z, p, k} = iirfilter(2, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, -2.0, 1.0, 1.0, -9.87976956493278e-17, 0.1715728752538099]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 3 0.5 hp', (t) => {
        const options = { btype: 'hp', analog: false, output: 'zpk' }
        let W = 0.5
        let {z, p, k} = iirfilter(3, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, -2.0, 1.0, 1.0, -5.551115123125783e-17, 0.0], [1.0, -1.0, 0.0, 1.0, -2.8228323251275695e-16, 0.3333333333333333]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 4 0.5 hp', (t) => {
        const options = { btype: 'hp', analog: false, output: 'zpk' }
        let W = 0.5
        let {z, p, k} = iirfilter(4, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, -2.0, 1.0, 1.0, -1.380311211346245e-16, 0.03956612989658006], [1.0, -2.0, 1.0, 1.0, -1.6090019677120785e-16, 0.4464626921716895]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 5 0.5 hp', (t) => {
        const options = { btype: 'hp', analog: false, output: 'zpk' }
        let W = 0.5
        let {z, p, k} = iirfilter(5, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, -2.0, 1.0, 1.0, -5.551115123125783e-17, 0.0], [1.0, -2.0, 1.0, 1.0, -2.5231257430002753e-16, 0.10557280900008413], [1.0, -1.0, 0.0, 1.0, -9.553492037248841e-17, 0.5278640450004205]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 6 0.5 hp', (t) => {
        const options = { btype: 'hp', analog: false, output: 'zpk' }
        let W = 0.5
        let {z, p, k} = iirfilter(6, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, -2.0, 1.0, 1.0, 2.450200180430866e-17, 0.017332380120999264], [1.0, -2.0, 1.0, 1.0, -9.87976956493278e-17, 0.1715728752538099], [1.0, -2.0, 1.0, 1.0, -2.4421282935186824e-16, 0.5887907064808634]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 7 0.5 hp', (t) => {
        const options = { btype: 'hp', analog: false, output: 'zpk' }
        let W = 0.5
        let {z, p, k} = iirfilter(7, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, -2.0, 1.0, 1.0, -5.551115123125783e-17, 0.0], [1.0, -2.0, 1.0, 1.0, -2.5007577536890645e-16, 0.05209508360168705], [1.0, -2.0, 1.0, 1.0, -1.3039086490297502e-16, 0.2319141134796166], [1.0, -1.0, 0.0, 1.0, -3.7015772001430116e-16, 0.635963805975586]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 2 0.8 lp', (t) => {
        const options = { btype: 'lp', analog: false, output: 'zpk' }
        let W = 0.8
        let {z, p, k} = iirfilter(2, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, 2.0, 1.0, 1.0, 1.142980502539901, 0.41280159809618855]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 3 0.8 lp', (t) => {
        const options = { btype: 'lp', analog: false, output: 'zpk' }
        let W = 0.8
        let {z, p, k} = iirfilter(3, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, 1.0, 0.0, 1.0, 0.5095254494944288, 0.0], [1.0, 2.0, 1.0, 1.0, 1.25051643084874, 0.5457233155094576]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 4 0.8 lp', (t) => {
        const options = { btype: 'lp', analog: false, output: 'zpk' }
        let W = 0.8
        let {z, p, k} = iirfilter(4, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, 2.0, 1.0, 1.0, 1.0485995763626117, 0.2961403575616696], [1.0, 2.0, 1.0, 1.0, 1.3209134308194261, 0.6327387928852765]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 5 0.8 lp', (t) => {
        const options = { btype: 'lp', analog: false, output: 'zpk' }
        let W = 0.8
        let {z, p, k} = iirfilter(5, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, 1.0, 0.0, 1.0, 0.5095254494944288, 0.0], [1.0, 2.0, 1.0, 1.0, 1.0965794655679615, 0.3554467621723904], [1.0, 2.0, 1.0, 1.0, 1.3693171946832927, 0.6925691353878635]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 6 0.8 lp', (t) => {
        const options = { btype: 'lp', analog: false, output: 'zpk' }
        let W = 0.8
        let {z, p, k} = iirfilter(6, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, 2.0, 1.0, 1.0, 1.0320694053197093, 0.2757079424729437], [1.0, 2.0, 1.0, 1.0, 1.142980502539901, 0.41280159809618855], [1.0, 2.0, 1.0, 1.0, 1.4043848904715814, 0.7359151911964714]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 7 0.8 lp', (t) => {
        const options = { btype: 'lp', analog: false, output: 'zpk' }
        let W = 0.8
        let {z, p, k} = iirfilter(7, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, 1.0, 0.0, 1.0, 0.5095254494944288, 0.0], [1.0, 2.0, 1.0, 1.0, 1.0578315579514421, 0.3075517143724907], [1.0, 2.0, 1.0, 1.0, 1.1840906753880336, 0.4636165663032468], [1.0, 2.0, 1.0, 1.0, 1.4308824064867112, 0.7686679222260608]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 2 0.3 lp', (t) => {
        const options = { btype: 'lp', analog: false, output: 'zpk' }
        let W = 0.3
        let {z, p, k} = iirfilter(2, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, 2.0, 1.0, 1.0, -0.7477891782585034, 0.2722149379250072]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 3 0.3 lp', (t) => {
        const options = { btype: 'lp', analog: false, output: 'zpk' }
        let W = 0.3
        let {z, p, k} = iirfilter(3, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, 2.0, 1.0, 1.0, -0.32491969623290634, 0.0], [1.0, 1.0, 0.0, 1.0, -0.8369977874388261, 0.4239856889474126]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 4 0.3 lp', (t) => {
        const options = { btype: 'lp', analog: false, output: 'zpk' }
        let W = 0.3
        let {z, p, k} = iirfilter(4, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, 2.0, 1.0, 1.0, -0.6727409111915273, 0.14453519983312102], [1.0, 2.0, 1.0, 1.0, -0.8976579400366445, 0.5271869046315972]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 5 0.3 lp', (t) => {
        const options = { btype: 'lp', analog: false, output: 'zpk' }
        let W = 0.3
        let {z, p, k} = iirfilter(5, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, 2.0, 1.0, 1.0, -0.32491969623290634, 0.0], [1.0, 2.0, 1.0, 1.0, -0.7105255165406029, 0.208818210000029], [1.0, 1.0, 0.0, 1.0, -0.9404564036679571, 0.6]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 6 0.3 lp', (t) => {
        const options = { btype: 'lp', analog: false, output: 'zpk' }
        let W = 0.3
        let {z, p, k} = iirfilter(6, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, 2.0, 1.0, 1.0, -0.6598951611537113, 0.1226807045260081], [1.0, 2.0, 1.0, 1.0, -0.7477891782585034, 0.2722149379250072], [1.0, 2.0, 1.0, 1.0, -0.9720367051425602, 0.6537276179547444]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 7 0.3 lp', (t) => {
        const options = { btype: 'lp', analog: false, output: 'zpk' }
        let W = 0.3
        let {z, p, k} = iirfilter(7, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, 2.0, 1.0, 1.0, -0.32491969623290634, 0.0], [1.0, 2.0, 1.0, 1.0, -0.6799532067671198, 0.15680548995602456], [1.0, 2.0, 1.0, 1.0, -0.7814143083588299, 0.32942142612657743], [1.0, 1.0, 0.0, 1.0, -0.9962265889983437, 0.694881906466473]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 2 0.8 hp', (t) => {
        const options = { btype: 'hp', analog: false, output: 'zpk' }
        let W = 0.8
        let {z, p, k} = iirfilter(2, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, -2.0, 1.0, 1.0, 1.142980502539901, 0.41280159809618855]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 3 0.8 hp', (t) => {
        const options = { btype: 'hp', analog: false, output: 'zpk' }
        let W = 0.8
        let {z, p, k} = iirfilter(3, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, -2.0, 1.0, 1.0, 0.5095254494944288, 0.0], [1.0, -1.0, 0.0, 1.0, 1.2505164308487398, 0.5457233155094576]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 4 0.8 hp', (t) => {
        const options = { btype: 'hp', analog: false, output: 'zpk' }
        let W = 0.8
        let {z, p, k} = iirfilter(4, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, -2.0, 1.0, 1.0, 1.0485995763626117, 0.2961403575616696], [1.0, -2.0, 1.0, 1.0, 1.3209134308194261, 0.6327387928852765]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 5 0.8 hp', (t) => {
        const options = { btype: 'hp', analog: false, output: 'zpk' }
        let W = 0.8
        let {z, p, k} = iirfilter(5, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, -2.0, 1.0, 1.0, 0.5095254494944288, 0.0], [1.0, -2.0, 1.0, 1.0, 1.0965794655679615, 0.3554467621723904], [1.0, -1.0, 0.0, 1.0, 1.3693171946832927, 0.6925691353878634]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 6 0.8 hp', (t) => {
        const options = { btype: 'hp', analog: false, output: 'zpk' }
        let W = 0.8
        let {z, p, k} = iirfilter(6, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, -2.0, 1.0, 1.0, 1.0320694053197095, 0.27570794247294383], [1.0, -2.0, 1.0, 1.0, 1.142980502539901, 0.41280159809618855], [1.0, -2.0, 1.0, 1.0, 1.4043848904715814, 0.7359151911964714]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 7 0.8 hp', (t) => {
        const options = { btype: 'hp', analog: false, output: 'zpk' }
        let W = 0.8
        let {z, p, k} = iirfilter(7, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, -2.0, 1.0, 1.0, 0.5095254494944288, 0.0], [1.0, -2.0, 1.0, 1.0, 1.0578315579514421, 0.3075517143724906], [1.0, -2.0, 1.0, 1.0, 1.1840906753880336, 0.4636165663032468], [1.0, -1.0, 0.0, 1.0, 1.4308824064867107, 0.7686679222260606]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 2 0.3 hp', (t) => {
        const options = { btype: 'hp', analog: false, output: 'zpk' }
        let W = 0.3
        let {z, p, k} = iirfilter(2, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, -2.0, 1.0, 1.0, -0.7477891782585034, 0.2722149379250072]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 3 0.3 hp', (t) => {
        const options = { btype: 'hp', analog: false, output: 'zpk' }
        let W = 0.3
        let {z, p, k} = iirfilter(3, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, -2.0, 1.0, 1.0, -0.32491969623290634, 0.0], [1.0, -1.0, 0.0, 1.0, -0.8369977874388264, 0.42398568894741273]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 4 0.3 hp', (t) => {
        const options = { btype: 'hp', analog: false, output: 'zpk' }
        let W = 0.3
        let {z, p, k} = iirfilter(4, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, -2.0, 1.0, 1.0, -0.6727409111915273, 0.14453519983312102], [1.0, -2.0, 1.0, 1.0, -0.8976579400366445, 0.5271869046315972]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 5 0.3 hp', (t) => {
        const options = { btype: 'hp', analog: false, output: 'zpk' }
        let W = 0.3
        let {z, p, k} = iirfilter(5, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, -2.0, 1.0, 1.0, -0.32491969623290634, 0.0], [1.0, -2.0, 1.0, 1.0, -0.7105255165406029, 0.208818210000029], [1.0, -1.0, 0.0, 1.0, -0.9404564036679569, 0.6]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 6 0.3 hp', (t) => {
        const options = { btype: 'hp', analog: false, output: 'zpk' }
        let W = 0.3
        let {z, p, k} = iirfilter(6, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, -2.0, 1.0, 1.0, -0.659895161153711, 0.12268070452600802], [1.0, -2.0, 1.0, 1.0, -0.7477891782585034, 0.2722149379250072], [1.0, -2.0, 1.0, 1.0, -0.9720367051425602, 0.6537276179547444]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 7 0.3 hp', (t) => {
        const options = { btype: 'hp', analog: false, output: 'zpk' }
        let W = 0.3
        let {z, p, k} = iirfilter(7, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, -2.0, 1.0, 1.0, -0.32491969623290634, 0.0], [1.0, -2.0, 1.0, 1.0, -0.6799532067671201, 0.1568054899560247], [1.0, -2.0, 1.0, 1.0, -0.7814143083588299, 0.32942142612657743], [1.0, -1.0, 0.0, 1.0, -0.9962265889983438, 0.6948819064664729]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 2 [0.4, 0.6] bp', (t) => {
        const options = { btype: 'bp', analog: false, output: 'zpk' }
        let W = [0.4, 0.6]
        let {z, p, k} = iirfilter(2, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, -2.0, 1.0, 1.0, -0.37684513679028003, 0.642496379831193], [1.0, 2.0, 1.0, 1.0, 0.3768451367902798, 0.642496379831193]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 2 [0.1, 0.2] bp', (t) => {
        const options = { btype: 'bp', analog: false, output: 'zpk' }
        let W = [0.1, 0.2]
        let {z, p, k} = iirfilter(2, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, 2.0, 1.0, 1.0, -1.4770282124327325, 0.760046560367366], [1.0, -2.0, 1.0, 1.0, -1.7354126030367534, 0.8438319064921072]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 2 [0.4, 0.6] bs', (t) => {
        const options = { btype: 'bs', analog: false, output: 'zpk' }
        let W = [0.4, 0.6]
        let {z, p, k} = iirfilter(2, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, -2.2204460492503136e-16, 1.0, 1.0, -0.37684513679028003, 0.642496379831193], [1.0, -2.2204460492503136e-16, 1.0, 1.0, 0.3768451367902798, 0.642496379831193]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 2 [0.1, 0.2] bs', (t) => {
        const options = { btype: 'bs', analog: false, output: 'zpk' }
        let W = [0.1, 0.2]
        let {z, p, k} = iirfilter(2, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, -1.8042260651806146, 1.0000000000000002, 1.0, -1.4770282124327325, 0.760046560367366], [1.0, -1.8042260651806146, 1.0000000000000002, 1.0, -1.7354126030367534, 0.8438319064921072]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 3 [0.4, 0.6] bp', (t) => {
        const options = { btype: 'bp', analog: false, output: 'zpk' }
        let W = [0.4, 0.6]
        let {z, p, k} = iirfilter(3, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, 0.0, -1.0, 1.0, -1.6724175397613158e-16, 0.509525449494429], [1.0, 2.0, 1.0, 1.0, 0.47638779629570505, 0.7387308816541094], [1.0, -2.0, 1.0, 1.0, -0.47638779629570566, 0.7387308816541094]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 4 [0.4, 0.6] bp', (t) => {
        const options = { btype: 'bp', analog: false, output: 'zpk' }
        let W = [0.4, 0.6]
        let {z, p, k} = iirfilter(4, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, -2.0, 1.0, 1.0, -0.1994392541353085, 0.54418779622633], [1.0, 2.0, 1.0, 1.0, 0.19943925413530836, 0.5441877962263301], [1.0, -2.0, 1.0, 1.0, -0.5196000081856568, 0.7954487996629809], [1.0, 2.0, 1.0, 1.0, 0.5196000081856567, 0.7954487996629807]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 5 [0.4, 0.6] bp', (t) => {
        const options = { btype: 'bp', analog: false, output: 'zpk' }
        let W = [0.4, 0.6]
        let {z, p, k} = iirfilter(5, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, 0.0, -1.0, 1.0, -1.6724175397613158e-16, 0.509525449494429], [1.0, -2.0, 1.0, 1.0, -0.3095281189534532, 0.5961935609954122], [1.0, 2.0, 1.0, 1.0, 0.3095281189534531, 0.5961935609954125], [1.0, -2.0, 1.0, 1.0, -0.5432288466290871, 0.8322073872466308], [1.0, 2.0, 1.0, 1.0, 0.5432288466290871, 0.8322073872466307]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 6 [0.4, 0.6] bp', (t) => {
        const options = { btype: 'bp', analog: false, output: 'zpk' }
        let W = [0.4, 0.6]
        let {z, p, k} = iirfilter(6, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, 2.0, 1.0, 1.0, 0.1344937487743086, 0.5250789868895382], [1.0, -2.0, 1.0, 1.0, -0.13449374877430878, 0.5250789868895382], [1.0, -2.0, 1.0, 1.0, -0.37684513679028003, 0.642496379831193], [1.0, 2.0, 1.0, 1.0, 0.3768451367902798, 0.642496379831193], [1.0, 2.0, 1.0, 1.0, 0.5579651405520961, 0.8578549942714511], [1.0, -2.0, 1.0, 1.0, -0.5579651405520963, 0.8578549942714513]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 7 [0.4, 0.6] bp', (t) => {
        const options = { btype: 'bp', analog: false, output: 'zpk' }
        let W = [0.4, 0.6]
        let {z, p, k} = iirfilter(7, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, 0.0, -1.0, 1.0, -1.6724175397613158e-16, 0.509525449494429], [1.0, 2.0, 1.0, 1.0, 0.22652891057776378, 0.5545734526394956], [1.0, -2.0, 1.0, 1.0, -0.22652891057776414, 0.5545734526394954], [1.0, -2.0, 1.0, 1.0, -0.4215414777916115, 0.6808939464433851], [1.0, 2.0, 1.0, 1.0, 0.42154147779161144, 0.6808939464433849], [1.0, 2.0, 1.0, 1.0, 0.5679716281384684, 0.8767370884284871], [1.0, -2.0, 1.0, 1.0, -0.5679716281384685, 0.8767370884284873]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 3 [0.4, 0.6] bs', (t) => {
        const options = { btype: 'bs', analog: false, output: 'zpk' }
        let W = [0.4, 0.6]
        let {z, p, k} = iirfilter(3, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, -2.2204460492503136e-16, 1.0, 1.0, -1.6724175397613158e-16, 0.509525449494429], [1.0, -2.2204460492503136e-16, 1.0, 1.0, 0.47638779629570505, 0.7387308816541094], [1.0, -2.2204460492503136e-16, 1.0, 1.0, -0.47638779629570566, 0.7387308816541094]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 4 [0.4, 0.6] bs', (t) => {
        const options = { btype: 'bs', analog: false, output: 'zpk' }
        let W = [0.4, 0.6]
        let {z, p, k} = iirfilter(4, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, -2.2204460492503136e-16, 1.0, 1.0, -0.1994392541353085, 0.54418779622633], [1.0, -2.2204460492503136e-16, 1.0, 1.0, 0.19943925413530836, 0.5441877962263301], [1.0, -2.2204460492503136e-16, 1.0, 1.0, -0.5196000081856567, 0.7954487996629807], [1.0, -2.2204460492503136e-16, 1.0, 1.0, 0.5196000081856567, 0.7954487996629807]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 5 [0.4, 0.6] bs', (t) => {
        const options = { btype: 'bs', analog: false, output: 'zpk' }
        let W = [0.4, 0.6]
        let {z, p, k} = iirfilter(5, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, -2.2204460492503136e-16, 1.0, 1.0, -1.6724175397613158e-16, 0.509525449494429], [1.0, -2.2204460492503136e-16, 1.0, 1.0, -0.3095281189534532, 0.5961935609954122], [1.0, -2.2204460492503136e-16, 1.0, 1.0, 0.3095281189534531, 0.5961935609954125], [1.0, -2.2204460492503136e-16, 1.0, 1.0, -0.5432288466290871, 0.8322073872466308], [1.0, -2.2204460492503136e-16, 1.0, 1.0, 0.5432288466290871, 0.8322073872466307]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 6 [0.4, 0.6] bs', (t) => {
        const options = { btype: 'bs', analog: false, output: 'zpk' }
        let W = [0.4, 0.6]
        let {z, p, k} = iirfilter(6, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, -2.2204460492503136e-16, 1.0, 1.0, 0.1344937487743086, 0.5250789868895382], [1.0, -2.2204460492503136e-16, 1.0, 1.0, -0.13449374877430878, 0.5250789868895382], [1.0, -2.2204460492503136e-16, 1.0, 1.0, -0.37684513679028003, 0.642496379831193], [1.0, -2.2204460492503136e-16, 1.0, 1.0, 0.3768451367902798, 0.642496379831193], [1.0, -2.2204460492503136e-16, 1.0, 1.0, 0.5579651405520961, 0.8578549942714511], [1.0, -2.2204460492503136e-16, 1.0, 1.0, -0.5579651405520963, 0.8578549942714513]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
    test('zpk2sos order 7 [0.4, 0.6] bs', (t) => {
        const options = { btype: 'bs', analog: false, output: 'zpk' }
        let W = [0.4, 0.6]
        let {z, p, k} = iirfilter(7, W, options)
        let sos = zpk2sos(z, p, 1.0)
        const sos_expect = [[1.0, -2.2204460492503136e-16, 1.0, 1.0, -1.6724175397613158e-16, 0.509525449494429], [1.0, -2.2204460492503136e-16, 1.0, 1.0, -0.22652891057776423, 0.5545734526394958], [1.0, -2.2204460492503136e-16, 1.0, 1.0, 0.22652891057776367, 0.5545734526394956], [1.0, -2.2204460492503136e-16, 1.0, 1.0, -0.4215414777916115, 0.6808939464433851], [1.0, -2.2204460492503136e-16, 1.0, 1.0, 0.4215414777916115, 0.6808939464433851], [1.0, -2.2204460492503136e-16, 1.0, 1.0, 0.5679716281384684, 0.8767370884284871], [1.0, -2.2204460492503136e-16, 1.0, 1.0, -0.5679716281384682, 0.876737088428487]]
        deepEqualTolerance(sos_expect, sos, 1e-13)
    })
})

