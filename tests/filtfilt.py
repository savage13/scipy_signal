
import numpy as np
from scipy import signal

from gentests import *

suite_name = "filtfilt"

def header():
    return '''
import { iirfilter, filtfilt, zeros } from '../scipy_signal.js'
import { deepEqualTolerance } from './deepEqualTolerance.js'

import test from 'node:test'
import suite from 'node:test'
import assert from 'node:assert'
'''

pars = [
    [2, 0.4, 0.6, 'bandstop'],
    [2, 0.1, 0.2, 'bandstop'],
    [3, 0.4, 0.6, 'bandstop'],
    [3, 0.1, 0.2, 'bandstop'],
    [4, 0.1, 0.2, 'bandstop'],
    [5, 0.1, 0.2, 'bandstop'],
    [6, 0.1, 0.2, 'bandstop'],

    [2, 0.4, 0.6, 'bandpass'],
    [2, 0.1, 0.2, 'bandpass'],
    [3, 0.4, 0.6, 'bandpass'],
    [3, 0.1, 0.2, 'bandpass'],
    [4, 0.1, 0.2, 'bandpass'],
    [5, 0.1, 0.2, 'bandpass'],
    [6, 0.1, 0.2, 'bandpass'],

    [2, 0.4, 0.6, 'lowpass'],
    [2, 0.1, 0.2, 'lowpass'],
    [3, 0.4, 0.6, 'lowpass'],
    [3, 0.1, 0.2, 'lowpass'],
    [4, 0.1, 0.2, 'lowpass'],
    [5, 0.1, 0.2, 'lowpass'],
    [6, 0.1, 0.2, 'lowpass'],

    [2, 0.4, 0.6, 'highpass'],
    [2, 0.1, 0.2, 'highpass'],
    [3, 0.4, 0.6, 'highpass'],
    [3, 0.1, 0.2, 'highpass'],
    [4, 0.1, 0.2, 'highpass'],
    [5, 0.1, 0.2, 'highpass'],
    [6, 0.1, 0.2, 'highpass'],
]

tests = []
for order, w0, w1, btype in pars:
    data_in = np.zeros(100)
    data_in[50] = 1.0
    if btype in ['bandpass', 'bandstop']:
        b, a = signal.butter(order, [w0,w1], btype=btype)
    elif btype == 'lowpass':
        b, a = signal.butter(order, w0, btype=btype)
    elif btype == 'highpass':
        b, a = signal.butter(order, w0, btype=btype)
    y = signal.filtfilt(b, a, data_in)
    expect = [ y ]

    b_s = np.array2string(b, max_line_width=1000000000)
    a_s = np.array2string(a, max_line_width=1000000000)

    tests.append({
        "name": f"{suite_name} order {order} [{w0}, {w1}] {btype}",
        "js": [
            f"const options = {{ btype: '{btype}', analog: false }}",
            f"const data_in = zeros(100)",
            f"data_in[50] = 1.0",
            f"let W = [{w0}, {w1}]",
            f"if(options.btype == 'lowpass') {{ W = W[0] }}",
            f"if(options.btype == 'highpass') {{ W = W[0] }}",
            f"const {{b, a}} = iirfilter({order}, W, options)",
            f"const y = filtfilt(b, a, data_in)",
        ],
        "expect": expect,
        "assert": [ "y" ]
    })

lines = header()
lines += suite(suite_name, tests, 1e-8)

with open(f"tests/{suite_name}.js", "w") as f:
    print(lines, file=f)

