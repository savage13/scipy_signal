scipy.js signal
---------------
Implementation of scipy signal filters in javascript https://scipy.org/

Tries to follow the scipy.signal API


Example
-------

     import { iirfilter, filtfilt, zeros } from './scipy_signal.js'

     let data_in = zeros(100)
     data_in[50] = 1.0

     let fs = 10 // Sample frequency (Hz)
     let nyq = 0.5 * fs // Nyquist Frequency (Hz)
     let corner1 = 1.0 // Low Frequency corner (Hz)
     let corner2 = 2.0 // High frequency corner (Hz)

     let W = [corner1/nyq, corner2/nyq] // Normailize frequencies

     // Create a bandstop filter from 1 - 2 Hz
     let {b, a} = iirfilter(2, W, { btype: 'bandstop' })

     // Apply the filter to the data
     let data_out = filtfilt(b, a, data_in)

Testing
-------
Tests are based on scipy version 1.17.1 (Feb 2026)

Functions
---------

    function filtfilt(b, a, x)
         Apply a filter in two directions, forward and backwards, zero-phase filter
         Arguments:
         - b - polynomial filter constants ( number[] )
         - a - polynomial filter constants ( number[] )
         - x - data to be filtered ( number[] ) (only 1D currently)
         Returns:
         - y - Filtered output ( number[] )
         Calls:
         - lfilter

    function iirfilter(N, Wn, options)
         Create a filter
         Arguments:
         - N - order of the filter ( number )
         - Wn - filter corners ( number[] )
         - options:
            - btype: bandstop, bandpass, lowpass highpass (bandpass)
            - ftype: butter, bessel (butter)
            - analog: if analog filtered desired (false)
            - output: ba, sos, zpk (ba)
         Returns:
         - ba - b and a polynomial filter coefficients
         - zpk - zeros, poles and constant describing the filter
         - sos - Second order section
         Calls:
         - lp2bs_zpk, lp2bp_zpk, lp2lp_zpk, lp2hp_zpk, bilinear_zpk, zpk2tf

    butter(N, Wn, options):
         Create a butterworth filter
         Arguments:
          - N - order of the filter ( number )
          - Wn - filter corners ( [number] )
          - options:
             See iirfilter
             ftype is set to 'butter'
         Returns:
         - See iirfilter
         Calls:
         - See iirfilter

    function buttap(n)
         Creates a n-th order low pass filter
         Arguments:
         - n - Order of the filter ( number )
         Returns:
         - z - Zeros of low pass n-th order filter ( Complex[] )
         - p - Poles of low pass n-th order filter ( Complex[] )
         - k - Constant of low pass n-th order filter ( number )

    function lp2bp_zpk(z, p, k, wo, bw)
         Converts a low pass filter to a band pass filter
         Arguments:
         - z - Zeros of the low pass filter ( Complex[] )
         - p - Poles of the low pass filter ( Complex[] )
         - k - Constant of the low pass filter ( number )
         - wo - Normalized central frequency of the band pass ( number ) [ 0-1 ]
         - bw - Normalized bandwidth of the band pass ( number ) [ 0-1 ]
         Returns:
         - z - Zeros of the band pass n-th order filter ( Complex[] )
         - p - Poles of the band pass n-th order filter ( Complex[] )
         - k - Constant of the band stop n-th order filter ( number )

    function lp2bs_zpk(z, p, k, wo, bw)
         Converts a low pass filter to a band stop filter
         Arguments:
         - z - Zeros of the low pass filter ( Complex[] )
         - p - Poles of the low pass filter ( Complex[] )
         - k - Constant of the low pass filter ( number )
         - wo - Normalized central frequency of the band stop ( number ) [ 0-1 ]
         - bw - Normalized bandwidth of the band stop ( number ) [ 0-1 ]
         Returns:
         - z - Zeros of the band stop n-th order filter ( Complex[] )
         - p - Poles of the band stop n-th order filter ( Complex[] )
         - k - Constant of the band stop n-th order filter ( number )

    function lp2lp_zpk(z, p, k, wo)
         Converts a low pass filter to a low pass filter
         Arguments:
         - z - Zeros of the low pass filter ( Complex[] )
         - p - Poles of the low pass filter ( Complex[] )
         - k - Constant of the low pass filter ( number )
         - wo - Normalized frequency of the low pass filter ( number ) [ 0-1 ]
         Returns:
         - z - Zeros of the low pass n-th order filter ( Complex[] )
         - p - Poles of the low pass n-th order filter ( Complex[] )
         - k - Constant of the low pass n-th order filter ( number )

    function lp2hp_zpk(z, p, k, wo, bw)
         Converts a low pass filter to a high pass filter
         Arguments:
         - z - Zeros of the low pass filter ( Complex[] )
         - p - Poles of the low pass filter ( Complex[] )
         - k - Constant of the low pass filter ( number )
         - wo - Normalized frequency of the high pass filter ( number ) [ 0-1 ]
         Returns:
         - z - Zeros of the high pass n-th order filter ( Complex[] )
         - p - Poles of the high pass n-th order filter ( Complex[] )
         - k - Constant of the high pass n-th order filter ( number )

    function blinear_zpk(z, p, k, fs)
         Arguments:
         - z - Zeros of the filter ( Complex[] )
         - p - Poles of the filter  ( Complex[] )
         - k - Constant of the filter ( number )
         Returns:
         - z - Zeros of the filter ( Complex[] )
         - p - Poles of the filter ( Complex[] )
         - k - Constant of the filter ( number )

    function lfilter(b, a, x, axis, zi)
         Apply a filter in one direction
         Arguments:
         - b - polynomial filter constants ( number[] )
         - a - polynomial filter constants ( number[] )
         - x - data to be filtered ( number[] ) (only 1D currently)
         - axis (always -1) only 1D filter is available
         - zi - filter initial conditions
         Returns:
         - y - Filtered output ( number[] )
         - zf - Filter final coefficients ( number[] )

    function zpk2tf(z, p, k):
         Convert a (Zeros, Poles, Constant) filter to its polynomial representation
         Arguments:
         - z - Zeros of the filter ( Complex[] )
         - p - Poles of the filter  ( Complex[] )
         - k - Constant of the filter ( number )
         Returns:
         - b - polynomial filter constants ( number[] )
         - a - polynomial filter constants ( number[] )

    function lfilter_zi(b, a):
         Compute initial conditions for a filter
         Arguments:
         - b - polynomial filter constants ( number[] )
         - a - polynomial filter constants ( number[] )
         Returns:
         - Initial conditions for a filter ( number[] )


License
-------
BSD-new license

Follows the same license as scipy https://scipy.org/
