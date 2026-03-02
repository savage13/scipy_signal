
import numpy as np
from scipy import signal

from gentests import *

suite_name = "example"
tol = 1e-14

def header():
    return '''
import { iirfilter, filtfilt, zeros } from '../scipy_signal.js'
import { deepEqualTolerance } from './deepEqualTolerance.js'

import test from 'node:test'
import suite from 'node:test'
import assert from 'node:assert'
'''


tests = []

order = 2
fs = 10
nyq = 0.5 * fs
corner1 = 1.0
corner2 = 2.0

W = [ corner1 / nyq, corner2 / nyq ]

data_in = np.zeros(100)
data_in[50] = 1.0

b, a = signal.butter(order, W, btype='bandstop')
y = signal.filtfilt(b, a, data_in)
expect = [ y ]
tests.append({
    "name": f"{suite_name} filter]",
    "js": [
        "const options = { btype: 'bandstop', analog: false }",
        "let data_in = zeros(100)",
        "data_in[50] = 1.0",
        "let fs = 10 // Sample frequency (Hz)",
        "let nyq = 0.5 * fs // Nyquist Frequency (Hz)",
        "let corner1 = 1.0 // Low Frequency corner (Hz)",
        "let corner2 = 2.0 // High frequency corner (Hz)",
        "let order = 2 // Filter order",
        "let W = [corner1/nyq, corner2/nyq] // Normailize frequencies",
        "let {b, a} = iirfilter(order, W, { btype: 'bandstop' })",
        "let y = filtfilt(b, a, data_in)",
    ],
    "expect": expect,
    "assert": [ "y" ]
})

lines = header()
lines += suite(suite_name, tests, tol)

with open(f"tests/{suite_name}.js", "w") as f:
    print(lines, file=f)

