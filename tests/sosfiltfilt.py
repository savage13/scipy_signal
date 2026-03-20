import numpy as np
from scipy import signal

from gentests import *

suite_name = "sosfiltfilt"

def header():
    return '''
import { iirfilter, sosfiltfilt, zeros } from '../scipy_signal.js'
import { deepEqualTolerance } from './deepEqualTolerance.js'

import test from 'node:test'
import suite from 'node:test'
import assert from 'node:assert'
'''

pars = [
    [2, 0.5, 0.1, "lp", []],
    [2, 0.8, 0.1, "lp", []],
    [2, 0.3, 0.1, "lp", []],
    [2, 0.5, 0.1, "hp", []],
    [2, 0.8, 0.1, "hp", []],
    [2, 0.3, 0.1, "hp", []],
    [3, 0.5, 0.1, "lp", []],
    [3, 0.8, 0.1, "lp", []],
    [3, 0.3, 0.1, "lp", []],
    [3, 0.5, 0.1, "hp", []],
    [3, 0.8, 0.1, "hp", []],
    [3, 0.3, 0.1, "hp", []],
    [4, 0.5, 0.1, "lp", []],
    [4, 0.8, 0.1, "lp", []],
    [4, 0.3, 0.1, "lp", []],
    [4, 0.5, 0.1, "hp", []],
    [4, 0.8, 0.1, "hp", []],
    [4, 0.3, 0.1, "hp", []],
    [5, 0.5, 0.1, "lp", []],
    [5, 0.8, 0.1, "lp", []],
    [5, 0.3, 0.1, "lp", []],
    [5, 0.5, 0.1, "hp", []],
    [5, 0.8, 0.1, "hp", []],
    [5, 0.3, 0.1, "hp", []],
    [6, 0.5, 0.1, "lp", []],
    [6, 0.8, 0.1, "lp", []],
    [6, 0.3, 0.1, "lp", []],
    [6, 0.5, 0.1, "hp", []],
    [6, 0.8, 0.1, "hp", []],
    [6, 0.3, 0.1, "hp", []],
    [2, 0.4, 0.6, "bp", []],
    [3, 0.4, 0.6, "bp", []],
    [4, 0.4, 0.6, "bp", []],
    [5, 0.4, 0.6, "bp", []],
    [6, 0.4, 0.6, "bp", []],
    [2, 0.4, 0.6, "bs", []],
    [3, 0.4, 0.6, "bs", []],
    [4, 0.4, 0.6, "bs", []],
    [5, 0.4, 0.6, "bs", []],
    [6, 0.4, 0.6, "bs", []],
]

tests = []

for order, w0, w1, btype, exch in pars:
    if btype == "bp" or btype == "bs":
        w = [w0, w1]
    else:
        w = w0
    sos = signal.iirfilter(order, w, btype=btype, analog= False, output='sos')
    #for (i,j) in exch:
    #    sos[[i,j]] = sos[[j,i]]
    x = np.zeros(100)
    x[50] = 1.0
    expect = signal.sosfiltfilt(sos, x)
    tests.append({
        "name": f"{suite_name} order {order} {w} {btype}",
        "js": [
            f"const options = {{ btype: '{btype}', analog: false, output: 'sos' }}",
            f"let W = {w}",
            f"let sos = iirfilter({order}, W, options)",
            f"let x = zeros(100)",
            f"x[50] = 1.0",
            f"let y = sosfiltfilt(sos, x)",
        ],
        "expect": [expect],
        "assert": [ "y" ]
    })


lines = header()
lines += suite(suite_name, tests, 1e-15)

with open(f"tests/{suite_name}.js", "w") as f:
    print(lines, file=f)

