import { getServerArgument } from './get-server-argument';

/**
 * Get the serial port configuration from the **server arguments** or **environment variables**.
 *
 * If the serial port is not defined, an *error* will be thrown. If the baud rate is not defined, a warning will be shown and the default rate `9600` will be used.
 *
 * > Serial port can be defined using the `--serial` flag or the `SERIAL_PORT` environment variable.
 *
 * > Baud rate can be defined using the `--rate` flag or the `BAUD_RATE` environment variable.
 * @throws {Error} If the serial port is not defined
 * @returns {string} The serial port to be used
 */

export default function getSerialPortConfig(): { path: string; baudRate: number } {
  const serialPort = getServerArgument('--serial') ?? process.env.SERIAL_PORT;
  const baudRate = getServerArgument('--rate') ?? process.env.BAUD_RATE;
  if (!serialPort || !serialPort[0]) {
    throw new Error(
      'Serial port not defined. Please provide a serial port using the --serial flag or the SERIAL_PORT environment variable.'
    );
  }
  if (!baudRate || !baudRate[0]) {
    console.warn('Baud rate not defined, using default rate: 9600');
  }
  return { path: serialPort, baudRate: Number(baudRate ?? 9600) };
}
