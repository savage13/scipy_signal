// src/numpy.ts
function arange(v0, v1, dk) {
  let out = [];
  let v = v0;
  let i = 0;
  while (v < v1) {
    out.push(v);
    i += 1;
    v = v0 + dk * i;
  }
  return out;
}
function zeros(n) {
  let v = Array(n);
  for (let i = 0; i < n; i++) {
    v[i] = 0;
  }
  return v;
}
function ones(n) {
  let v = Array(n);
  for (let i = 0; i < n; i++) {
    v[i] = 1;
  }
  return v;
}
function argmin(v) {
  if (v.length == 0)
    throw new Error("emtpy array into argmin");
  let k = 0;
  for (let i = 1; i < v.length; i++) {
    if (v[i] < v[k]) {
      k = i;
    }
  }
  return k;
}
function linspace(start, stop, n, options = {}) {
  let default_options = {
    endpoint: true
  };
  options = Object.assign({}, default_options, options);
  let div = n;
  if (options.endpoint) {
    div = n - 1;
  }
  let delta = stop - start;
  if (delta == 0) {
    return zeros(n).map((_) => start);
  }
  let step = delta / div;
  let y;
  if (div > 0) {
    y = arange(0, n, 1).map((v) => start + v * step);
  } else {
    y = arange(0, n, 1).map((v) => start + v * delta);
  }
  return y;
}
function asArray(x) {
  if (Array.isArray(x)) {
    return x;
  }
  return [x];
}
function sum(values) {
  let total = 0;
  for (const value of values) {
    total += value;
  }
  return total;
}

