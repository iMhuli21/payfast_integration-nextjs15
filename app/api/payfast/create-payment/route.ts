import { NextResponse, type NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { orderId, amount, item_name } = await req.json();

  const formatAmount = parseFloat(amount).toFixed(2);

  const formFields = {
    merchant_id: process.env.PAYFAST_MERCHANT_ID!,
    merchant_key: process.env.PAYFAST_MERCHANT_KEY!,
    return_url: 'https://bc7b-41-145-208-156.ngrok-free.app/payfast/success',
    cancel_url: 'https://bc7b-41-145-208-156.ngrok-free.app/payfast/cancel',
    notify_url: 'https://bc7b-41-145-208-156.ngrok-free.app/payfast/success',
    amount: formatAmount,
    item_name,
    m_payment_id: orderId.toString(),
  };

  const formHtml = `<form id="payfast-form" action="https://www.payfast.co.za/eng/process" method="post">
            ${Object.entries(formFields)
              .map(
                ([key, value]) =>
                  `<input type="hidden" name="${key}" value="${value}" />`
              )
              .join('\n')}

    </form>
    <script>document.getElementById("payfast-form").submit();</script>
     `;

  return new NextResponse(formHtml, {
    headers: { 'Content-Type': 'text/html' },
  });
}
