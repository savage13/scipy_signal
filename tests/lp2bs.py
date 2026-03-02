

import numpy as np
from scipy import signal

from gentests import *

suite_name = "lp2bs"

def header():
    return '''
import { buttap, lp2bs_zpk, Complex } from '../scipy_signal.js'
import { deepEqualTolerance } from './deepEqualTolerance.js'

import test from 'node:test'
import suite from 'node:test'
import assert from 'node:assert'
'''

pars = [
    [2, 0.1, 0.2],
    [2, 0.4, 0.6],
    [3, 0.1, 0.2],
    [3, 0.4, 0.6],
]

tests = []
for order, w0, w1 in pars:

    z,p,k = signal.buttap(order)
    W = [w0, w1]
    bw = W[1] - W[0]
    wo = np.sqrt(W[0] * W[1])
    zpk = signal.lp2bs_zpk(z, p, k, wo, bw)

    tests.append({
        "name": f"{suite_name} n={order} [{w0}, {w1}]",
        "js": [
            f"let {{z,p,k}} = buttap({order})",
            f"let w = [{w0}, {w1}]",
            f"let bw = w[1] - w[0]",
            f"let wo = Math.sqrt(w[1] * w[0]);",
            f"({{z, p, k}} = lp2bs_zpk(z, p, k, wo, bw));"
        ],
        "expect": zpk,
        "assert": [ "z", "p", "k" ]
    })

lines = header()
lines += suite(suite_name, tests, 1e-15)

with open(f"tests/{suite_name}.js", "w") as f:
    print(lines, file=f)