// src/complex.ts
var Complex2 = class _Complex {
  re;
  im;
  constructor(re, im) {
    this.re = re;
    this.im = im;
  }
  copy() {
    return new _Complex(this.re, this.im);
  }
  exp() {
    const x = this.re;
    const y = this.im;
    let ex = Math.exp(x);
    let re = ex * Math.cos(y);
    let im = ex * Math.sin(y);
    return new _Complex(re, im);
  }
  neg() {
    return this.mul(new _Complex(-1, 0));
  }
  mul(z) {
    let a = this.re;
    let b = this.im;
    let c = z.re;
    let d = z.im;
    return new _Complex(a * c - b * d, a * d + b * c);
  }
  is_zero() {
    return this.re == 0 && this.im == 0;
  }
  cmp(z) {
    let dx = Math.abs(this.re - z.re);
    let dy = Math.abs(this.im - z.im);
    return dx < 1e-13 && dy < 1e-13;
  }
  // See numpy (https://github.com/numpy/numpy/blob/.../numpy/_core/src/npymath/npy_math_complex.c.src) csqrt()
  sqrt() {
    let x = this.re;
    let y = this.im;
    let re = 0;
    let im = 0;
    if (false) {
      let r = Math.sqrt(x * x + y * y);
      re = Math.sqrt(0.5 * (r + x));
      im = Math.sqrt(0.5 * (r - x)) * sign(y);
    } else {
      if (x == 0 && y == 0) {
        re = 0;
        im = y;
      } else if (x >= 0) {
        let t = Math.sqrt((x + hypot(x, y)) * 0.5);
        re = t;
        im = y / (2 * t);
      } else {
        let t = Math.sqrt((-x + hypot(x, y)) * 0.5);
        re = Math.abs(y) / (2 * t);
        im = t * sign(y);
      }
    }
    return new _Complex(re, im);
  }
  // See numpy (https://github.com/numpy/numpy/blob/.../numpy/_core/src/npymath/npy_math_complex.c.src) cdiv()
  div(z) {
    let ar = this.re;
    let ai = this.im;
    let br = z.re;
    let bi = z.im;
    let re = 0;
    let im = 0;
    if (true) {
      const abs_br = Math.abs(br);
      const abs_bi = Math.abs(bi);
      if (abs_br >= abs_bi) {
        if (abs_br == 0 && abs_bi == 0) {
          re = ar / abs_br;
          im = ai / abs_bi;
        } else {
          const rat = bi / br;
          const scl = 1 / (br + bi * rat);
          re = (ar + ai * rat) * scl;
          im = (ai - ar * rat) * scl;
        }
      } else {
        const rat = br / bi;
        const scl = 1 / (bi + br * rat);
        re = (ar * rat + ai) * scl;
        im = (ai * rat - ar) * scl;
      }
    } else {
      let r = br * br + bi * bi;
      re = (ar * br + ai * bi) / r;
      im = (ai * br - ar * bi) / r;
    }
    return new _Complex(re, im);
  }
  add(z) {
    let x = this.re;
    let y = this.im;
    let u = z.re;
    let v = z.im;
    return new _Complex(x + u, y + v);
  }
  sub(z) {
    let x = this.re;
    let y = this.im;
    let u = z.re;
    let v = z.im;
    return new _Complex(x - u, y - v);
  }
  str() {
    return `(${this.re}, ${this.im})`;
  }
  abs() {
    return Math.sqrt(this.re * this.re + this.im * this.im);
  }
  conj() {
    return new _Complex(this.re, -this.im);
  }
  is_real() {
    return this.im == 0;
  }
};
function isNegativeZero(v) {
  return Object.is(v, -0);
}
function sign(x) {
  if (x >= 0 && !isNegativeZero(x)) {
    return 1;
  } else {
    return -1;
  }
}
function zprod(v) {
  let out = new Complex2(1, 0);
  for (let i = 0; i < v.length; i++) {
    out = out.mul(v[i]);
  }
  return out;
}
function zpolyval_from_roots(x, r) {
  let dx = r.map((root) => x.sub(root));
  return zprod(dx);
}
function trimseq(a) {
  let n = a.length;
  if (n == 0 || !a[n - 1].is_zero()) {
    return a;
  }
  while (a.length > 1) {
    let n2 = a.length;
    if (!a[n2 - 1].is_zero()) {
      break;
    }
    a.pop();
  }
  return a;
}
function polymul(a, b) {
  let zero = new Complex2(0, 0);
  let n = a.length + b.length - 1;
  let res = [];
  if (b.every((z) => z.re == 0 && z.im == 0)) {
    return a.map((z) => zero.copy());
  }
  for (let i = 0; i < n; i++) {
    res.push(zero.copy());
  }
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      res[i + j] = res[i + j].add(a[i].mul(b[j]));
    }
  }
  return res;
}
function poly(roots) {
  const one = new Complex2(1, 0);
  let p = [new Complex2(1, 0)];
  for (const root of roots) {
    p = polymul(p, [one.copy(), root.neg()]);
  }
  return p;
}
function isComplex(v) {
  return v instanceof Complex2;
}
function isReal(v) {
  return parseInt(v, 10) == v || parseFloat(v) == v;
}
function asComplex(v) {
  if (v instanceof Complex2) {
    return v;
  }
  if (parseInt(v, 10) == v) {
    return new Complex2(v, 0);
  }
  if (parseFloat(v) == v) {
    return new Complex2(v, 0);
  }
  throw new Error(`Expected number or Complex number got ${v}`);
}
function cplxreal(z, tol = -1) {
  if (!Array.isArray(z)) {
    z = [z];
  }
  if (z.length == 0) {
    return [z, z];
  }
  if (tol < 0) {
    const eps = 1e-16;
    tol = 100 * eps;
  }
  z = z.map((v) => asComplex(v));
  z = z.sort((a, b) => a.re - b.re || Math.abs(a.im) - Math.abs(b.im));
  let zr = [];
  let zp = [];
  let zn = [];
  for (let i = 0; i < z.length; i++) {
    if (Math.abs(z[i].im) <= tol * z[i].abs()) {
      zr.push(z[i].re);
    } else {
      if (z[i].im > 0) {
        zp.push(z[i]);
      } else {
        zn.push(z[i]);
      }
    }
  }
  if (zr.length == z.length) {
    return [[], zr];
  }
  if (zp.length != zn.length) {
    throw new Error("Array contains complex value with no matching conjugate");
  }
  let chunks = [[0]];
  let k = 0;
  for (let i = 1; i < z.length; i++) {
    if (Math.abs(z[i - 1].re - z[i].re) > tol * z[i - 1].abs()) {
      k += 1;
      chunks.push([]);
    }
    chunks[k].push(i);
  }
  for (const c of chunks) {
    let [k0, k1] = [c[0], c[c.length - 1]];
    z.slice(k0, k1 + 1).sort((a, b) => Math.abs(a.im) - Math.abs(b.im));
  }
  let two = new Complex2(2, 0);
  let zc = zp.map((_, i) => zp[i].add(zn[i].conj()).div(two));
  return [zc, zr];
}
function hypot(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  if (a < b) {
    let tmp = a;
    a = b;
    b = tmp;
  }
  if (a == 0) {
    return 0;
  }
  let ba = b / a;
  return a * Math.sqrt(1 + ba * ba);
}

