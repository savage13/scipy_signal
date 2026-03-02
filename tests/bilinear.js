
import { buttap, lp2bs_zpk, bilinear_zpk, Complex } from '../scipy_signal.js'
import { deepEqualTolerance } from './deepEqualTolerance.js'

import test from 'node:test'
import suite from 'node:test'
import assert from 'node:assert'

suite('bilinear', () => {
    test('bilinear n=2 [0.1, 0.2]', (t) => {
        let fs = 2.0 // not analog 
        let {z,p,k} = buttap(2)
        let w = [0.1, 0.2]
        let bw = w[1] - w[0]
        let wo = Math.sqrt(w[1] * w[0]);
        ({z, p, k} = lp2bs_zpk(z, p, k, wo, bw));({z, p, k} = bilinear_zpk(z, p, k, fs));
        const z_expect = [
            new Complex(0.9975031210986267, 0.07062240011850664),
            new Complex(0.9975031210986267, 0.07062240011850664),
            new Complex(0.9975031210986267, -0.07062240011850664),
            new Complex(0.9975031210986267, -0.07062240011850664),
        ]
        deepEqualTolerance(z_expect, z, 1e-15)
        const p_expect = [
            new Complex(0.9854357775951137, 0.0524354275756457),
            new Complex(0.9854357775951137, -0.0524354275756457),
            new Complex(0.9743686300627116, -0.08643663855202963),
            new Complex(0.9743686300627116, 0.08643663855202963),
        ]
        deepEqualTolerance(p_expect, p, 1e-15)
        const k_expect = 0.9653118651701095
        deepEqualTolerance(k_expect, k, 1e-15)
    })
    test('bilinear n=2 [0.4, 0.6]', (t) => {
        let fs = 2.0 // not analog 
        let {z,p,k} = buttap(2)
        let w = [0.4, 0.6]
        let bw = w[1] - w[0]
        let wo = Math.sqrt(w[1] * w[0]);
        ({z, p, k} = lp2bs_zpk(z, p, k, wo, bw));({z, p, k} = bilinear_zpk(z, p, k, fs));
        const z_expect = [
            new Complex(0.9704433497536947, 0.24132903869785008),
            new Complex(0.9704433497536947, 0.24132903869785008),
            new Complex(0.9704433497536947, -0.24132903869785008),
            new Complex(0.9704433497536947, -0.24132903869785008),
        ]
        deepEqualTolerance(z_expect, z, 1e-15)
        const p_expect = [
            new Complex(0.9494110707763447, 0.2012988791676396),
            new Complex(0.9494110707763447, -0.2012988791676396),
            new Complex(0.9240220463941762, -0.2643593127175425),
            new Complex(0.9240220463941762, 0.2643593127175425),
        ]
        deepEqualTolerance(p_expect, p, 1e-15)
        const k_expect = 0.9327554689720443
        deepEqualTolerance(k_expect, k, 1e-15)
    })
    test('bilinear n=3 [0.1, 0.2]', (t) => {
        let fs = 2.0 // not analog 
        let {z,p,k} = buttap(3)
        let w = [0.1, 0.2]
        let bw = w[1] - w[0]
        let wo = Math.sqrt(w[1] * w[0]);
        ({z, p, k} = lp2bs_zpk(z, p, k, wo, bw));({z, p, k} = bilinear_zpk(z, p, k, fs));
        const z_expect = [
            new Complex(0.9975031210986267, 0.07062240011850664),
            new Complex(0.9975031210986267, 0.07062240011850664),
            new Complex(0.9975031210986267, 0.07062240011850664),
            new Complex(0.9975031210986267, -0.07062240011850664),
            new Complex(0.9975031210986267, -0.07062240011850664),
            new Complex(0.9975031210986267, -0.07062240011850664),
        ]
        deepEqualTolerance(z_expect, z, 1e-15)
        const p_expect = [
            new Complex(0.9899473936768436, 0.05084900635083635),
            new Complex(0.9732034104750307, 0.06445191987977082),
            new Complex(0.9899473936768436, -0.05084900635083635),
            new Complex(0.9795611782380342, -0.09291175496364756),
            new Complex(0.9732034104750307, -0.06445191987977082),
            new Complex(0.9795611782380342, 0.09291175496364756),
        ]
        deepEqualTolerance(p_expect, p, 1e-15)
        const k_expect = 0.9512937365002448
        deepEqualTolerance(k_expect, k, 1e-15)
    })
    test('bilinear n=3 [0.4, 0.6]', (t) => {
        let fs = 2.0 // not analog 
        let {z,p,k} = buttap(3)
        let w = [0.4, 0.6]
        let bw = w[1] - w[0]
        let wo = Math.sqrt(w[1] * w[0]);
        ({z, p, k} = lp2bs_zpk(z, p, k, wo, bw));({z, p, k} = bilinear_zpk(z, p, k, fs));
        const z_expect = [
            new Complex(0.9704433497536947, 0.24132903869785008),
            new Complex(0.9704433497536947, 0.24132903869785008),
            new Complex(0.9704433497536947, 0.24132903869785008),
            new Complex(0.9704433497536947, -0.24132903869785008),
            new Complex(0.9704433497536947, -0.24132903869785008),
            new Complex(0.9704433497536947, -0.24132903869785008),
        ]
        deepEqualTolerance(z_expect, z, 1e-15)
        const p_expect = [
            new Complex(0.9595667025120166, 0.19805341834483448),
            new Complex(0.9248826291079814, 0.2251564095451981),
            new Complex(0.9595667025120166, -0.19805341834483448),
            new Complex(0.9313860190551629, -0.2767848171060123),
            new Complex(0.9248826291079814, -0.2251564095451981),
            new Complex(0.9313860190551629, 0.2767848171060123),
        ]
        deepEqualTolerance(p_expect, p, 1e-15)
        const k_expect = 0.9062116145808453
        deepEqualTolerance(k_expect, k, 1e-15)
    })
})

