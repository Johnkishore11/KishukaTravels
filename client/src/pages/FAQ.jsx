import React from 'react';

const FAQ = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4">
            <div className="container mx-auto max-w-4xl bg-white p-8 rounded-lg shadow-md mt-6">
                <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">Kishuka Travels – Frequently Asked Questions (FAQs)</h1>
                
                <div className="space-y-8 text-gray-700 leading-relaxed">
                    <div className="space-y-6">
                        {/* FAQ 1 */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">1. What is a failed or unsuccessful transaction?</h2>
                            <p className="mb-2">All payments are processed by your bank (credit/debit card or net banking). Based on their verification process, the bank sends a success or failure status.</p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Banks may not always provide a reason for failed transactions.</li>
                                <li>In some cases, the amount may be debited but the transaction still shows as failed.</li>
                                <li>If a transaction is marked as failed, Kishuka Travels does not receive the payment, and hence cannot process refunds directly.</li>
                                <li>The transaction status is automated, and successful payments are almost always confirmed instantly.</li>
                            </ul>
                        </div>

                        {/* FAQ 2 */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">2. Payment made but ticket not confirmed – what should I do?</h2>
                            <p className="mb-2">Tickets are confirmed only after we receive a successful transaction status.</p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Network issues or technical errors may cause booking failure even after payment.</li>
                                <li>In such cases, the full amount (including service charges) will be refunded.</li>
                                <li>Refunds are processed manually on working days (morning).</li>
                                <li>The amount will typically reflect in your account within 3 to 15 working days, depending on your bank.</li>
                            </ul>
                        </div>

                        {/* FAQ 3 */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">3. Why is my cancellation refund delayed?</h2>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Cancellation refunds are processed manually on working days (forenoon).</li>
                                <li>After processing, it may take 3 to 15 working days for the amount to reflect in your account.</li>
                                <li>The delay depends on your bank’s processing time.</li>
                            </ul>
                        </div>

                        {/* FAQ 4 */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">4. How can I do partial cancellation?</h2>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>During cancellation, booked seats are shown in red.</li>
                                <li>You can select specific seats to cancel instead of canceling the entire booking.</li>
                            </ul>
                            <div className="mt-3 bg-yellow-50 border-l-4 border-yellow-400 p-3 text-sm text-yellow-800">
                                <strong>⚠️ Note:</strong> If partial cancellation is not currently available, it will be introduced in future updates.
                            </div>
                        </div>

                        {/* FAQ 5 */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">5. Can I cancel my ticket on the day of travel?</h2>
                            <p className="mb-2">Yes, ticket cancellation is allowed up to:</p>
                            <div className="bg-gray-50 border border-gray-200 p-3 rounded-md my-2">
                                👉 <span className="font-semibold text-primary">4 hours before</span> the bus departure time from its starting point
                            </div>
                            <p className="text-sm text-gray-500 italic mt-2">⚠️ This should not be confused with your boarding time.</p>
                        </div>

                        {/* FAQ 6 */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">6. Who should I contact for refund or booking issues?</h2>
                            <p className="mb-2">For issues related to:</p>
                            <ul className="list-disc pl-6 space-y-1 mb-3">
                                <li>Refunds</li>
                                <li>Failed transactions</li>
                                <li>Booking not confirmed</li>
                            </ul>
                            <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                                <p className="mb-1">📧 Please contact our support team via email with:</p>
                                <ul className="list-inside list-disc pl-2 font-semibold text-gray-800">
                                    <li>PNR Number</li>
                                    <li>Registered contact details</li>
                                </ul>
                                <p className="mt-2 text-sm text-blue-800">Using the official support channel ensures faster resolution.</p>
                            </div>
                        </div>

                        {/* FAQ 7 */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">7. Who should I contact for service-related complaints?</h2>
                            <p className="mb-2">For complaints related to:</p>
                            <ul className="list-disc pl-6 space-y-1 mb-3">
                                <li>Bus delays</li>
                                <li>Staff behavior</li>
                                <li>Comfort during travel</li>
                                <li>Bus quality</li>
                            </ul>
                            <div className="bg-green-50 p-4 rounded-md border border-green-100">
                                <p className="flex items-start gap-2">
                                    <span>📩</span> 
                                    <span>Please contact the Kishuka Travels management office directly via email. <br/> Your concerns will be reviewed and addressed by the appropriate team.</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
