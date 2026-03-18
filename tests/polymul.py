
import numpy as np
#from numpy.polynomial import polynomial
from scipy import signal

from gentests import *

suite_name = "polymul"

def header():
    return '''
import { polymul, Complex } from '../scipy_signal.js'
import { deepEqualTolerance } from './deepEqualTolerance.js'

import test from 'node:test'
import suite from 'node:test'
import assert from 'node:assert'
'''

pars = [
    [ [1,2,3], [3,2,1] ],
    [ [3,2,1], [1,2,3] ],
    [ [3,2,1], [1] ],
    [ [3,2,1], [0] ],
    [ [3,2,1], [0,0,0,0] ],
    [ [1,2], [1+1j,2-1j] ],
]

tests = []
for a, b in pars:
    y = np.polymul(a, b)
    expect = [ y.astype(np.complex128) ]
    ac = "[" + ", ".join([ f"new Complex({v.real}, {v.imag})" for v in a]) + "]"
    bc = "[" + ", ".join([ f"new Complex({v.real}, {v.imag})" for v in b]) + "]"
    tests.append({
        "name": f"polymul {a} {b}",
        "js": [
            f"let a = {ac}",
            f"let b = {bc}",
            f"let y = polymul(a,b)",
        ],
        "expect": expect,
        "assert": [ "y" ]
    })

lines = header()
lines += suite(suite_name, tests, 1e-15)

with open(f"tests/{suite_name}.js", "w") as f:
    print(lines, file=f)

