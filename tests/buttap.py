
import numpy as np
from scipy import signal

from gentests import *

suite_name = "buttap"

def header():
    return '''
import { buttap, Complex } from '../scipy_signal.js'
import { deepEqualTolerance } from './deepEqualTolerance.js'

import test from 'node:test'
import suite from 'node:test'
import assert from 'node:assert'
'''

pars = [
    2,3,4,5,6
]

tests = []
for order in pars:
    tests.append({
        "name": f"{suite_name} n={order}",
        "js": [
            f"let {{z,p,k}} = buttap({order})",
        ],
        "expect": signal.buttap(order),
        "assert": [ "z", "p", "k" ]
    })

lines = header()
lines += suite(f"{suite_name}", tests, 1e-15)

with open(f"tests/{suite_name}.js", "w") as f:
    print(lines, file=f)

