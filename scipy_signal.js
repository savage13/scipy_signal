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
  sqrt() {
    let x = this.re;
    let y = this.im;
    let r = Math.sqrt(x * x + y * y);
    let re = Math.sqrt(0.5 * (r + x));
    let im = Math.sqrt(0.5 * (r - x)) * sign(y);
    return new _Complex(re, im);
  }
  div(z) {
    let x = z.re;
    let y = z.im;
    let u = this.re;
    let v = this.im;
    let r = x * x + y * y;
    let re = (u * x + v * y) / r;
    let im = (v * x - u * y) / r;
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
  for (let i = 0; i < n; i++) {
    res.push(zero.copy());
  }
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      res[i + j] = res[i + j].add(a[i].mul(b[j]));
    }
  }
  return trimseq(res);
}
function poly(roots) {
  const one = new Complex2(1, 0);
  let p = [new Complex2(1, 0)];
  for (const root of roots) {
    p = polymul(p, [one.copy(), root.neg()]);
  }
  return p;
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
function _relative_degree(z, p) {
  let degree = p.length - z.length;
  if (degree < 0) {
    throw new Error("Improper transfer function. Must have at least as many poles as zeros.");
  }
  return degree;
}
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
function freqz_zpk(z, p, k, options = {}) {
  const default_options = {
    worN: 512,
    whole: false,
    fs: 2 * Math.PI
  };
  const TAU = 2 * Math.PI;
  z = asArray(z);
  p = asArray(p);
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
      throw new Error("sos output not implemented");
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
  bilinear_zpk,
  buttap,
  butter,
  butter_bandrej_filtfilt,
  filtfilt,
  freqz_zpk,
  iirfilter,
  lfilter,
  lfilter_zi,
  linspace,
  lp2bp_zpk,
  lp2bs_zpk,
  lp2hp_zpk,
  lp2lp_zpk,
  ones,
  polymul,
  zeros,
  zpk2tf,
  zpolyval_from_roots
};
//# sourceMappingURL=scipy_signal.js.map
