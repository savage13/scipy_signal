import numpy as np


def format(val, indent=0):
    sp = " " * indent
    items = []
    #print('val', val, type(val))
    if type(val) is int:
        items.append( f"{val}" )
    elif type(val) is float or type(val) is np.float64:
        items.append( f"{val}")
    elif type(val) is np.complex128:
        items.append( f"new Complex({val.real}, {val.imag})" )
    elif type(val) is list or type(val) is np.ndarray:
        if type(val[0]) is np.complex128:
            items.append( "[" + ", ".join([f"new Complex({z.real}, {z.imag})" for z in val] ) + "]")
        else:
            items.append( val.tolist() )
    else:
        raise ValueError("unknown type", type(val))
    return items

def test(t, tol = 1e-15, indent = 4):
    indent = " "*indent
    name = t['name']
    s = [ f"test('{name}', (t) => {{" ]

    s.extend( [indent + line for line in t['js']] )

    expect = t['expect']

    for i,var in enumerate(t['assert']):
        value = format(expect[i], 4)
        s.append(indent + f"const {var}_expect = {value[0]}")
        for item in value[1:]:
            s.append(indent + f"{item}")
        s.append(indent + f"deepEqualTolerance({var}_expect, {var}, {tol})")
    s.append( f"}})" )
    s = [ indent + si for si in s ]
    return "\n".join(s)

def suite(name, tests, tol):
    tests = [ test(t, tol=tol) for t in tests ]
    tests = "\n".join(tests)
    return f'''
suite('{name}', () => {{
{tests}
}})
'''
