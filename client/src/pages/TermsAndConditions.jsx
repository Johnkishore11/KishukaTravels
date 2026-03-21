import React from 'react';

const TermsAndConditions = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4">
            <div className="container mx-auto max-w-4xl bg-white p-8 rounded-lg shadow-md mt-6">
                <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">Captain Travels – Terms & Conditions</h1>
                
                <div className="space-y-8 text-gray-700">
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">General Terms</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>For any complaints or queries, passengers may contact Captain Travels customer support.</li>
                            <li>Passengers are requested to cooperate with the bus staff to ensure punctuality and smooth operations.</li>
                            <li>Tickets once booked are non-transferable.</li>
                            <li>Passengers must carry a valid government-issued photo ID during travel.</li>
                            <li>Captain Travels reserves the right to change seat allocation if required due to operational reasons.</li>
                            <li>Captain Travels shall not be responsible for any injury, loss, damage, delay, or inconvenience caused due to accidents, breakdowns, traffic conditions, or natural calamities.</li>
                            <li>Passengers carry luggage at their own risk. Additional luggage may incur extra charges.</li>
                            <li>Smoking and consumption of alcohol are strictly prohibited inside the bus.</li>
                            <li>Passengers agree to receive SMS, email, or call communications regarding booking and travel updates.</li>
                            <li>Passengers must report at the boarding point at least 10 minutes before departure.</li>
                            <li>A printed ticket or mobile e-ticket must be presented during boarding.</li>
                            <li>Captain Travels is not liable for trip cancellations due to unforeseen circumstances beyond management control.</li>
                            <li>Seats adjacent to female passengers are reserved for female passengers only. Male passengers may be reassigned accordingly.</li>
                            <li>Management is not responsible for loss or theft of baggage/luggage.</li>
                            <li>Passengers are strictly prohibited from carrying illegal or hazardous items, including weapons, inflammables, firearms, ammunition, drugs, alcohol, or any prohibited goods.</li>
                            <li>Arrival and departure timings are approximate and may vary due to traffic or other unavoidable conditions.</li>
                            <li>Pets and animals are not allowed inside the bus.</li>
                            <li>Any passenger causing disturbance or inconvenience to others may be removed from the bus without refund.</li>
                            <li>Amenities such as WiFi, video, charging ports, or entertainment systems are complimentary and not guaranteed. No video will be played between 12:00 AM and 6:00 AM.</li>
                            <li>Tickets once preponed or postponed cannot be transferred or canceled again.</li>
                        </ul>
                    </section>
                    
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Cancellation Terms</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Cancellations are subject to the applicable cancellation policy at the time of booking.</li>
                            <li>Partial cancellation is allowed.</li>
                            <li>Refunds for partial cancellations will be processed as per policy.</li>
                            <li>Captain Travels reserves the right to modify cancellation policies at any time without prior notice.</li>
                            <li>Tickets booked through the website must be canceled via the official cancellation process on the website.</li>
                            <li>Tickets booked through agents must be canceled through the respective agent only.</li>
                            <li>Refunds will be credited to the original payment method within 3 to 10 working days.</li>
                            <li>Tickets once transferred are non-cancellable and non-transferable.</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
