
import numpy as np
from scipy import signal

from gentests import *

suite_name = "freqz_sos"

def header():
    return '''
import { freqz_sos, butter, Complex } from '../scipy_signal.js'
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
    [4, 0.1, 0.2, [0,10,20,30,40], False, 100, 'highpass'],
    [4, 0.1, 0.2, [0,10,20,30,40], False, 100, 'bandpass'],
    [4, 0.1, 0.2, [0,10,20,30,40], False, 100, 'bandstop'],
    [5, 0.1, 0.2, [0,10,20,30,40], False, 100, 'bandstop'],
    [6, 0.1, 0.2, [0,10,20,30,40], False, 100, 'bandstop'],
]

tests = []
for order, w0, w1, worN, whole, fs, btype in pars:

    if btype == 'bandpass' or btype == 'bandstop':
        W = [w0, w1]
    else:
        W = w0
    sos = signal.butter(order, W, btype=btype, output='sos')
    expect = signal.freqz_sos(sos, worN, whole, fs)
    if whole:
        whole = "true"
    else:
        whole = "false"
    if worN is None:
        worN = -1
    tests.append({
        "name": f"{suite_name} {order} {w0} {w1} {worN} {whole} {fs} {btype}",
        "js": [
            f"const options = {{ btype: '{btype}', analog: false, output: 'sos' }}",
            f"const foptions = {{ worN: {worN}, whole: {whole}, fs: {fs} }}",
            f"const W = {W}",
            f"const sos = butter({order}, W, options)",
            f"const {{w,h}} = freqz_sos(sos, foptions)",
        ],
        "expect": expect,
        "assert": [ "w", "h" ]
    })

lines = header()
lines += suite(suite_name, tests, 8e-13)

with open(f"tests/{suite_name}.js", "w") as f:
    print(lines, file=f)

