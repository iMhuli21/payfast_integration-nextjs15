import { NextResponse } from 'next/server';
import { generatePayfastSignature } from '@/lib/utils';

// PayFast returns x-www-form-urlencoded, not JSON!
export async function POST(req: Request) {
  const rawBody = await req.text();
  const data = Object.fromEntries(new URLSearchParams(rawBody));

  const receivedSignature = data.signature;
  delete data.signature;

  const calculatedSignature = generatePayfastSignature(data);

  if (receivedSignature === calculatedSignature) {
    // ✅ Signature is valid. You can now process the payment.
    console.log('✅ PayFast Signature Verified');
    console.log(data); // Contains order_id, amount_gross, payment_status, etc.

    // 👉 TODO: Update order in your DB as "paid"

    return NextResponse.json({ message: 'Payment verified' }, { status: 200 });
  } else {
    console.error('❌ PayFast Signature Mismatch!');
    return NextResponse.json({ message: 'Invalid signature' }, { status: 400 });
  }
}
