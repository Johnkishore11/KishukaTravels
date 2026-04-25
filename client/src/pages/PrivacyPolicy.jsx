import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4">
            <div className="container mx-auto max-w-4xl bg-white p-8 rounded-lg shadow-md mt-6">
                <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">Kishuka Travels – Privacy Policy</h1>
                
                <div className="space-y-6 text-gray-700 leading-relaxed">
                    <p>
                        Kishuka Travels operates this website to provide online bus booking and travel-related services. This service is developed and maintained by Kishore J.
                    </p>
                    <p>
                        This Privacy Policy explains how we collect, use, and protect your personal information when you use our services.
                    </p>
                    <p>
                        By using our website, you agree to the collection and use of information in accordance with this policy.
                    </p>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3 mt-8">1. Information We Collect</h2>
                        <p className="mb-2">To provide a better user experience, we may collect certain personally identifiable information, including but not limited to:</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Name</li>
                            <li>Phone number</li>
                            <li>Email address</li>
                            <li>Booking details</li>
                            <li>Payment-related information (processed securely via third-party gateways)</li>
                        </ul>
                        <p className="mt-2">This information is used to provide and improve our services.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3 mt-8">2. Log Data</h2>
                        <p className="mb-2">In case of errors or issues, we may collect Log Data such as:</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>IP address</li>
                            <li>Device name and type</li>
                            <li>Operating system version</li>
                            <li>Date and time of usage</li>
                            <li>Pages visited and interaction details</li>
                        </ul>
                        <p className="mt-2">This helps us analyze and improve the performance of our website.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3 mt-8">3. Cookies</h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Our website may use cookies to enhance user experience.</li>
                            <li>Cookies are small data files stored on your device.</li>
                            <li>You can choose to accept or refuse cookies through your browser settings.</li>
                            <li>Disabling cookies may affect certain functionalities of the website.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3 mt-8">4. Use of Information</h2>
                        <p className="mb-2">We use the collected information to:</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Provide and manage bookings</li>
                            <li>Improve website functionality and services</li>
                            <li>Send booking confirmations and updates</li>
                            <li>Provide customer support</li>
                            <li>Communicate important service-related information</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3 mt-8">5. Third-Party Services</h2>
                        <p className="mb-2">We may use third-party services for:</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Payment processing</li>
                            <li>Analytics</li>
                            <li>Hosting and technical support</li>
                        </ul>
                        <p className="mt-2">These third parties may have access to your information only to perform specific tasks and are obligated not to misuse it.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3 mt-8">6. Data Security</h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>We value your trust and implement reasonable security measures to protect your data.</li>
                            <li>However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3 mt-8">7. External Links</h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Our website may contain links to third-party websites.</li>
                            <li>We are not responsible for the privacy practices or content of those external sites.</li>
                            <li>We recommend reviewing their privacy policies before using them.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3 mt-8">8. Children's Privacy</h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Our services are not intended for children under the age of 13.</li>
                            <li>We do not knowingly collect personal data from children.</li>
                            <li>If such data is identified, it will be deleted immediately.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3 mt-8">9. Changes to This Privacy Policy</h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>We may update this Privacy Policy from time to time.</li>
                            <li>Any changes will be posted on this page with an updated effective date.</li>
                            <li>Users are advised to review this page periodically.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3 mt-8">10. Contact Us</h2>
                        <p className="mb-2">If you have any questions, concerns, or suggestions regarding this Privacy Policy, please contact:</p>
                        <div className="bg-gray-50 p-4 rounded-md inline-block border border-gray-100">
                            <p className="font-semibold text-gray-800">Kishuka Travels Support Team</p>
                            <p className="flex items-center gap-2 mt-2">📧 <a href="mailto:support@kishukatravels.com" className="text-primary hover:underline">support@kishukatravels.com</a></p>
                            <p className="flex items-center gap-2 mt-1">📞 <span>+91 98765 43210</span></p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
