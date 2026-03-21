# File: src/scipy.ts

## is_number

`function is_number(n: any): boolean`

   Check is value is an integer

   Arguments
   - n: any - Value

   Returns
   - boolean - true if an integer

## is_positive_number

`function is_positive_number(n: any): boolean`

   Arguments
   - n: any

   Returns
   - boolean

## buttap

`function buttap(N: number): ZPK`

   Arguments
   - N: number

   Returns
   - ZPK

## freqz_zpk

`function freqz_zpk(z: Complex[], p: Complex[], k: number, options: any): { w: number[], h: Complex[] }`

   Arguments
   - z: Complex[]
   - p: Complex[]
   - k: number
   - options: any

   Returns
   - { w: number[], h: Complex[] }

## freqz_options

`function freqz_options(options: any): number[]`

   Arguments
   - options: any

   Returns
   - number[]

## _freqz

`function _freqz(b: number[], a: number[], zm1: Complex[]): Complex[]`

   Arguments
   - b: number[]
   - a: number[]
   - zm1: Complex[]

   Returns
   - Complex[]

## freqz

`function freqz(b: number[], a: number[], options: any): { w: number[], h: Complex[] }`

   Arguments
   - b: number[]
   - a: number[]
   - options: any

   Returns
   - { w: number[], h: Complex[] }

## freqz_sos

`function freqz_sos(sos: SOS, options: any): { w: number[], h: Complex[] }`

   Arguments
   - sos: SOS
   - options: any

   Returns
   - { w: number[], h: Complex[] }

## iirfilter

`function iirfilter(N: number, Wn: number | number[], options: any): ZPK | BA | SOS`

   Arguments
   - N: number
   - Wn: number | number[]
   - options: any

   Returns
   - ZPK | BA | SOS

## butter

`function butter(N: number, Wn: number | number[], options: any): BA | ZPK | SOS`

   Arguments
   - N: number
   - Wn: number | number[]
   - options: any

   Returns
   - BA | ZPK | SOS

## butter_bandrej

`function butter_bandrej(cutoffs: number[], fs: number, order: number): BA | ZPK | SOS`

   Arguments
   - cutoffs: number[]
   - fs: number
   - order: number

   Returns
   - BA | ZPK | SOS

## butter_bandrej_filtfilt

`function butter_bandrej_filtfilt(data: number[], cutoffs: number[], fs: number, order: number): number[]`

   Arguments
   - data: number[]
   - cutoffs: number[]
   - fs: number
   - order: number

   Returns
   - number[]

# File: src/numpy.ts

## arange

`function arange(v0: number, v1: number, dk: number): number[]`

   Arguments
   - v0: number
   - v1: number
   - dk: number

   Returns
   - number[]

## zeros

`function zeros(n: number): number[]`

   Arguments
   - n: number

   Returns
   - number[]

## ones

`function ones(n: number): number[]`

   Arguments
   - n: number

   Returns
   - number[]

## argmin

`function argmin(v: number[]): number`

   Arguments
   - v: number[]

   Returns
   - number

## linspace

`function linspace(start: number, stop: number, n: number, options: any): number[]`

   Arguments
   - start: number
   - stop: number
   - n: number
   - options: any

   Returns
   - number[]

## asArray

`function asArray(x: number | number[] | Complex | Complex[]): (number | Complex)[]`

   Arguments
   - x: number | number[] | Complex | Complex[]

   Returns
   - (number | Complex)[]

## sum

`function sum(values: number[]): number`

   Arguments
   - values: number[]

   Returns
   - number

# File: src/complex.ts

## Class Complex
  Members
  - re: number
  - im: number


'constructor(re: number, im: number)'


### copy

`function copy(): Complex`

   Copy a complex number

   Returns
   - Complex - - Copy of Complex number (re, im)


### exp

`function exp(): Complex`

   Returns
   - Complex


### neg

`function neg(): Complex`

   Returns
   - Complex


### mul

`function mul(z: Complex): Complex`

   Arguments
   - z: Complex

   Returns
   - Complex


### is_zero

`function is_zero(): boolean`

   Returns
   - boolean


### cmp

`function cmp(z: Complex): boolean`

   Arguments
   - z: Complex

   Returns
   - boolean


### sqrt

`function sqrt(): Complex`

   Returns
   - Complex


### div

`function div(z: Complex): Complex`

   Arguments
   - z: Complex

   Returns
   - Complex


### add

`function add(z: Complex): Complex`

   Arguments
   - z: Complex

   Returns
   - Complex


### sub

`function sub(z: Complex): Complex`

   Arguments
   - z: Complex

   Returns
   - Complex


### str

`function str(): string`

   Returns
   - string


### abs

`function abs(): number`

   Returns
   - number


### conj

`function conj(): Complex`

   Returns
   - Complex


### is_real

`function is_real(): boolean`

   Returns
   - boolean



## isNegativeZero

`function isNegativeZero(v: number): boolean`

   Arguments
   - v: number

   Returns
   - boolean

## sign

`function sign(x: number): number`

   Arguments
   - x: number

   Returns
   - number

## zprod

