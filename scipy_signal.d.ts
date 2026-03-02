
// comples.ts
export declare class Complex {
    re: number;
    im: number;
    constructor(re: number, im: number);
    copy(): Complex;
    exp(): Complex;
    neg(): Complex;
    mul(z: Complex): Complex;
    cmp(z: Complex): boolean;
    sqrt(): Complex;
    div(z: Complex): Complex;
    add(z: Complex): Complex;
    sub(z: Complex): Complex;
    str(): string;
}
export declare function zprod(v: any): Complex;
export declare function zpolyval_from_roots(x: Complex, r: Complex[]): Complex;
export declare function trimseq(a: Complex[]): Complex[];
export declare function polymul(a: any, b: any): any[];
export declare function poly(roots: any): Complex[];

// numpy.ts
export declare function arange(v0: number, v1: number, dk: number): number[];
export declare function zeros(n: number): number[];
export declare function ones(n: number): number[];
export declare function linspace(start: number, stop: number, n: number, options: any = {}): number[];
export declare function asArray(x: number | number[] | Complex | Complex[]): (number | Complex)[];
export declare function sum(values: number[]): number;

// scipy.ts
type ZPK = {
    z: Complex[];
    p: Complex[];
    k: number;
};
type BA = {
    b: number[];
    a: number[];
};

export declare function buttap(N: number): ZPK;
export declare function lp2lp_zpk(z: Complex[], p: Complex[], k: number, wo: number): ZPK;
export declare function lp2hp_zpk(z: Complex[], p: Complex[], k: number, wo: number): ZPK;
export declare function lp2bs_zpk(z: Complex[], p: Complex[], k: number, wo: number, bw: number): ZPK;
export declare function lp2bp_zpk(z: Complex[], p: Complex[], k: number, wo: number, bw: number): ZPK;
export declare function bilinear_zpk(z: Complex[], p: Complex[], k: number, fs: number): ZPK;
export declare function zpk2tf(z: Complex[], p: Complex[], k: number): BA;
export declare function lfilter_zi(b: number[], a: number[]): number[];
export declare function lfilter(b: number[], a: number[], x: number[], axis: number, zi: number[]): {
    y: number[];
    zf: number[];
};
export declare function filtfilt(b: number[], a: number[], x: number[]): number[];
export declare function freqz_zpk(z: Complex[], p: Complex[], k: number, options: any = {}): { w: number[], h: Complex[] };
export declare function iirfilter(N: number, Wn: number | number[], options: any): ZPK | BA;
export declare function butter(N: number, Wn: number | number[], options?: any): BA | ZPK;
export declare function butter_bandrej_filtfilt(data: number[], cutoffs: number[], fs: number, order?: number): number[];
