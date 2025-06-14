'use client';

export default function Home() {
  const handlePayment = async () => {
    const res = await fetch(`/api/payfast/create-payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: (299.99).toFixed(2),
        item_name: 'Pure desert oud',
        orderId: 123,
      }),
    });

    const html = await res.text();

    const win = window.open('', '_self');

    if (win) win.document.writeln(html);
  };
  return (
    <main className='flex items-center justify-center min-h-dvh'>
      <button
        className='px-3 py-1.5 bg-black text-white tracking-tight font-medium h-9 rounded-md'
        onClick={handlePayment}
      >
        Checkout
      </button>
    </main>
  );
}
