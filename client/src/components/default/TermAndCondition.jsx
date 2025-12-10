import React from "react";
import { motion } from "framer-motion";

const TermAndCondition = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-8 pb-16">
            <div className="container mx-auto px-4">
                <motion.header
                    variants={fadeIn}
                    initial="initial"
                    whileInView="whileInView"
                    className="max-w-3xl mx-auto text-center mb-8"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-4">
                        <span className="text-green-700 font-medium">Legal</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Terms &amp; Conditions</h1>
                    <p className="text-gray-600 mt-3">Please read these Terms and Conditions carefully before making a vehicle reservation.</p>
                </motion.header>

                <motion.article
                    variants={fadeIn}
                    initial="initial"
                    whileInView="whileInView"
                    className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 md:p-10 prose prose-sm md:prose lg:prose-lg"
                >
                    <p>
                        By proceeding with a reservation, you agree to be bound by the following terms.
                    </p>
                    <br />
                    <h3>1. Payment Policy</h3>
                    <p>
                        Customers are generally expected to make payment before renting the vehicle. In some cases, payment may be
                        completed at check-out time, covering rental and additional expenses. No credit service is provided. All
                        payments must be completed in full; partial or deferred payment is not allowed.
                    </p>
                    <br />
                    <h3>2. Payment Proof</h3>
                    <p>
                        All payments must be supported by a manual receipt issued by the rental office. Reservations or rentals
                        without proper payment records are considered invalid.
                    </p>
                    <br />
                    <h3>3. Service Charges and Damages</h3>
                    <p>
                        A service charge is applied to every rental and service provided by the system. Customers are fully
                        responsible for any damage caused to the rented vehicle during the rental period. Additional charges will be
                        applied based on the type and severity of the damage.
                    </p>
                    <br />
                    <h3>4. Reservation Policy</h3>
                    <p>
                        A reservation will be automatically canceled if the customer fails to arrive by the scheduled vehicle
                        availability time. Cancelled reservations may result in the loss of any advance payment, depending on company
                        policy.
                    </p>
                    <br />
                    <h3>5. Required Documents</h3>
                    <p>
                        To rent a vehicle, customers must present the following valid documents:
                    </p>
                    <ul>
                        <li>A valid driver’s license</li>
                        <li>Proof of insurance coverage</li>
                        <li>Required collateral, such as stocks, bonds, or other accepted guarantees</li>
                    </ul>
                    <p>Failure to provide these documents will result in denial of the rental service.</p>
                    <br />
                    <h3>6. Document Verification</h3>
                    <p>
                        Customers must submit a photocopy or digital image of their valid driver’s license and proof of insurance. The
                        company reserves the right to verify all submitted documents before approving the rental.
                    </p>
                    <br />
                    <h3>7. Agreement Acknowledgment</h3>
                    <p>
                        By checking the agreement box and proceeding with the reservation, you confirm that all provided information is
                        accurate, you understand and accept these Terms &amp; Conditions, and you agree to comply with all company rules
                        during the rental period.
                    </p>

                    <p className="text-sm text-gray-500 mt-4">If you have any questions about these terms, please contact our support team.</p>
                </motion.article>
            </div>
        </div>
    );
};

export default TermAndCondition;
