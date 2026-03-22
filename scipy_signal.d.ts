declare module "complex" {
    /**
     * Complex number
     */
    export class Complex {
        re: number;
        im: number;
        /**
         * @constructor
         * @param re - Real part
         * @param im - Imaginary part
         *
         * @return - Complex number (re, im)
         */
        constructor(re: number, im: number);
        /**
         * Copy a complex number
         *
         * @return {Complex} - Copy of Complex number (re, im)
         */
        copy(): Complex;
        /**
         * Take exponential of complex number
         * @return exp(this)
         */
        exp(): Complex;
        /**
         * Take negative of complex number
         * @return -1 * this
         */
        neg(): Complex;
        /**
         * Multiply two complex numbers
         * @return a * b
         */
        mul(z: Complex): Complex;
        /**
         * Compare two complex number within an absolute tolerance
         * @param z
         * @return true if ||this-z|| < 1e-13
         */
        cmp(z: Complex): boolean;
        /**
         * Take square root of a complex number
         * @return this^(1/2)
         */
        sqrt(): Complex;
        /**
         * Divide two complex numbers
         * @param z complex denominator
         * @return this / z
         */
        div(z: Complex): Complex;
        /**
         * Add two complex numbers
         * @param z complex number to add
         * @return this + z
         */
        add(z: Complex): Complex;
        /**
         * Subtract two complex numbers
         * @param z complex number to subtract
         * @return this - z
         */
        sub(z: Complex): Complex;
        /**
         * Convert to a string
         * @return "(re, im)"
         */
        str(): string;
        /**
         * Take absolute value of a complex number
         * @return ||this||
         */
        abs(): number;
        /**
         * Take conjugate of a complex number
         * @return (re, -im)
         */
        conj(): Complex;
        /**
         * Check is complex is real
         * @return true if im == 0
         */
        is_real(): boolean;
        /**
         * Check if complex is zero
         * @return true if real and imag == 0
         */
        is_zero(): boolean;
    }
    /**
     * Multiply an array of Complex numbers
     * @param v array of complex number to multiply
     * @returns v[0] * v[1] * .... v[n-1]
     */
    export function zprod(v: Complex[]): Complex;
    /**
     * Compute value of complex polynomial defined by roots at a value
     * @param x value to evaluate at
     * @param r roots of the polynomial
     * @return (x - r[0]) * (x - r[1]) * (x - r[2]) ... (x - r[n-1])
     */
    export function zpolyval_from_roots(x: Complex, r: Complex[]): Complex;
    /**
     * Multiply two complex polynomials
     * @param a complex polynomial
     * @param b complex polynomial
     * @param a * b polynomial
     */
    export function polymul(a: Complex[], b: Complex[]): Complex[];
    /**
     * Find complex polynomial coefficients from a set of roots
     * @param roots polynomial roots
     * @return polynomial coefficients
     */
    export function poly(roots: Complex[]): Complex[];
    /**
     * Check if value is complex
     * @param v value
     * @return true if value is Complex (instanceof)
     */
    export function isComplex(v: any): boolean;
    /**
     * Check is value is real
     * @param v value
     * @return true if value is either an integer or number
     */
    export function isReal(v: any): boolean;
    /**
     * Convert a value to Complex
     *  This is throw an exception on a non-numeric value
     *
     * @param v value
     * @return Complex value
     */
    export function asComplex(v: any): Complex;
    /**
     * Split into complex and real parts, combining conjugate pairs.
     * @param z Complex array to be sorted and split
     * @param tol tolerance (1e-14)
     * @return [ c, r]
     *     - c Complex elements of `z`, with each pair represented by a single value
     *        having positive imaginary part, sorted first by real part, and then
     *       by magnitude of imaginary part. The pairs are averaged when combined
     *       to reduce error.
     *     - r Real elements of `z` (those having imaginary part less than
     *      `tol` times their magnitude), sorted by value.
     *
     * Documentation taken from
     *  https://github.com/scipy/scipy/blob/v1.17.0/scipy/signal/_filter_design.py#L983
     */
    export function cplxreal(z: Complex[], tol?: number): [Complex[], number[]];
}
declare module "numpy" {
    import { Complex } from "complex";
    /**
     * Generate increasing or decreasing array
     * @param v0 start
     * @param v1 end
     * @param dk point spacing
     * @return generated array
     */
    export function arange(v0: number, v1: number, dk: number): number[];
    /**
     * Generate an array of zeros
     * @param n size of array
     * @return array of zeros
     */
    export function zeros(n: number): number[];
    /**
     * Generate an array of ones
     * @param n size of array
     * @return array of ones
     */
    export function ones(n: number): number[];
    /**
     * Find index of minimum value in an array
     * @param v array of values
     * @return index of minimum value
     */
    export function argmin(v: number[]): number;
    /**
     * Generate a linear sequence, array
     * @param start initial value
     * @param stop ending value
     * @param n number of values
     * @param options generation options
     *     - endpoint - include stop value (default: true)
     * @return generated sequence
     */
    export function linspace(start: number, stop: number, n: number, options?: any): number[];
    /**
     * Make sure a value is an array
     * @param x input value
     * @return output array
     */
    export function asArray(x: number | number[] | Complex | Complex[]): (number | Complex)[];
    /**
     * Calculate the sum of an array
     * @param values input array
     * @return summation of the input array
     */
    export function sum(values: number[]): number;
}
declare module "zpk" {
    import { Complex } from "complex";
    import { BA, SOS, ZPK } from "scipy";
    /**
     * Convert a lowpass prototype to a lowpass with a different frequency
     * @param z Complex zeros
     * @param p Complex poles
     * @param k Constant
     * @param wo Angular Frequency of the low pass cutoff (rad/s)
     * @return ZPK
     *     - z Complex zeros
     *     - p Complex poles
     *     - k Constant
     */
    export function lp2lp_zpk(z: Complex[], p: Complex[], k: number, wo: number): ZPK;
    /**
     * Convert a lowpass prototype to a highpass with a different frequency
     * @param z Complex zeros
     * @param p Complex poles
     * @param k Constant
     * @param wo Angular Frequency of the high pass cutoff (rad/s)
     * @return ZPK
     *     - z Complex zeros
     *     - p Complex poles
     *     - k Constant
     */
    export function lp2hp_zpk(z: Complex[], p: Complex[], k: number, wo: number): ZPK;
    /**
     * Convert a lowpass prototype to a bandpass with a different frequencies
     * @param z Complex zeros
     * @param p Complex poles
     * @param k Constant
     * @param wo Angular Frequency of the band pass cutoff (rad/s)
     * @param bw Angular Bandwidth of the band pass cutoff (rad/s)
     * @return ZPK
     *     - z Complex zeros
     *     - p Complex poles
     *     - k Constant
     */
    export function lp2bp_zpk(z: Complex[], p: Complex[], k: number, wo: number, bw: number): ZPK;
    /**
     * Convert a lowpass prototype to a bandstop with a different frequencies
     * @param z Complex zeros
     * @param p Complex poles
     * @param k Constant
     * @param wo Angular Frequency of the band stop cutoff (rad/s)
     * @param bw Angular Bandwidth of the band stop cutoff (rad/s)
     * @return ZPK
     *     - z Complex zeros
     *     - p Complex poles
     *     - k Constant
     */
    export function lp2bs_zpk(z: Complex[], p: Complex[], k: number, wo: number, bw: number): ZPK;
    /**
     * Convert an analog filter to a digital filter using the bilinear transform
     * @param z Complex zeros
     * @param p Complex poles
     * @param k Constant
     * @return ZPK
     *     - z Complex zeros
     *     - p Complex poles
     *     - k Constant
     */
    export function bilinear_zpk(z: Complex[], p: Complex[], k: number, fs: number): ZPK;
    /**
     * Concert a ZPK filter representation to a BA filter representation
     * @param z Complex zeros
     * @param p Complex poles
     * @param k Constant
     * @return BA
     *      - b Polynomial coefficients numerator
     *      - a Polynomial coefficients denominator
     */
    export function zpk2tf(z: Complex[], p: Complex[], k: number): BA;
    /**
     * Concert a ZPK filter representation to a SOS filter representation
     * @param z Complex zeros
     * @param p Complex poles
     * @param k Constant
     * @return Second order section filter representation
     */
    export function zpk2sos(z: Complex[], p: Complex[], k: number): SOS;
}
declare module "filter" {
    import { SOS } from "scipy";
    /**
     * Determine initial conditions for a filter
     *
     * @param b filter coefficients
     * @param a filter coefficients
     *
     * @return Filter initial conditions
     */
    export function lfilter_zi(b: number[], a: number[]): number[];
    /**
     * Apply a filter coefficients to an array
     *    Filter is applied in one pass
     *
     * @param b Filter components (numerator)
     * @param a Filter components (denomator)
     * @param x Input array
     * @param axis Input array axis, unused
     * @param zi Filter initial conditions
     *
     * @return Filtered array
     */
    export function lfilter(b: number[], a: number[], x: number[], axis: number, zi: number[]): {
        y: number[];
        zf: number[];
    };
    /**
     * Apply a filter coefficients to an array
     *    Filter is applied in two passes, forward and backwards
     *
     * @param b Filter components (numerator)
     * @param a Filter components (denomator)
     * @param x Input array
     *
     * @return Filtered array
     */
    export function filtfilt(b: number[], a: number[], x: number[]): number[];
    /**
     * Determine initial conditions for a Second order section filter
     *
     * @param sos Second order section filter coefficients
     *
     * @return Second order section initial conditions
     */
    export function sosfilt_zi(sos: SOS): number[][];
    /**
     * Apply Second order section (SOS) filter coefficients to an array
     *    Filter is applied in one pass
     *
     * @param sos Second order section filter coefficients
     * @param x Array to be filtered
     * @param zi Initial conditions for the filter
     *
     * @return Filtered version of x
     */
    export function sosfilt(sos: SOS, x: number[], zi: number[][]): number[];
    /**
     * Apply Second order section (SOS) filter coefficients to an array
     *    Filter is applied in two passes, forward and backwards
     *
     * @param sos Second order section filter coefficients
     * @param x Array to be filtered
     *
     * @return Filtered version of x
     */
    export function sosfiltfilt(sos: SOS, x: number[]): number[];
}
declare module "poly" {
    import { Complex } from "complex";
    /**
     * Compute value of complex polynomial at value x
     *    Takes either a number or complex values
     *
     * @param p Polynomial coefficients from high to low
     * @param x Value to evaluate polynomial at
     *
     * @return Polynomial p evaluated at x
     */
    export function polyval(p: number[] | Complex[], x: number | Complex): number | Complex;
    /**
     * Compute value of complex polynomial at value x
     * @param p Polynomial coefficients from high to low
     * @param x Value to evaluate polynomial at
     *
     * @return Polynomial p evaluated at x
     */
    export function zpolyval(p: Complex[], x: Complex): Complex;
}
declare module "scipy" {
    import { Complex } from "complex";
    export { Complex, zpolyval_from_roots, polymul, cplxreal, poly, asComplex } from "complex";
    export { zeros, ones, linspace, arange } from "numpy";
    export { lp2lp_zpk, lp2hp_zpk, lp2bp_zpk, lp2bs_zpk, zpk2tf, zpk2sos, bilinear_zpk } from "zpk";
    export { filtfilt, sosfilt, sosfiltfilt } from "filter";
    export { polyval } from "poly";
    /**
     * Construct a IIR filter
     *
     * @param N fitler order
     * @param Wn filter corners, number for lowpass or highpass
     *            number[] for bandpass or bandstop
     * @param options filter options
     *          - btype: bandpass, bandstop, lowpass, highpass (defualt: bandpass)
     *          - analog: true or false  (default: false)
     *          - ftype: butter. (bessel, chebyshev1, chebyshev2, elliptic are unsupported)
     *          - output: zpk, sos, ba (default: ba)
     * @return Filter description in ZPK, BA or SOS format
     */
    export function iirfilter(N: number, Wn: number | number[], options: any): ZPK | BA | SOS;
    /**
     * Zeros, Poles, Constant Filter
     *
     * @param z Complex zeros
     * @param p Complex poles
     * @param k Real constant
     *
     */
    export type ZPK = {
        z: Complex[];
        p: Complex[];
        k: number;
    };
    /**
     * Polynomial Filter
     * @param b polynomial coefficients numerator
     * @param a polynomial coefficients numerator
     */
    export type BA = {
        b: number[];
        a: number[];
    };
    /**
     * Second order Section
     *   stored as 3 coefficients of polynomial numerator,
     *   then 3 coefficient of polynomial denominator
     *   for 6 terms total
     *
     */
    export type SOS = number[][];
    /**
     * Compute response of a filter in the frequency domain
     *
     * @param b fitler polynomial coefficients, numerator
     * @param a fitler polynomial coefficients, denominator
     * @param options response options
     *      - worN frequencies or length (default: 512)
     *      - fs sampling frequency (default: 2*pi)
     *      - whole compute frequencies up to fs (default: false)
     * @returns frequencies and response
     *      - w frequencies, real (from 0 to fs)
     *      - h response, complex
     */
    export function freqz(b: number[], a: number[], options?: any): {
        w: number[];
        h: Complex[];
    };
    /**
     * Compute response of a filter in the frequency domain
     *
     * @param z fitler complex zeros
     * @param p fitler complex poles
     * @param k filter constant
     * @param options response options
     *      - worN frequencies or length (default: 512)
     *      - fs sampling frequency (default: 2*pi)
     *      - whole compute frequencies up to fs (default: false)
     * @returns frequencies and response
     *      - w frequencies, real (from 0 to fs)
     *      - h response, complex
     */
    export function freqz_zpk(z: Complex[], p: Complex[], k: number, options?: any): {
        w: number[];
        h: Complex[];
    };
    /**
     * Compute response of a filter in the frequency domain
     *
     * @param sos fitler coefficients in a second order section
     * @param options response options
     *      - worN frequencies or length (default: 512)
     *      - fs sampling frequency (default: 2*pi)
     *      - whole compute frequencies up to fs (default: false)
     * @returns frequencies and response
     *      - w frequencies, real (from 0 to fs)
     *      - h response, complex
     */
    export function freqz_sos(sos: SOS, options?: any): {
        w: number[];
        h: Complex[];
    };
    /**
     * Analog prototype for a butterworth filter
     * @param N Filter order
     * @return analog filter in ZPK format
     */
    export function buttap(N: number): ZPK;
    /**
     * Construct a IIR Butterworth filter
     *
     * @param N fitler order
     * @param Wn filter corners, number for lowpass or highpass
     *            number[] for bandpass or bandstop
     * @param options filter options
     *          - btype: bandpass, bandstop, lowpass, highpass (defualt: bandpass)
     *          - analog: true or false  (default: false)
     *          - ftype: always butter
     *          - output: zpk, sos, ba (default: ba)
     * @return Filter description in ZPK, BA or SOS format
     */
    export function butter(N: number, Wn: number | number[], options?: any): BA | ZPK | SOS;
    /**
     * Construct and filter data using a Butterworth IIRFilter
     *
     * @param input data
     * @param cutoffs filter corners, low and high frequencies
     * @param fs sampling frequency
     * @param order filter order (default: 2)
     * @return filtered data, real
     */
    export function butter_bandrej_filtfilt(data: number[], cutoffs: number[], fs: number, order?: number): number[];
}
