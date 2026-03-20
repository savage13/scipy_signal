declare module "complex" {
    export class Complex {
        re: number;
        im: number;
        constructor(re: number, im: number);
        copy(): Complex;
        exp(): Complex;
        neg(): Complex;
        mul(z: Complex): Complex;
        is_zero(): boolean;
        cmp(z: Complex): boolean;
        sqrt(): Complex;
        div(z: Complex): Complex;
        add(z: Complex): Complex;
        sub(z: Complex): Complex;
        str(): string;
        abs(): number;
        conj(): Complex;
        is_real(): boolean;
    }
    export function zprod(v: Complex[]): Complex;
    export function zpolyval_from_roots(x: Complex, r: Complex[]): Complex;
    export function trimseq(a: Complex[]): Complex[];
    export function polymul(a: Complex[], b: Complex[]): any[];
    export function poly(roots: Complex[]): Complex[];
    export function isComplex(v: any): boolean;
    export function isReal(v: any): boolean;
    export function asComplex(v: any): Complex;
    export function cplxreal(z: Complex[], tol?: number): any[][];
}
declare module "numpy" {
    import { Complex } from "complex";
    export function arange(v0: number, v1: number, dk: number): number[];
    export function zeros(n: number): number[];
    export function ones(n: number): number[];
    export function argmin(v: number[]): number;
    export function linspace(start: number, stop: number, n: number, options?: any): number[];
    export function asArray(x: number | number[] | Complex | Complex[]): (number | Complex)[];
    export function sum(values: number[]): number;
}
declare module "zpk" {
    import { Complex } from "complex";
    import { BA, SOS, ZPK } from "scipy";
    export function lp2lp_zpk(z: Complex[], p: Complex[], k: number, wo: number): ZPK;
    export function lp2hp_zpk(z: Complex[], p: Complex[], k: number, wo: number): ZPK;
    export function lp2bp_zpk(z: Complex[], p: Complex[], k: number, wo: number, bw: number): ZPK;
    export function lp2bs_zpk(z: Complex[], p: Complex[], k: number, wo: number, bw: number): ZPK;
    export function bilinear_zpk(z: Complex[], p: Complex[], k: number, fs: number): ZPK;
    export function zpk2tf(z: Complex[], p: Complex[], k: number): BA;
    export function zpk2sos(z: Complex[], p: Complex[], k: number): SOS;
}
declare module "filter" {
    import { SOS } from "scipy";
    export function lfilter_zi(b: number[], a: number[]): number[];
    export function lfilter(b: number[], a: number[], x: number[], axis: number, zi: number[]): {
        y: number[];
        zf: number[];
    };
    export function filtfilt(b: number[], a: number[], x: number[]): number[];
    export function sosfilt_zi(sos: SOS): number[][];
    export function sosfilt(sos: SOS, x: number[], zi: number[][]): number[];
    export function sosfiltfilt(sos: SOS, x: number[]): number[];
}
declare module "poly" {
    import { Complex } from "complex";
    export function polyval(p: number[] | Complex[], x: number | Complex): number | Complex;
    export function zpolyval(p: Complex[], x: Complex): Complex;
}
declare module "scipy" {
    import { Complex } from "complex";
    export { Complex, zpolyval_from_roots, polymul, cplxreal, poly, asComplex } from "complex";
    export { zeros, ones, linspace, arange } from "numpy";
    export { lp2lp_zpk, lp2hp_zpk, lp2bp_zpk, lp2bs_zpk, zpk2tf, zpk2sos, bilinear_zpk } from "zpk";
    export { filtfilt, sosfilt, sosfiltfilt } from "filter";
    export { polyval } from "poly";
    export type ZPK = {
        z: Complex[];
        p: Complex[];
        k: number;
    };
    export type BA = {
        b: number[];
        a: number[];
    };
    export type SOS = number[][];
    export function buttap(N: number): ZPK;
    export function freqz_zpk(z: Complex[], p: Complex[], k: number, options?: any): {
        w: number[];
        h: Complex[];
    };
    export function freqz(b: number[], a: number[], options?: any): {
        w: number[];
        h: Complex[];
    };
    export function freqz_sos(sos: SOS, options?: any): {
        w: number[];
        h: Complex[];
    };
    export function iirfilter(N: number, Wn: number | number[], options: any): ZPK | BA | SOS;
    export function butter(N: number, Wn: number | number[], options?: any): BA | ZPK | SOS;
    export function butter_bandrej_filtfilt(data: number[], cutoffs: number[], fs: number, order?: number): number[];
}