// src/zpk.ts
function lp2lp_zpk(z, p, k, wo) {
  z = asArray(z);
  p = asArray(p);
  let degree = _relative_degree(z, p);
  let w = new Complex2(wo, 0);
  let z_lp = z.map((v) => v.mul(w));
  let p_lp = p.map((v) => v.mul(w));
  let k_lp = k * Math.pow(wo, degree);
  return { z: z_lp, p: p_lp, k: k_lp };
}
function lp2hp_zpk(z, p, k, wo) {
  z = asArray(z);
  p = asArray(p);
  let degree = _relative_degree(z, p);
  let w = new Complex2(wo, 0);
  let z_hp = z.map((v) => w.div(v));
  let p_hp = p.map((v) => w.div(v));
  for (let i = 0; i < degree; i++) {
    z_hp.push(new Complex2(0, 0));
  }
  let numer = zprod(z.map((zi) => zi.neg()));
  let denom = zprod(p.map((pi) => pi.neg()));
  let k_hp = k * numer.div(denom).re;
  return { z: z_hp, p: p_hp, k: k_hp };
}
function lp2bp_zpk(z, p, k, wo, bw) {
  z = asArray(z);
  p = asArray(p);
  let degree = _relative_degree(z, p);
  const zbw2 = new Complex2(bw / 2, 0);
  const z_lp = z.map((zi) => zi.mul(zbw2));
  const p_lp = p.map((pi) => pi.mul(zbw2));
  const zwo = new Complex2(wo * wo, 0);
  let z_bp_p = z_lp.map((zi) => zi.add(zi.mul(zi).sub(zwo).sqrt()));
  let z_bp_n = z_lp.map((zi) => zi.sub(zi.mul(zi).sub(zwo).sqrt()));
  let z_bp = [...z_bp_p, ...z_bp_n];
  let p_bp_p = p_lp.map((pi) => pi.add(pi.mul(pi).sub(zwo).sqrt()));
  let p_bp_n = p_lp.map((pi) => pi.sub(pi.mul(pi).sub(zwo).sqrt()));
  let p_bp = [...p_bp_p, ...p_bp_n];
  for (let i = 0; i < degree; i++) {
    z_bp.push(new Complex2(0, 0));
  }
  let k_bs = k * Math.pow(bw, degree);
  return { z: z_bp, p: p_bp, k: k_bs };
}
function lp2bs_zpk(z, p, k, wo, bw) {
  z = asArray(z);
  p = asArray(p);
  let degree = _relative_degree(z, p);
  const zbw2 = new Complex2(bw / 2, 0);
  const z_hp = z.map((zi) => zbw2.div(zi));
  const p_hp = p.map((pi) => zbw2.div(pi));
  const zwo = new Complex2(wo * wo, 0);
  let z_hp_p = z_hp.map((zi) => zi.add(zi.mul(zi).sub(zwo).sqrt()));
  let z_hp_n = z_hp.map((zi) => zi.sub(zi.mul(zi).sub(zwo).sqrt()));
  let z_bs = [...z_hp_p, ...z_hp_n];
  let p_hp_p = p_hp.map((pi) => pi.add(pi.mul(pi).sub(zwo).sqrt()));
  let p_hp_n = p_hp.map((pi) => pi.sub(pi.mul(pi).sub(zwo).sqrt()));
  let p_bs = [...p_hp_p, ...p_hp_n];
  for (let i = 0; i < degree; i++) {
    z_bs.push(new Complex2(0, wo));
  }
  for (let i = 0; i < degree; i++) {
    z_bs.push(new Complex2(0, -wo));
  }
  let n1 = new Complex2(-1, 0);
  let numer = zprod(z.map((zi) => zi.mul(n1)));
  let denom = zprod(p.map((pi) => pi.mul(n1)));
  let k_bs = k * numer.div(denom).re;
  return { z: z_bs, p: p_bs, k: k_bs };
}
function bilinear_zpk(z, p, k, fs) {
  z = asArray(z);
  p = asArray(p);
  const degree = _relative_degree(z, p);
  const fs2 = new Complex2(2 * fs, 0);
  let z_z = z.map((zi) => fs2.add(zi).div(fs2.sub(zi)));
  let p_z = p.map((zi) => fs2.add(zi).div(fs2.sub(zi)));
  for (let i = 0; i < degree; i++) {
    z_z.push(new Complex2(-1, 0));
  }
  let numer = zprod(z.map((zi) => fs2.sub(zi)));
  let denom = zprod(p.map((zi) => fs2.sub(zi)));
  let k_z = k * numer.div(denom).re;
  return { z: z_z, p: p_z, k: k_z };
}
function zpk2tf(z, p, k) {
  z = asArray(z);
  p = asArray(p);
  let a = poly(p).map((v) => v.re);
  let b = poly(z).map((v) => v.re * k);
  return { b, a };
}
function zpk2sos(z, p, k) {
  let valid_pairings = ["nearest", "keep_odd", "minimal"];
  let analog = false;
  let pairing = "none";
  z = asArray(z);
  p = asArray(p);
  if (pairing == "none") {
    pairing = analog ? "minimal" : "nearest";
  }
  if (!valid_pairings.includes(pairing)) {
    throw new Error(`fparing must be one of the ${valid_pairings}, not ${pairing}`);
  }
  if (analog && pairing != "minimal") {
    throw new Error(`for analog zpk2sos conversion, pairing must be minimal`);
  }
  if (z.length == 0 && p.length == 0) {
    if (!analog) {
      return [[k, 0, 0, 1, 0, 0]];
    } else {
      return [[0, 0, k, 0, 0, 1]];
    }
  }
  let n_sections = 1;
  if (pairing != "minimal") {
    for (let i = p.length; i < z.length; i++) {
      p.push(new Complex2(0, 0));
    }
    for (let i = z.length; i < p.length; i++) {
      z.push(new Complex2(0, 0));
    }
    n_sections = Math.floor((Math.max(p.length, z.length) + 1) / 2);
    if (p.length % 2 == 1 && pairing == "nearest") {
      p.push(new Complex2(0, 0));
      z.push(new Complex2(0, 0));
    }
    if (p.length != z.length) {
      throw new Error("number of poles != number of zeros (internal error)");
    }
  } else {
    if (p.length < z.length) {
      throw new Error("for analog zpk2sos conversion, must have p.length >= z.length");
    }
    n_sections = Math.floor((p.length + 1) / 2);
  }
  z = cplxreal(z).flat().map((v) => asComplex(v));
  p = cplxreal(p).flat().map((v) => asComplex(v));
  let idx_worst = null;
  if (!analog) {
    idx_worst = (v) => {
      return argmin(v.map((vi) => Math.abs(1 - vi.abs())));
    };
  } else {
    idx_worst = (v) => {
      return argmin(v.map((vi) => Math.abs(vi.re)));
    };
  }
  let sos = Array(n_sections).fill(0).map((_) => zeros(6));
  let zero = new Complex2(0, 0);
  for (let si = n_sections - 1; si >= 0; si--) {
    let p1_idx = idx_worst(p);
    let p1 = p.splice(p1_idx, 1)[0];
    if (p1.is_real() && p.every((v) => !v.is_real())) {
      if (pairing == "minimal") {
        let z1_idx = nearest_real_complex_idx(z, p1, "real");
        let z1 = z.splice(z1_idx, 1)[0];
        sos[si] = single_zpksos([z1, zero], [p1, zero], 1);
      } else if (z.length > 0) {
        let z1_idx = nearest_real_complex_idx(z, p1, "real");
        let z1 = z.splice(z1_idx, 1)[0];
        sos[si] = single_zpksos([z1], [p1], 1);
      } else {
        sos[si] = single_zpksos([], [p1], 1);
      }
    } else if (p.length + 1 == z.length && p1.im != 0 && sum(p.map((v) => v.re)) == 1 && sum(z.map((v) => v.re)) == 1) {
      let z1_idx = nearest_real_complex_idx(z, p1, "complex");
      let z1 = z.splice(z1_idx, 1)[0];
      sos[si] = single_zpksos([z1, z1.conj()], [p1, p1.conj()], 1);
    } else {
      let p2 = new Complex2(0, 0);
      if (p1.is_real()) {
        let prealidx = [];
        for (let i = 0; i < p.length; i++) {
          if (p[i].is_real()) {
            prealidx.push(i);
          }
        }
        let pnz = prealidx.map((i) => p[i]);
        let p_idx = idx_worst(pnz);
        let p2_idx = prealidx[p_idx];
        p2 = p.splice(p2_idx, 1)[0];
      } else {
        p2 = p1.conj();
      }
      if (z.length > 0) {
        let z1_idx = nearest_real_complex_idx(z, p1, "any");
        let z1 = z.splice(z1_idx, 1)[0];
        if (z1.im != 0) {
          sos[si] = single_zpksos([z1, z1.conj()], [p1, p2], 1);
        } else {
          if (z.length > 0) {
            let z2_idx = nearest_real_complex_idx(z, p1, "real");
            let z2 = z.splice(z2_idx, 1)[0];
            if (z2.im != 0) {
              throw new Error(`Expected current zero to be real, got ${z2.re} ${z2.im}`);
            }
            sos[si] = single_zpksos([z1, z2], [p1, p2], 1);
          } else {
            sos[si] = single_zpksos([z1], [p1, p2], 1);
          }
        }
      } else {
        sos[si] = single_zpksos([], [p1, p2], 1);
      }
    }
  }
  if (z.length != 0 || p.length != 0) {
    throw new Error("Remaining zeros and poles exists, internal error");
  }
  for (let i = 0; i < 3; i++) {
    sos[0][i] *= k;
  }
  return sos;
}
function single_zpksos(z, p, k) {
  let sos = zeros(6);
  let { b, a } = zpk2tf(z, p, k);
  let nb = b.length;
  for (let i = 0; i < b.length; i++) {
    sos[3 - nb + i] = b[i];
  }
  let na = b.length;
  for (let i = 0; i < a.length; i++) {
    sos[6 - na + i] = a[i];
  }
  return sos;
}
function _relative_degree(z, p) {
  let degree = p.length - z.length;
  if (degree < 0) {
    throw new Error("Improper transfer function. Must have at least as many poles as zeros.");
  }
  return degree;
}
function nearest_real_complex_idx(fro, to, which) {
  if (!["real", "complex", "any"].includes(which)) {
    throw new Error("which in nearest_real_complex_idx must be real, complex or any");
  }
  let decor = (v, i) => [v, i];
  let undecor = (a) => a[1];
  let argsort = (arr) => arr.map(decor).sort().map(undecor);
  let order = argsort(fro.map((v) => v.sub(to).abs()));
  if (which == "any") {
    return order[0];
  }
  let tmp = order.map((i) => fro[i]);
  let mask = tmp.map((v) => v.im == 0);
  if (which == "complex") {
    mask = mask.map((v) => !v);
  }
  for (let i = 0; i < mask.length; i++) {
    if (mask[i]) {
      return order[i];
    }
  }
  throw new Error("cannot find nearest value");
}