`function zprod(v: Complex[]): Complex`

   Arguments
   - v: Complex[]

   Returns
   - Complex

## zpolyval_from_roots

`function zpolyval_from_roots(x: Complex, r: Complex[]): Complex`

   Arguments
   - x: Complex
   - r: Complex[]

   Returns
   - Complex

## trimseq

`function trimseq(a: Complex[]): Complex[]`

   Arguments
   - a: Complex[]

   Returns
   - Complex[]

## polymul

`function polymul(a: Complex[], b: Complex[]): Complex[]`

   Arguments
   - a: Complex[]
   - b: Complex[]

   Returns
   - Complex[]

## poly

`function poly(roots: Complex[]): Complex[]`

   Arguments
   - roots: Complex[]

   Returns
   - Complex[]

## isComplex

`function isComplex(v: any): boolean`

   Arguments
   - v: any

   Returns
   - boolean

## isReal

`function isReal(v: any): boolean`

   Arguments
   - v: any

   Returns
   - boolean

## asComplex

`function asComplex(v: any): Complex`

   Arguments
   - v: any

   Returns
   - Complex

## cplxreal

`function cplxreal(z: Complex[], tol: number): [Complex[], number[]]`

   Arguments
   - z: Complex[]
   - tol: number

   Returns
   - [Complex[], number[]]

## hypot

`function hypot(a: number, b: number): number`

   Compute hypot of a and b

   Arguments
   - a: number - - a value
   - b: number - - b value

   Returns
   - number

# File: src/zpk.ts

## lp2lp_zpk

`function lp2lp_zpk(z: Complex[], p: Complex[], k: number, wo: number): ZPK`

   Arguments
   - z: Complex[]
   - p: Complex[]
   - k: number
   - wo: number

   Returns
   - ZPK

## lp2hp_zpk

`function lp2hp_zpk(z: Complex[], p: Complex[], k: number, wo: number): ZPK`

   Arguments
   - z: Complex[]
   - p: Complex[]
   - k: number
   - wo: number

   Returns
   - ZPK

## lp2bp_zpk

`function lp2bp_zpk(z: Complex[], p: Complex[], k: number, wo: number, bw: number): ZPK`

   Arguments
   - z: Complex[]
   - p: Complex[]
   - k: number
   - wo: number
   - bw: number

   Returns
   - ZPK

## lp2bs_zpk

`function lp2bs_zpk(z: Complex[], p: Complex[], k: number, wo: number, bw: number): ZPK`

   Arguments
   - z: Complex[]
   - p: Complex[]
   - k: number
   - wo: number
   - bw: number

   Returns
   - ZPK

## bilinear_zpk

`function bilinear_zpk(z: Complex[], p: Complex[], k: number, fs: number): ZPK`

   Arguments
   - z: Complex[]
   - p: Complex[]
   - k: number
   - fs: number

   Returns
   - ZPK

## zpk2tf

`function zpk2tf(z: Complex[], p: Complex[], k: number): BA`

   Arguments
   - z: Complex[]
   - p: Complex[]
   - k: number

   Returns
   - BA

## zpk2sos

`function zpk2sos(z: Complex[], p: Complex[], k: number): SOS`

   Arguments
   - z: Complex[]
   - p: Complex[]
   - k: number

   Returns
   - SOS

## single_zpksos

`function single_zpksos(z: Complex[], p: Complex[], k: number): number[]`

   Arguments
   - z: Complex[]
   - p: Complex[]
   - k: number

   Returns
   - number[]

## _relative_degree

`function _relative_degree(z: Complex[], p: Complex[]): number`

   Arguments
   - z: Complex[]
   - p: Complex[]

   Returns
   - number

## nearest_real_complex_idx

`function nearest_real_complex_idx(fro: Complex[], to: Complex, which: string): number`

   Arguments
   - fro: Complex[]
   - to: Complex
   - which: string

   Returns
   - number

# File: src/scipy.ts

## is_number

`function is_number(n: any): boolean`

   Check is value is an integer

   Arguments
   - n: any - Value

   Returns
   - boolean - true if an integer

## is_positive_number

`function is_positive_number(n: any): boolean`

   Arguments
   - n: any

   Returns
   - boolean

## buttap

`function buttap(N: number): ZPK`

   Arguments
   - N: number

   Returns
   - ZPK

## freqz_zpk

`function freqz_zpk(z: Complex[], p: Complex[], k: number, options: any): { w: number[], h: Complex[] }`

   Arguments
   - z: Complex[]
   - p: Complex[]
   - k: number
   - options: any

   Returns
   - { w: number[], h: Complex[] }

## freqz_options

`function freqz_options(options: any): number[]`

   Arguments
   - options: any

   Returns
   - number[]

## _freqz

`function _freqz(b: number[], a: number[], zm1: Complex[]): Complex[]`

   Arguments
   - b: number[]
   - a: number[]
   - zm1: Complex[]

   Returns
   - Complex[]

## freqz

`function freqz(b: number[], a: number[], options: any): { w: number[], h: Complex[] }`

   Arguments
   - b: number[]
   - a: number[]
   - options: any

   Returns
   - { w: number[], h: Complex[] }

## freqz_sos

