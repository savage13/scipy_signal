

import numpy as np
from scipy import signal

from gentests import *

suite_name = "lp2hp"

def header():
    return '''
import { buttap, lp2hp_zpk, Complex } from '../scipy_signal.js'
import { deepEqualTolerance } from './deepEqualTolerance.js'

import test from 'node:test'
import suite from 'node:test'
import assert from 'node:assert'
'''

pars = [
    [2, 0.1],
    [2, 0.4],
    [3, 0.1],
    [3, 0.4],
    [2, 0.7],
    [2, 0.9],
]

tests = []
for order, wo in pars:

    fs = 2.0
    z,p,k = signal.buttap(order)
    # This is more correct based on the iirfilter representation 
    w = 2 * fs * np.tan(np.pi * wo / fs)
    zpk = signal.lp2hp_zpk(z, p, k, w)
    zpk = (
        zpk[0].astype(np.complex128),
        zpk[1],
        zpk[2]
    )

    tests.append({
        "name": f"{suite_name} n={order} {wo}]",
        "js": [
            f"let fs = 2.0;",
            f"let {{z,p,k}} = buttap({order})",
            f"let wo = {wo};",
            f"let w = 2 * fs * Math.tan(Math.PI * wo / fs);",
            f"({{z, p, k}} = lp2hp_zpk(z, p, k, w));",
        ],
        "expect": zpk,
        "assert": [ "z", "p", "k" ]
    })

lines = header()
lines += suite(suite_name, tests, 1e-15)

with open(f"tests/{suite_name}.js", "w") as f:
    print(lines, file=f)

