import numpy as np
from scipy import signal

from gentests import *

suite_name = "zpk2sos"

def header():
    return '''
import { zpk2sos, iirfilter } from '../scipy_signal.js'
import { deepEqualTolerance } from './deepEqualTolerance.js'

import test from 'node:test'
import suite from 'node:test'
import assert from 'node:assert'
'''

pars = [

    [2, 0.5, 0.1, 'lp', []],
    [3, 0.5, 0.1, 'lp', []],
    [4, 0.5, 0.1, 'lp', []],
    [5, 0.5, 0.1, 'lp', []],
    [6, 0.5, 0.1, 'lp', []],
    [7, 0.5, 0.1, 'lp', []],

    [2, 0.5, 0.1, 'hp', []],
    [3, 0.5, 0.1, 'hp', []],
    [4, 0.5, 0.1, 'hp', []],
    [5, 0.5, 0.1, 'hp', []],
    [6, 0.5, 0.1, 'hp', []],
    [7, 0.5, 0.1, 'hp', []],

    [2, 0.8, 0.1, 'lp', []],
    [3, 0.8, 0.1, 'lp', []],
    [4, 0.8, 0.1, 'lp', []],
    [5, 0.8, 0.1, 'lp', []],
    [6, 0.8, 0.1, 'lp', []],
    [7, 0.8, 0.1, 'lp', []],

    [2, 0.3, 0.1, 'lp', []],
    [3, 0.3, 0.1, 'lp', []],
    [4, 0.3, 0.1, 'lp', []],
    [5, 0.3, 0.1, 'lp', []],
    [6, 0.3, 0.1, 'lp', []],
    [7, 0.3, 0.1, 'lp', []],

    [2, 0.8, 0.1, 'hp', []],
    [3, 0.8, 0.1, 'hp', []],
    [4, 0.8, 0.1, 'hp', []],
    [5, 0.8, 0.1, 'hp', []],
    [6, 0.8, 0.1, 'hp', []],
    [7, 0.8, 0.1, 'hp', []],

    [2, 0.3, 0.1, 'hp', []],
    [3, 0.3, 0.1, 'hp', []],
    [4, 0.3, 0.1, 'hp', []],
    [5, 0.3, 0.1, 'hp', []],
    [6, 0.3, 0.1, 'hp', []],
    [7, 0.3, 0.1, 'hp', []],

    [2, 0.4, 0.6, 'bp', []],
    [2, 0.1, 0.2, 'bp', []],
    [2, 0.4, 0.6, 'bs', []],
    [2, 0.1, 0.2, 'bs', []],

    # Flipping of rows in the 2nd order sections
    #   appears to be a result of row ordering of
    #   conjugate poles as a result of numerical
    #   precision and extra precision of compiled
    #   routines like csqrt() and cdiv() in numpy
    [3, 0.4, 0.6, 'bp', [(1,2)]],
    [4, 0.4, 0.6, 'bp', [(2,3)]],
    [5, 0.4, 0.6, 'bp', [(3,4)]],
    [6, 0.4, 0.6, 'bp', [(0,1)]],
    [7, 0.4, 0.6, 'bp', [(1,2),(3,4)]],

    [3, 0.4, 0.6, 'bs', [(1,2)]],
    [4, 0.4, 0.6, 'bs', []],
    [5, 0.4, 0.6, 'bs', [(3,4)]],
    [6, 0.4, 0.6, 'bs', [(0,1)]],
    [7, 0.4, 0.6, 'bs', [(1,2),(5,6)]],

]

tests = []
for order, w0, w1, btype, exch in pars:
    if btype == "bp" or btype == "bs":
        w = [w0, w1]
    else:
        w = w0
    z,p,k = signal.iirfilter(order, w, btype=btype, analog= False, output='zpk')
    sos = signal.zpk2sos(z,p,1)
    for (i,j) in exch:
        sos[[i,j]] = sos[[j,i]]
    expect = [sos]
    tests.append({
        "name": f"{suite_name} order {order} {w} {btype}",
        "js": [
            f"const options = {{ btype: '{btype}', analog: false, output: 'zpk' }}",
            f"let W = {w}",
            f"let {{z, p, k}} = iirfilter({order}, W, options)",
            f"let sos = zpk2sos(z, p, 1.0)",
        ],
        "expect": expect,
        "assert": [ "sos" ]
    })

lines = header()
lines += suite(suite_name, tests, 1e-13)

with open(f"tests/{suite_name}.js", "w") as f:
    print(lines, file=f)