`function freqz_sos(sos: SOS, options: any): { w: number[], h: Complex[] }`

   Arguments
   - sos: SOS
   - options: any

   Returns
   - { w: number[], h: Complex[] }

## iirfilter

`function iirfilter(N: number, Wn: number | number[], options: any): ZPK | BA | SOS`

   Arguments
   - N: number
   - Wn: number | number[]
   - options: any

   Returns
   - ZPK | BA | SOS

## butter

`function butter(N: number, Wn: number | number[], options: any): BA | ZPK | SOS`

   Arguments
   - N: number
   - Wn: number | number[]
   - options: any

   Returns
   - BA | ZPK | SOS

## butter_bandrej

`function butter_bandrej(cutoffs: number[], fs: number, order: number): BA | ZPK | SOS`

   Arguments
   - cutoffs: number[]
   - fs: number
   - order: number

   Returns
   - BA | ZPK | SOS

## butter_bandrej_filtfilt

`function butter_bandrej_filtfilt(data: number[], cutoffs: number[], fs: number, order: number): number[]`

   Arguments
   - data: number[]
   - cutoffs: number[]
   - fs: number
   - order: number

   Returns
   - number[]

# File: src/filter.ts

## lfilter_zi

`function lfilter_zi(b: number[], a: number[]): number[]`

   Determine initial conditions for a filter

   Arguments
   - b: number[] - filter coefficients
   - a: number[] - filter coefficients

   Returns
   - number[] - Filter initial conditions

## validate_pad

`function validate_pad(padtype: string, padlen: number, x: number[], axis: number, ntaps: number): { edge: number, ext: number[] }`

   Pad a input array

   Arguments
   - padtype: string - even, odd, constant, or none (even and constant unsupported)
   - padlen: number - amount to pad array by; if < 0 use ntaps * 3
   - x: number[] - input array
   - axis: number - axis to pad on, unused
   - ntaps: number - see padlen

   Returns
   - { edge: number, ext: number[] }

## odd_ext

`function odd_ext(x: number[], n: number): number[]`

   Extend a sequence in an odd manner

   Arguments
   - x: number[] - input array
   - n: number - amount to extend array by

   Returns
   - number[] - extended array

## lfilter

`function lfilter(b: number[], a: number[], x: number[], axis: number, zi: number[]): { y: number[], zf: number[] }`

   Apply a filter coefficients to an array
   Filter is applied in one pass

   Arguments
   - b: number[] - Filter components (numerator)
   - a: number[] - Filter components (denomator)
   - x: number[] - Input array
   - axis: number - Input array axis, unused
   - zi: number[] - Filter initial conditions

   Returns
   - { y: number[], zf: number[] } - Filtered array

## filtfilt

`function filtfilt(b: number[], a: number[], x: number[]): number[]`

   Apply a filter coefficients to an array
   Filter is applied in two passes, forward and backwards

   Arguments
   - b: number[] - Filter components (numerator)
   - a: number[] - Filter components (denomator)
   - x: number[] - Input array

   Returns
   - number[] - Filtered array

## sosfilt_zi

`function sosfilt_zi(sos: SOS): number[][]`

   Determine initial conditions for a Second order section filter

   Arguments
   - sos: SOS - Second order section filter coefficients

   Returns
   - number[][] - Second order section initial conditions

## _sosfilt

`function _sosfilt(sos: SOS, xin: number[], zi: number[][]): number[]`

   Apply Second order section (SOS) filter coefficients to an array
   Filter is applied in one pass
   Internal function

   Arguments
   - sos: SOS - Second order section filter coefficients
   - xin: number[]
   - zi: number[][] - Initial conditions for the filter

   Returns
   - number[] - Filtered version of x

## sosfilt

`function sosfilt(sos: SOS, x: number[], zi: number[][]): number[]`

   Apply Second order section (SOS) filter coefficients to an array
   Filter is applied in one pass

   Arguments
   - sos: SOS - Second order section filter coefficients
   - x: number[] - Array to be filtered
   - zi: number[][] - Initial conditions for the filter

   Returns
   - number[] - Filtered version of x

## sosfiltfilt

`function sosfiltfilt(sos: SOS, x: number[]): number[]`

   Apply Second order section (SOS) filter coefficients to an array
   Filter is applied in two passes, forward and backwards

   Arguments
   - sos: SOS - Second order section filter coefficients
   - x: number[] - Array to be filtered

   Returns
   - number[] - Filtered version of x

# File: src/poly.ts

## polyval

`function polyval(p: number[] | Complex[], x: number | Complex): number | Complex`

   Compute value of complex polynomial at value x
   Takes either a number or complex values

   Arguments
   - p: number[] | Complex[] - Polynomial coefficients from high to low
   - x: number | Complex - Value to evaluate polynomial at

   Returns
   - number | Complex - Polynomial p evaluated at x

## zpolyval

`function zpolyval(p: Complex[], x: Complex): Complex`

   Compute value of complex polynomial at value x

   Arguments
   - p: Complex[] - Polynomial coefficients from high to low
   - x: Complex - Value to evaluate polynomial at

   Returns
   - Complex - Polynomial p evaluated at x