// src/filter.ts
function lfilter_zi(b, a) {
  b = [...asArray(b)];
  a = [...asArray(a)];
  if (a[0] != 1) {
    throw new Error("a[0] must be 1.0");
  }
  let n = Math.max(a.length, b.length);
  for (let i = a.length; i < n; i++) {
    a.push(0);
  }
  for (let i = b.length; i < n; i++) {
    b.push(0);
  }
  let IminusA = a.slice(1);
  IminusA[0] += 1;
  let B = b.map((_, i) => b[i] - a[i] * b[0]);
  B.shift();
  let zi = zeros(n - 1);
  zi[0] = sum(B) / sum(IminusA);
  let asum = 1;
  let csum = 0;
  for (let k = 1; k < n - 1; k++) {
    asum += a[k];
    csum += b[k] - a[k] * b[0];
    zi[k] = asum * zi[0] - csum;
  }
  return zi;
}
function validate_pad(padtype, padlen, x, axis, ntaps) {
  const padtypes = { even: 1, odd: 1, constant: 1, none: 1 };
  let edge = 0;
  if (!(padtype in padtypes)) {
    throw new Error(`Unknown value ${padtype} given to padtype`);
  }
  if (padtype == "none") {
    padlen = 0;
  }
  if (padlen < 0) {
    edge = ntaps * 3;
  } else {
    edge = padlen;
  }
  if (axis != -1 && axis != 0) {
    throw new Error("Unimplemented filter of multiple axis, 0 or -1 supported");
  }
  if (Array.isArray(x[0])) {
    throw new Error("Unoimplmented filter of multiple dimension data");
  }
  let ext = [];
  if (padtype != "none" && edge > 0) {
    switch (padtype) {
      case "even":
        throw new Error("unimplemented pad type");
      case "odd":
        ext = odd_ext(x, edge);
        break;
      case "constant":
        throw new Error("unimplemented pad type");
    }
  } else {
    ext = x;
  }
  return { edge, ext };
}
function odd_ext(x, n) {
  if (n < 1) {
    return x;
  }
  if (n > x.length - 1) {
    throw new Error(`The extension length ${n} is too big ${x.length - 1}`);
  }
  let m = x.length;
  const x0 = x[0];
  const x1 = x[m - 1];
  let left_end = Array(n).fill(0).map((_, i) => 2 * x0 - x[n - i]);
  let right_end = Array(n).fill(0).map((_, i) => 2 * x1 - x[m - i - 2]);
  return [...left_end, ...x, ...right_end];
}
function lfilter(b, a, x, axis, zi) {
  axis = axis * 1;
  const z = [...zi];
  const y = zeros(x.length);
  for (let i = 0; i < x.length; i++) {
    let ai = 0;
    let bi = 0;
    let zi2 = 0;
    y[i] = z[zi2] + b[bi] * x[i];
    ai++;
    bi++;
    for (let n = 0; n < b.length - 2; n++) {
      z[zi2] = z[zi2 + 1] + x[i] * b[bi] - y[i] * a[ai];
      ai++;
      bi++;
      zi2++;
    }
    z[zi2] = x[i] * b[bi] - y[i] * a[ai];
  }
  return { y, zf: z };
}
function filtfilt(b, a, x) {
  let axis = -1;
  let padtype = "odd";
  let padlen = -1;
  b = asArray(b);
  a = asArray(a);
  x = asArray(x);
  let ntaps = Math.max(a.length, b.length);
  let { edge, ext } = validate_pad(padtype, padlen, x, axis, ntaps);
  let zi = lfilter_zi(b, a);
  const zi_fwd = zi.map((v) => v * ext[0]);
  let { y } = lfilter(b, a, ext, axis, zi_fwd);
  let yrev = y.toReversed();
  let zi_rev = zi.map((v) => v * yrev[0]);
  ({ y } = lfilter(b, a, yrev, axis, zi_rev));
  y = y.toReversed();
  if (edge > 0) {
    y = [...y.slice(edge, -edge)];
  }
  return y;
}
function sosfilt_zi(sos) {
  if (sos[0].length != 6) {
    throw new Error("sos mut be shape (n_sections, 6)");
  }
  let n_sections = sos.length;
  let scale = 1;
  let zi = [];
  for (let i = 0; i < n_sections; i++) {
    let b = sos[i].slice(0, 3);
    let a = sos[i].slice(3);
    zi.push(lfilter_zi(b, a).map((v) => v * scale));
    scale *= sum(b) / sum(a);
  }
  return zi;
}
function _sosfilt(sos, xin, zi) {
  let x = [...xin];
  let n_sections = sos.length;
  for (let i = 0; i < x.length; i++) {
    let x_cur = 1 * x[i];
    for (let j = 0; j < n_sections; j++) {
      let x_new = sos[j][0] * x_cur + zi[j][0];
      zi[j][0] = sos[j][1] * x_cur - sos[j][4] * x_new + zi[j][1];
      zi[j][1] = sos[j][2] * x_cur - sos[j][5] * x_new;
      x_cur = x_new;
    }
    x[i] = x_cur;
  }
  return x;
}
function sosfilt(sos, x, zi) {
  if (zi == void 0) {
    zi = sos.map((_) => [0, 0]);
  }
  return _sosfilt(sos, x, zi);
}
function sosfiltfilt(sos, x) {
  let axis = -1;
  let padtype = "odd";
  let padlen = -1;
  x = asArray(x);
  let n_sections = sos.length;
  let ntaps = 2 * n_sections + 1;
  ntaps -= Math.min(sos.filter((v) => v[2] == 0).length, sos.filter((v) => v[5] == 0).length);
  let { edge, ext } = validate_pad(padtype, padlen, x, axis, ntaps);
  let zi = sosfilt_zi(sos);
  let zi_fwd = zi.map((v) => [v[0] * ext[0], v[1] * ext[0]]);
  let y = sosfilt(sos, ext, zi_fwd);
  let yrev = y.toReversed();
  let zi_rev = zi.map((v) => [v[0] * yrev[0], v[1] * yrev[0]]);
  y = sosfilt(sos, yrev, zi_rev);
  y = y.toReversed();
  if (edge > 0) {
    y = [...y.slice(edge, -edge)];
  }
  return y;
}

