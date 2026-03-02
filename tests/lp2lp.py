

import numpy as np
from scipy import signal

from gentests import *

suite_name = "lp2lp"

def header():
    return '''
import { buttap, lp2lp_zpk, Complex } from '../scipy_signal.js'
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
]

tests = []
for order, wo in pars:

    z,p,k = signal.buttap(order)
    zpk = signal.lp2lp_zpk(z, p, k, wo)

    tests.append({
        "name": f"{suite_name} n={order} {wo}]",
        "js": [
            f"let {{z,p,k}} = buttap({order})",
            f"let wo = {wo};",
            f"({{z, p, k}} = lp2lp_zpk(z, p, k, wo));"
        ],
        "expect": zpk,
        "assert": [ "z", "p", "k" ]
    })

lines = header()
lines += suite(suite_name, tests, 1e-15)

with open(f"tests/{suite_name}.js", "w") as f:
    print(lines, file=f)

