
import numpy as np
from scipy import signal

from gentests import *

suite_name = "freqz_zpk"

def header():
    return '''
import { freqz_zpk, butter, Complex } from '../scipy_signal.js'
import { deepEqualTolerance } from './deepEqualTolerance.js'

import test from 'node:test'
import suite from 'node:test'
import assert from 'node:assert'
'''



pars = [
    [2, 0.4, 0.6, None, False, 2*np.pi, 'bandpass'],
    [2, 0.4, 0.6, 64, False, 2*np.pi, 'bandpass'],
    [2, 0.4, 0.6, 1024, False, 2*np.pi, 'bandpass'],
    [4, 0.1, 0.2, 999, False, 2*np.pi, 'bandpass'],
    [4, 0.1, 0.2, 999, False, 2*np.pi, 'lowpass'],
    [4, 0.1, 0.2, 999, False, 100, 'lowpass'],
    [4, 0.1, 0.2, [0,10,20,30,40], False, 100, 'lowpass'],
]

tests = []
for order, w0, w1, worN, whole, fs, btype in pars:

    if btype == 'bandpass' or btype == 'bandstop':
        W = [w0, w1]
    else:
        W = w0
    z,p,k = signal.butter(order, W, btype=btype, output='zpk')
    expect = signal.freqz_zpk(z, p, k, worN, whole, fs)
    if whole:
        whole = "true"
    else:
        whole = "false"
    if worN is None:
        worN = -1
    tests.append({
        "name": f"{suite_name} {order} {w0} {w1} {worN} {whole} {fs} {btype}",
        "js": [
            f"const options = {{ btype: '{btype}', analog: false, output: 'zpk' }}",
            f"const foptions = {{ worN: {worN}, whole: {whole}, fs: {fs} }}",
            f"const W = {W}",
            f"const {{z,p,k}} = butter({order}, W, options)",
            f"const {{w,h}} = freqz_zpk(z, p, k, foptions)",
        ],
        "expect": expect,
        "assert": [ "w", "h" ]
    })

lines = header()
lines += suite(suite_name, tests, 8e-15)

with open(f"tests/{suite_name}.js", "w") as f:
    print(lines, file=f)

