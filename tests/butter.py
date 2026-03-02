
import numpy as np
from scipy import signal

from gentests import *

suite_name = "butter"

def header():
    return '''
import { butter } from '../scipy_signal.js'
import { deepEqualTolerance } from './deepEqualTolerance.js'

import test from 'node:test'
import suite from 'node:test'
import assert from 'node:assert'
'''

pars = [
    [2, 0.4, 0.6],
    [2, 0.1, 0.2],
    [3, 0.4, 0.6],
    [3, 0.1, 0.2],
]

tests = []
for order, w0, w1 in pars:
    tests.append({
        "name": f"{suite_name} order {order} [{w0}, {w1}]",
        "js": [
            "const options = { btype: 'bandstop', analog: false }",
            f"let W = [{w0}, {w1}]",
            f"let {{b, a}} = butter({order}, W, options)",
        ],
        "expect": signal.butter(order, [w0,w1], 'bandstop'),
        "assert": [ "b", "a" ]
    })

lines = header()
lines += suite(suite_name, tests, 7e-15)

with open(f"tests/{suite_name}.js", "w") as f:
    print(lines, file=f)

