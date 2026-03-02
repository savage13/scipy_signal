import { iirfilter, filtfilt, zeros } from './scipy_signal.js'

let data_in = zeros(100)
data_in[50] = 1.0

let fs = 10 // Sample frequency (Hz)
let nyq = 0.5 * fs // Nyquist Frequency (Hz)
let corner1 = 1.0 // Low Frequency corner (Hz)
let corner2 = 2.0 // High frequency corner (Hz)

let order = 2 // Filter order

let W = [corner1/nyq, corner2/nyq] // Normailize frequencies

// Create a bandstop filter from 1 - 2 Hz
let {b, a} = iirfilter(order, W, { btype: 'bandstop' })

// Apply the filter to the data
let data_out = filtfilt(b, a, data_in)


