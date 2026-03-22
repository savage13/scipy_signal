## API scipy_signal

- [iirfilter](#iirfilter) - Construct a IIR filter
- [freqz](#freqz) - Compute response of a filter in the frequency domain
- [freqz_zpk](#freqz_zpk) - Compute response of a filter in the frequency domain
- [freqz_sos](#freqz_sos) - Compute response of a filter in the frequency domain
- [buttap](#buttap) - Analog prototype for a butterworth filter
- [butter](#butter) - Construct a IIR Butterworth filter
- [butter_bandrej_filtfilt](#butter_bandrej_filtfilt) - Construct and filter data using a Butterworth IIRFilter
- [arange](#arange) - Generate increasing or decreasing array
- [zeros](#zeros) - Generate an array of zeros
- [ones](#ones) - Generate an array of ones
- [argmin](#argmin) - Find index of minimum value in an array
- [linspace](#linspace) - Generate a linear sequence, array
- [asArray](#asArray) - Make sure a value is an array
- [sum](#sum) - Calculate the sum of an array
- [Complex](#Complex)
  - [copy](#copy) - Copy a complex number
  - [exp](#exp) - Take exponential of complex number
  - [neg](#neg) - Take negative of complex number
  - [mul](#mul) - Multiply two complex numbers
  - [cmp](#cmp) - Compare two complex number within an absolute tolerance
  - [sqrt](#sqrt) - Take square root of a complex number
  - [div](#div) - Divide two complex numbers
  - [add](#add) - Add two complex numbers
  - [sub](#sub) - Subtract two complex numbers
  - [str](#str) - Convert to a string
  - [abs](#abs) - Take absolute value of a complex number
  - [conj](#conj) - Take conjugate of a complex number
  - [is_real](#is_real) - Check is complex is real
  - [is_zero](#is_zero) - Check if complex is zero
- [zprod](#zprod) - Multiply an array of Complex numbers
- [zpolyval_from_roots](#zpolyval_from_roots) - Compute value of complex polynomial defined by roots at a value
- [polymul](#polymul) - Multiply two complex polynomials
- [poly](#poly) - Find complex polynomial coefficients from a set of roots
- [isComplex](#isComplex) - Check if value is complex
- [isReal](#isReal) - Check is value is real
- [asComplex](#asComplex) - Convert a value to Complex
 This is throw an exception on a non-numeric value
- [cplxreal](#cplxreal) - Split into complex and real parts, combining conjugate pairs.
- [lp2lp_zpk](#lp2lp_zpk) - Convert a lowpass prototype to a lowpass with a different frequency
- [lp2hp_zpk](#lp2hp_zpk) - Convert a lowpass prototype to a highpass with a different frequency
- [lp2bp_zpk](#lp2bp_zpk) - Convert a lowpass prototype to a bandpass with a different frequencies
- [lp2bs_zpk](#lp2bs_zpk) - Convert a lowpass prototype to a bandstop with a different frequencies
- [bilinear_zpk](#bilinear_zpk) - Convert an analog filter to a digital filter using the bilinear transform
- [zpk2tf](#zpk2tf) - Concert a ZPK filter representation to a BA filter representation
- [zpk2sos](#zpk2sos) - Concert a ZPK filter representation to a SOS filter representation
- [iirfilter](#iirfilter) - Construct a IIR filter
- [freqz](#freqz) - Compute response of a filter in the frequency domain
- [freqz_zpk](#freqz_zpk) - Compute response of a filter in the frequency domain
- [freqz_sos](#freqz_sos) - Compute response of a filter in the frequency domain
- [buttap](#buttap) - Analog prototype for a butterworth filter
- [butter](#butter) - Construct a IIR Butterworth filter
- [butter_bandrej_filtfilt](#butter_bandrej_filtfilt) - Construct and filter data using a Butterworth IIRFilter
- [lfilter_zi](#lfilter_zi) - Determine initial conditions for a filter
- [lfilter](#lfilter) - Apply a filter coefficients to an array
   Filter is applied in one pass
- [filtfilt](#filtfilt) - Apply a filter coefficients to an array
   Filter is applied in two passes, forward and backwards
- [sosfilt_zi](#sosfilt_zi) - Determine initial conditions for a Second order section filter
- [sosfilt](#sosfilt) - Apply Second order section (SOS) filter coefficients to an array
   Filter is applied in one pass
- [sosfiltfilt](#sosfiltfilt) - Apply Second order section (SOS) filter coefficients to an array
   Filter is applied in two passes, forward and backwards
- [polyval](#polyval) - Compute value of complex polynomial at value x
   Takes either a number or complex values
- [zpolyval](#zpolyval) - Compute value of complex polynomial at value x



## iirfilter

`function iirfilter(N: number, Wn: number | number[], options: any): ZPK | BA | SOS`

   Construct a IIR filter

   Arguments
   - N: number - fitler order
   - Wn: number | number[] - filter corners, number for lowpass or highpass
 number[] for bandpass or bandstop
   - options: any - filter options
- btype: bandpass, bandstop, lowpass, highpass (defualt: bandpass)
- analog: true or false  (default: false)
- ftype: butter. (bessel, chebyshev1, chebyshev2, elliptic are unsupported)
- output: zpk, sos, ba (default: ba)

   Returns
   - ZPK | BA | SOS - Filter description in ZPK, BA or SOS format

## ZPK

Zeros, Poles, Constant Filter

```
export type ZPK = {
    z: Complex[];
    p: Complex[];
    k: number;
}
```

## BA

Polynomial Filter

```
export type BA = {
    b: number[];
    a: number[];
}
```

## SOS

Second order Section
  stored as 3 coefficients of polynomial numerator,
  then 3 coefficient of polynomial denominator
  for 6 terms total

```
export type SOS = number[][];
```

## freqz

`function freqz(b: number[], a: number[], options: any): { w: number[], h: Complex[] }`

   Compute response of a filter in the frequency domain

   Arguments
   - b: number[] - fitler polynomial coefficients, numerator
   - a: number[] - fitler polynomial coefficients, denominator
   - options: any - response options
- worN frequencies or length (default: 512)
- fs sampling frequency (default: 2*pi)
- whole compute frequencies up to fs (default: false)

   Returns
   - { w: number[], h: Complex[] }

## freqz_zpk

`function freqz_zpk(z: Complex[], p: Complex[], k: number, options: any): { w: number[], h: Complex[] }`

   Compute response of a filter in the frequency domain

   Arguments
   - z: Complex[] - fitler complex zeros
   - p: Complex[] - fitler complex poles
   - k: number - filter constant
   - options: any - response options
- worN frequencies or length (default: 512)
- fs sampling frequency (default: 2*pi)
- whole compute frequencies up to fs (default: false)

   Returns
   - { w: number[], h: Complex[] }

## freqz_sos

`function freqz_sos(sos: SOS, options: any): { w: number[], h: Complex[] }`

   Compute response of a filter in the frequency domain

   Arguments
   - sos: SOS - fitler coefficients in a second order section
   - options: any - response options
- worN frequencies or length (default: 512)
- fs sampling frequency (default: 2*pi)
- whole compute frequencies up to fs (default: false)

   Returns
   - { w: number[], h: Complex[] }

## buttap

`function buttap(N: number): ZPK`

   Analog prototype for a butterworth filter

   Arguments
   - N: number - Filter order

   Returns
   - ZPK - analog filter in ZPK format

## butter

`function butter(N: number, Wn: number | number[], options: any): BA | ZPK | SOS`

   Construct a IIR Butterworth filter

   Arguments
   - N: number - fitler order
   - Wn: number | number[] - filter corners, number for lowpass or highpass
 number[] for bandpass or bandstop
   - options: any - filter options
- btype: bandpass, bandstop, lowpass, highpass (defualt: bandpass)
- analog: true or false  (default: false)
- ftype: always butter
- output: zpk, sos, ba (default: ba)

   Returns
   - BA | ZPK | SOS - Filter description in ZPK, BA or SOS format

## butter_bandrej_filtfilt

`function butter_bandrej_filtfilt(data: number[], cutoffs: number[], fs: number, order: number): number[]`

   Construct and filter data using a Butterworth IIRFilter

   Arguments
   - data: number[]
   - cutoffs: number[] - filter corners, low and high frequencies
   - fs: number - sampling frequency
   - order: number - filter order (default: 2)

   Returns
   - number[] - filtered data, real

## arange

`function arange(v0: number, v1: number, dk: number): number[]`

   Generate increasing or decreasing array

   Arguments
   - v0: number - start
   - v1: number - end
   - dk: number - point spacing

   Returns
   - number[] - generated array

## zeros

`function zeros(n: number): number[]`

   Generate an array of zeros

   Arguments
   - n: number - size of array

   Returns
   - number[] - array of zeros

## ones

`function ones(n: number): number[]`

   Generate an array of ones

   Arguments
   - n: number - size of array

   Returns
   - number[] - array of ones

## argmin

`function argmin(v: number[]): number`

   Find index of minimum value in an array

   Arguments
   - v: number[] - array of values

   Returns
   - number - index of minimum value

## linspace

`function linspace(start: number, stop: number, n: number, options: any): number[]`

   Generate a linear sequence, array

   Arguments
   - start: number - initial value
   - stop: number - ending value
   - n: number - number of values
   - options: any - generation options
- endpoint - include stop value (default: true)

   Returns
   - number[] - generated sequence

## asArray

`function asArray(x: number | number[] | Complex | Complex[]): (number | Complex)[]`

   Make sure a value is an array

   Arguments
   - x: number | number[] | Complex | Complex[] - input value

   Returns
   - (number | Complex)[] - output array

## sum

`function sum(values: number[]): number`

   Calculate the sum of an array

   Arguments
   - values: number[] - input array

   Returns
   - number - summation of the input array

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

   Take exponential of complex number

   Returns
   - Complex - exp(this)


### neg

`function neg(): Complex`

   Take negative of complex number

   Returns
   - Complex - -1 * this


### mul

`function mul(z: Complex): Complex`

   Multiply two complex numbers

   Arguments
   - z: Complex

   Returns
   - Complex - a * b


### cmp

`function cmp(z: Complex): boolean`

   Compare two complex number within an absolute tolerance

   Arguments
   - z: Complex

   Returns
   - boolean - true if ||this-z|| < 1e-13


### sqrt

`function sqrt(): Complex`

   Take square root of a complex number

   Returns
   - Complex - this^(1/2)


### div

`function div(z: Complex): Complex`

   Divide two complex numbers

   Arguments
   - z: Complex - complex denominator

   Returns
   - Complex - this / z


### add

`function add(z: Complex): Complex`

   Add two complex numbers

   Arguments
   - z: Complex - complex number to add

   Returns
   - Complex - this + z


### sub

`function sub(z: Complex): Complex`

   Subtract two complex numbers

   Arguments
   - z: Complex - complex number to subtract

   Returns
   - Complex - this - z


### str

`function str(): string`

   Convert to a string

   Returns
   - string - "(re, im)"


### abs

`function abs(): number`

   Take absolute value of a complex number

   Returns
   - number - ||this||


### conj

`function conj(): Complex`

   Take conjugate of a complex number

   Returns
   - Complex - (re, -im)


### is_real

`function is_real(): boolean`

   Check is complex is real

   Returns
   - boolean - true if im == 0


### is_zero

`function is_zero(): boolean`

   Check if complex is zero

   Returns
   - boolean - true if real and imag == 0



## zprod

`function zprod(v: Complex[]): Complex`

   Multiply an array of Complex numbers

   Arguments
   - v: Complex[] - array of complex number to multiply

   Returns
   - Complex

## zpolyval_from_roots

`function zpolyval_from_roots(x: Complex, r: Complex[]): Complex`

   Compute value of complex polynomial defined by roots at a value

   Arguments
   - x: Complex - value to evaluate at
   - r: Complex[] - roots of the polynomial

   Returns
   - Complex - (x - r[0]) * (x - r[1]) * (x - r[2]) ... (x - r[n-1])

## polymul

`function polymul(a: Complex[], b: Complex[]): Complex[]`

   Multiply two complex polynomials

   Arguments
   - a: Complex[] - * b polynomial
   - b: Complex[] - complex polynomial

   Returns
   - Complex[]

## poly

`function poly(roots: Complex[]): Complex[]`

   Find complex polynomial coefficients from a set of roots

   Arguments
   - roots: Complex[] - polynomial roots

   Returns
   - Complex[] - polynomial coefficients

## isComplex

`function isComplex(v: any): boolean`

   Check if value is complex

   Arguments
   - v: any - value

   Returns
   - boolean - true if value is Complex (instanceof)

## isReal

`function isReal(v: any): boolean`

   Check is value is real

   Arguments
   - v: any - value

   Returns
   - boolean - true if value is either an integer or number

## asComplex

`function asComplex(v: any): Complex`

   Convert a value to Complex
 This is throw an exception on a non-numeric value

   Arguments
   - v: any - value

   Returns
   - Complex - Complex value

## cplxreal

`function cplxreal(z: Complex[], tol: number): [Complex[], number[]]`

   Split into complex and real parts, combining conjugate pairs.

   Arguments
   - z: Complex[] - Complex array to be sorted and split
   - tol: number - tolerance (1e-14)

   Returns
   - [Complex[], number[]] - [ c, r]
- c Complex elements of `z`, with each pair represented by a single value
having positive imaginary part, sorted first by real part, and then
by magnitude of imaginary part. The pairs are averaged when combined
to reduce error.
- r Real elements of `z` (those having imaginary part less than
`tol` times their magnitude), sorted by value.

Documentation taken from
https://github.com/scipy/scipy/blob/v1.17.0/scipy/signal/_filter_design.py#L983

## lp2lp_zpk

`function lp2lp_zpk(z: Complex[], p: Complex[], k: number, wo: number): ZPK`

   Convert a lowpass prototype to a lowpass with a different frequency

   Arguments
   - z: Complex[] - Complex zeros
   - p: Complex[] - Complex poles
   - k: number - Constant
   - wo: number - Angular Frequency of the low pass cutoff (rad/s)

   Returns
   - ZPK - ZPK
- z Complex zeros
- p Complex poles
- k Constant

## lp2hp_zpk

`function lp2hp_zpk(z: Complex[], p: Complex[], k: number, wo: number): ZPK`

   Convert a lowpass prototype to a highpass with a different frequency

   Arguments
   - z: Complex[] - Complex zeros
   - p: Complex[] - Complex poles
   - k: number - Constant
   - wo: number - Angular Frequency of the high pass cutoff (rad/s)

   Returns
   - ZPK - ZPK
- z Complex zeros
- p Complex poles
- k Constant

## lp2bp_zpk

`function lp2bp_zpk(z: Complex[], p: Complex[], k: number, wo: number, bw: number): ZPK`

   Convert a lowpass prototype to a bandpass with a different frequencies

   Arguments
   - z: Complex[] - Complex zeros
   - p: Complex[] - Complex poles
   - k: number - Constant
   - wo: number - Angular Frequency of the band pass cutoff (rad/s)
   - bw: number - Angular Bandwidth of the band pass cutoff (rad/s)

   Returns
   - ZPK - ZPK
- z Complex zeros
- p Complex poles
- k Constant

## lp2bs_zpk

`function lp2bs_zpk(z: Complex[], p: Complex[], k: number, wo: number, bw: number): ZPK`

   Convert a lowpass prototype to a bandstop with a different frequencies

   Arguments
   - z: Complex[] - Complex zeros
   - p: Complex[] - Complex poles
   - k: number - Constant
   - wo: number - Angular Frequency of the band stop cutoff (rad/s)
   - bw: number - Angular Bandwidth of the band stop cutoff (rad/s)

   Returns
   - ZPK - ZPK
- z Complex zeros
- p Complex poles
- k Constant

## bilinear_zpk

`function bilinear_zpk(z: Complex[], p: Complex[], k: number, fs: number): ZPK`

   Convert an analog filter to a digital filter using the bilinear transform

   Arguments
   - z: Complex[] - Complex zeros
   - p: Complex[] - Complex poles
   - k: number - Constant
   - fs: number

   Returns
   - ZPK - ZPK
- z Complex zeros
- p Complex poles
- k Constant

## zpk2tf

`function zpk2tf(z: Complex[], p: Complex[], k: number): BA`

   Concert a ZPK filter representation to a BA filter representation

   Arguments
   - z: Complex[] - Complex zeros
   - p: Complex[] - Complex poles
   - k: number - Constant

   Returns
   - BA - BA
- b Polynomial coefficients numerator
- a Polynomial coefficients denominator

## zpk2sos

`function zpk2sos(z: Complex[], p: Complex[], k: number): SOS`

   Concert a ZPK filter representation to a SOS filter representation

   Arguments
   - z: Complex[] - Complex zeros
   - p: Complex[] - Complex poles
   - k: number - Constant

   Returns
   - SOS - Second order section filter representation

## iirfilter

`function iirfilter(N: number, Wn: number | number[], options: any): ZPK | BA | SOS`

   Construct a IIR filter

   Arguments
   - N: number - fitler order
   - Wn: number | number[] - filter corners, number for lowpass or highpass
 number[] for bandpass or bandstop
   - options: any - filter options
- btype: bandpass, bandstop, lowpass, highpass (defualt: bandpass)
- analog: true or false  (default: false)
- ftype: butter. (bessel, chebyshev1, chebyshev2, elliptic are unsupported)
- output: zpk, sos, ba (default: ba)

   Returns
   - ZPK | BA | SOS - Filter description in ZPK, BA or SOS format

## ZPK

Zeros, Poles, Constant Filter

```
export type ZPK = {
    z: Complex[];
    p: Complex[];
    k: number;
}
```

## BA

Polynomial Filter

```
export type BA = {
    b: number[];
    a: number[];
}
```

## SOS

Second order Section
  stored as 3 coefficients of polynomial numerator,
  then 3 coefficient of polynomial denominator
  for 6 terms total

```
export type SOS = number[][];
```

## freqz

`function freqz(b: number[], a: number[], options: any): { w: number[], h: Complex[] }`

   Compute response of a filter in the frequency domain

   Arguments
   - b: number[] - fitler polynomial coefficients, numerator
   - a: number[] - fitler polynomial coefficients, denominator
   - options: any - response options
- worN frequencies or length (default: 512)
- fs sampling frequency (default: 2*pi)
- whole compute frequencies up to fs (default: false)

   Returns
   - { w: number[], h: Complex[] }

## freqz_zpk

`function freqz_zpk(z: Complex[], p: Complex[], k: number, options: any): { w: number[], h: Complex[] }`

   Compute response of a filter in the frequency domain

   Arguments
   - z: Complex[] - fitler complex zeros
   - p: Complex[] - fitler complex poles
   - k: number - filter constant
   - options: any - response options
- worN frequencies or length (default: 512)
- fs sampling frequency (default: 2*pi)
- whole compute frequencies up to fs (default: false)

   Returns
   - { w: number[], h: Complex[] }

## freqz_sos

`function freqz_sos(sos: SOS, options: any): { w: number[], h: Complex[] }`

   Compute response of a filter in the frequency domain

   Arguments
   - sos: SOS - fitler coefficients in a second order section
   - options: any - response options
- worN frequencies or length (default: 512)
- fs sampling frequency (default: 2*pi)
- whole compute frequencies up to fs (default: false)

   Returns
   - { w: number[], h: Complex[] }

## buttap

`function buttap(N: number): ZPK`

   Analog prototype for a butterworth filter

   Arguments
   - N: number - Filter order

   Returns
   - ZPK - analog filter in ZPK format

## butter

`function butter(N: number, Wn: number | number[], options: any): BA | ZPK | SOS`

   Construct a IIR Butterworth filter

   Arguments
   - N: number - fitler order
   - Wn: number | number[] - filter corners, number for lowpass or highpass
 number[] for bandpass or bandstop
   - options: any - filter options
- btype: bandpass, bandstop, lowpass, highpass (defualt: bandpass)
- analog: true or false  (default: false)
- ftype: always butter
- output: zpk, sos, ba (default: ba)

   Returns
   - BA | ZPK | SOS - Filter description in ZPK, BA or SOS format

## butter_bandrej_filtfilt

`function butter_bandrej_filtfilt(data: number[], cutoffs: number[], fs: number, order: number): number[]`

   Construct and filter data using a Butterworth IIRFilter

   Arguments
   - data: number[]
   - cutoffs: number[] - filter corners, low and high frequencies
   - fs: number - sampling frequency
   - order: number - filter order (default: 2)

   Returns
   - number[] - filtered data, real

## lfilter_zi

`function lfilter_zi(b: number[], a: number[]): number[]`

   Determine initial conditions for a filter

   Arguments
   - b: number[] - filter coefficients
   - a: number[] - filter coefficients

   Returns
   - number[] - Filter initial conditions

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


