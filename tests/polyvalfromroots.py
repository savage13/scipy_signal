
import numpy as np
from numpy.polynomial import polynomial
from scipy import signal

from gentests import *

suite_name = "polyvalfromroots"

def header():
    return '''
import { zpolyval_from_roots, Complex } from '../scipy_signal.js'
import { deepEqualTolerance } from './deepEqualTolerance.js'

import test from 'node:test'
import suite from 'node:test'
import assert from 'node:assert'
'''

pars = [
    [ 1+0j,  [  1+0j, 2+0j, 3+0j] ],

    [ 0+0j,  [ -1+0j, 0+0j, 1+0j] ],
    [ 1+0j,  [ -1+0j, 0+0j, 1+0j] ],
    [ 2+0j,  [ -1+0j, 0+0j, 1+0j] ],
    [ 3+0j,  [ -1+0j, 0+0j, 1+0j] ],

    [ -2+0j, [ -2+0j,  0+0j ] ],
    [  1+0j, [ -2+0j,  0+0j ] ],
    [ -2+0j, [ -1+0j,  1+0j ] ],
    [  1+0j, [ -1+0j,  1+0j ] ],
]

tests = []
for x ,r in pars:
    y = polynomial.polyvalfromroots(x, r)
    expect = [ y ]
    roots = "[" + ", ".join([ f"new Complex({v.real}, {v.imag})" for v in r]) + "]"
    tests.append({
        "name": f"zpolyval_from_roots {x} {r}",
        "js": [
            f"let x = new Complex({x.real},{x.imag})",
            f"let r = {roots}",
            f"let y = zpolyval_from_roots(x,r)",
        ],
        "expect": expect,
        "assert": [ "y" ]
    })

lines = header()
lines += suite(suite_name, tests, 1e-15)

with open(f"tests/{suite_name}.js", "w") as f:
    print(lines, file=f)