// src/poly.ts
function polyval(p, x) {
  if (isComplex(x) || p.some((v2) => isComplex(v2))) {
    return zpolyval(p.map(asComplex), asComplex(x));
  }
  x = x;
  let P = p;
  let v = 0;
  let k = 0;
  for (let i = p.length - 1; i >= 0; i--) {
    v += Math.pow(x, k++) * P[i];
  }
  return v;
}
function zpolyval(p, x) {
  const n = p.length;
  if (n <= 0) {
    return new Complex2(0, 0);
  }
  let v = p[n - 1];
  let xn = new Complex2(1, 0);
  for (let i = p.length - 2; i >= 0; i--) {
    xn = xn.mul(x);
    v = p[i].mul(xn).add(v);
  }
  return v;
}

// src/scipy.ts
var band_dict = {
  "band": "bandpass",
  "bandpass": "bandpass",
  "pass": "bandpass",
  "bp": "bandpass",
  "bs": "bandstop",
  "bandstop": "bandstop",
  "bands": "bandstop",
  "stop": "bandstop",
  "l": "lowpass",
  "low": "lowpass",
  "lowpass": "lowpass",
  "lp": "lowpass",
  "high": "highpass",
  "highpass": "highpass",
  "h": "highpass",
  "hp": "highpass"
};
var filter_dict = {
  "butter": "butter",
  "butterworth": "butter"
  // 'cauer': [ellipap, ellipord],
  // 'elliptic': [ellipap, ellipord],
  // 'ellip': [ellipap, ellipord],
  // 'bessel': 'bessel',
  // 'bessel_phase': [besselap],
  // 'bessel_delay': [besselap],
  // 'bessel_mag': [besselap],
  // 'cheby1': [cheb1ap, cheb1ord],
  // 'chebyshev1': [cheb1ap, cheb1ord],
  // 'chebyshevi': [cheb1ap, cheb1ord],
  // 'cheby2': [cheb2ap, cheb2ord],
  // 'chebyshev2': [cheb2ap, cheb2ord],
  // 'chebyshevii': [cheb2ap, cheb2ord],
};
function is_number(n) {
  return parseInt(n) == n;
}
function is_positive_number(n) {
  return is_number(n) && n > 0;
}
function buttap(N) {
  if (!is_positive_number(N)) {
    throw new Error("Filter order must be a nonnegative integer");
  }
  let z = [];
  let m = arange(-N + 1, N, 2);
  let p = m.map((mi) => new Complex2(Math.PI * mi / (2 * N), 0)).map((mi) => mi.mul(new Complex2(0, 1))).map((mi) => mi.exp()).map((mi) => mi.neg());
  let k = 1;
  return { z, p, k };
}
function freqz_zpk(z, p, k, options = {}) {
  const TAU = 2 * Math.PI;
  z = asArray(z);
  p = asArray(p);
  let w = freqz_options(options);
  let zm1 = w.map((v) => new Complex2(0, v).exp());
  let h = [];
  let k0 = new Complex2(k, 0);
  for (const zm of zm1) {
    let numer = zpolyval_from_roots(zm, z);
    let denom = zpolyval_from_roots(zm, p);
    h.push(numer.div(denom).mul(k0));
  }
  w = w.map((v) => v * options.fs / TAU);
  return { w, h };
}
function freqz_options(options = {}) {
  const TAU = 2 * Math.PI;
  const default_options = {
    worN: 512,
    whole: false,
    fs: TAU
  };
  options = Object.assign({}, default_options, options);
  let lastpoint = options.whole ? TAU : Math.PI;
  let w = [];
  if (options.worN == -1) {
    w = linspace(0, lastpoint, 512, { endpoint: false });
  } else if (Number.isInteger(options.worN)) {
    w = linspace(0, lastpoint, options.worN, { endpoint: false });
  } else {
    w = asArray(options.worN);
    w = w.map((v) => TAU * v / options.fs);
  }
  return w;
}
function _freqz(b, a, zm1) {
  let h = [];
  for (const zm of zm1) {
    let numer = polyval(b, zm);
    let denom = polyval(a, zm);
    h.push(numer.div(denom));
  }
  return h;
}
function freqz(b, a, options = {}) {
  const TAU = 2 * Math.PI;
  let w = freqz_options(options);
  let zm1 = w.map((v) => new Complex2(0, v).exp());
  let h = _freqz(b, a, zm1);
  w = w.map((v) => v * options.fs / TAU);
  return { w, h };
}
function freqz_sos(sos, options = {}) {
  const TAU = 2 * Math.PI;
  let n_sections = sos.length;
  let w = freqz_options(options);
  let zm1 = w.map((v) => new Complex2(0, v).exp());
  let h = w.map((_) => new Complex2(1, 0));
  for (let j = 0; j < n_sections; j++) {
    let row = sos[j];
    let b = row.slice(0, 3);
    let a = row.slice(3);
    let h0 = _freqz(b, a, zm1);
    h = h.map((_, i) => h[i].mul(h0[i]));
  }
  w = w.map((v) => v * options.fs / TAU);
  return { w, h };
}
function iirfilter(N, Wn, options) {
  let fs = 1;
  let warped = [];
  let z;
  let p;
  let k;
  const output_types = ["ba", "sos", "zpk"];
  const default_options = {
    btype: "bandpass",
    analog: false,
    ftype: "butter",
    output: "ba"
  };
  Wn = asArray(Wn);
  if (Wn.length > 1 && Wn[0] >= Wn[1]) {
    throw new Error("Wn[0] must be less than Wn[1]");
  }
  options = Object.assign({}, default_options, options);
  let btype = band_dict[options.btype.toLowerCase()];
  if (btype === void 0) {
    throw new Error(`${options.btype} is an invalid bandtype for filter`);
  }
  let ftype = filter_dict[options.ftype.toLowerCase()];
  if (ftype === void 0) {
    throw new Error(`${options.ftype} is not a valid basic IIR filter`);
  }
  if (!output_types.includes(options.output)) {
    throw new Error(`${options.output} is not a valid output form`);
  }
  switch (ftype) {
    case "butter":
      ({ z, p, k } = buttap(N));
      break;
    default:
      throw new Error(`${options.ftype} not implemented in iirfilter`);
  }
  if (!options.analog) {
    if (Wn.some((w) => w <= 0 || w >= 1)) {
      throw new Error("Digital filter critical frequencies must be 0 < Wn < 1");
    }
    fs = 2;
    warped = Wn.map((w) => 2 * fs * Math.tan(Math.PI * w / fs));
  } else {
    warped = Wn;
  }
  switch (btype) {
    case "lowpass":
      ({ z, p, k } = lp2lp_zpk(z, p, k, warped[0]));
      break;
    case "highpass":
      ({ z, p, k } = lp2hp_zpk(z, p, k, warped[0]));
      break;
    case "bandpass":
      {
        let bw = warped[1] - warped[0];
        let wo = Math.sqrt(warped[0] * warped[1]);
        ({ z, p, k } = lp2bp_zpk(z, p, k, wo, bw));
      }
      break;
    case "bandstop":
      {
        let bw = warped[1] - warped[0];
        let wo = Math.sqrt(warped[0] * warped[1]);
        ({ z, p, k } = lp2bs_zpk(z, p, k, wo, bw));
      }
      break;
  }
  if (!options.analog) {
    ({ z, k, p } = bilinear_zpk(z, p, k, fs));
  }
  switch (options.output) {
    case "zpk":
      return { z, p, k };
    case "ba":
      return zpk2tf(z, p, k);
    case "sos":
      return zpk2sos(z, p, k);
    default:
      throw new Error("unknown output type");
  }
}
function butter(N, Wn, options = {}) {
  options.ftype = "butter";
  return iirfilter(N, Wn, options);
}
function butter_bandrej(cutoffs, fs, order = 2) {
  const options = { btype: "bandstop", analog: false };
  const nyq = 0.5 * fs;
  const normal_cutoffs = cutoffs.map((f) => f / nyq);
  return butter(order, normal_cutoffs, options);
}
function butter_bandrej_filtfilt(data, cutoffs, fs, order = 2) {
  let { b, a } = butter_bandrej(cutoffs, fs, order);
  return filtfilt(b, a, data);
}
export {
  Complex2 as Complex,
  arange,
  asComplex,
  bilinear_zpk,
  buttap,
  butter,
  butter_bandrej_filtfilt,
  cplxreal,
  filtfilt,
  freqz,
  freqz_sos,
  freqz_zpk,
  iirfilter,
  linspace,
  lp2bp_zpk,
  lp2bs_zpk,
  lp2hp_zpk,
  lp2lp_zpk,
  ones,
  poly,
  polymul,
  polyval,
  sosfilt,
  sosfiltfilt,
  zeros,
  zpk2sos,
  zpk2tf,
  zpolyval_from_roots
};
//# sourceMappingURL=scipy_signal.js.map
