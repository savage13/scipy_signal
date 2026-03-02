
import numpy as np
from scipy import signal

from gentests import *

suite_name = "linspace"

def header():
    return '''
import { linspace, zeros } from '../scipy_signal.js'
import { deepEqualTolerance } from './deepEqualTolerance.js'

import test from 'node:test'
import suite from 'node:test'
import assert from 'node:assert'
'''

pars = [
    [0, 100, 5, False],
    [0, 100, 5, True],
    [0, 100, 6, False],
    [0, 100, 6, True],
    [0, 100, 87, False],
    [0, 100, 87, True],
    [1, 1, 5, True],
    [1, 1, 5, False],
    [0, -13, 5, True],
    [0, -13, 5, False],
    [0, 1, 0, False],
    [0, 1, 0, True],
    [0, 1, 1, False],
    [0, 1, 1, True],
    [2, 3, 1, False],
    [2, 3, 1, True],
    [10, 20, 7, False],
    [10, 20, 7, True],
    [20, 10, 7, False],
    [20, 10, 7, True],
    [-10, -20, 7, False],
    [-10, -20, 7, True],
    [-20, -10, 7, False],
    [-20, -10, 7, True],
]

tests = []
for start, stop, num, endpoint in pars:
    y = np.linspace(start, stop, num, endpoint)
    expect = [ y ]
    end = "true"
    if not endpoint:
        end = "false"
    tests.append({
        "name": f"{suite_name} {start} {stop} {num} {end}",
        "js": [
            f"let y = linspace({start}, {stop}, {num}, {{endpoint: {end}}})",
        ],
        "expect": expect,
        "assert": [ "y" ]
    })

lines = header()
lines += suite(suite_name, tests, 1e-8)

with open(f"tests/{suite_name}.js", "w") as f:
    print(lines, file=f)

