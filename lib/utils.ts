import crypto from 'crypto';

export function generatePayfastSignature(
  data: Record<string, string | number>
) {
  // Step 1: Sort keys alphabetically
  const sorted = Object.keys(data)
    .sort()
    .map((key) => `${key}=${encodeURIComponent(String(data[key]))}`)
    .join('&');

  // Step 2: Append your passphrase (if used)
  const passphrase = process.env.PAYFAST_PASSPHRASE;
  const finalString = passphrase
    ? `${sorted}&passphrase=${encodeURIComponent(passphrase)}`
    : sorted;

  // Step 3: MD5 hash
  return crypto.createHash('md5').update(finalString).digest('hex');
}
