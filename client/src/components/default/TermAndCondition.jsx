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
        {/* Header */}
        <motion.header
          variants={fadeIn}
          initial="initial"
          whileInView="whileInView"
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-4">
            <span className="text-green-700 font-medium">Legal</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Terms &amp; Conditions
          </h1>
          <p className="text-gray-600 mt-3">
            Please read these Terms and Conditions carefully before making a
            vehicle reservation.
          </p>
        </motion.header>

        {/* Article */}
        <motion.article
          variants={fadeIn}
          initial="initial"
          whileInView="whileInView"
          className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 md:p-10 prose prose-sm md:prose lg:prose-lg hover:scale-105 transition"
        >
          {/* Section Example */}
          <h3 className="text-center text-xl md:text-2xl font-semibold mb-4">
            1. Reservation Policy
          </h3>
          <p className="mb-6">
            A reservation will be automatically canceled if the customer fails
            to arrive by the scheduled vehicle availability time. Cancelled
            reservations may result in the loss of any advance payment,
            depending on company policy.
          </p>

          <h3 className="text-center text-xl md:text-2xl font-semibold mb-4">
            2. Required Documents
          </h3>
          <p className="mb-4">
            To rent a vehicle, customers must present the following valid
            documents:
          </p>
          <ul className="list-disc list-inside mb-6">
            <li>A valid driver’s license</li>
            <li>Proof of insurance coverage</li>
            <li>
              Required collateral, such as stocks, bonds, or other accepted
              guarantees
            </li>
          </ul>
          <p className="mb-6">
            Failure to provide these documents will result in denial of the
            rental service.
          </p>

          <h3 className="text-center text-xl md:text-2xl font-semibold mb-4">
            3. Document Verification
          </h3>
          <p className="mb-6">
            Customers must submit a photocopy or digital image of their valid
            driver’s license and proof of insurance. The company reserves the
            right to verify all submitted documents before approving the rental.
          </p>

          <h3 className="text-center text-xl md:text-2xl font-semibold mb-4">
            4. Payment Policy
          </h3>
          <p className="mb-6">
            Customers are generally expected to make payment before renting the
            vehicle. In some cases, payment may be completed at check-out time,
            covering rental and additional expenses. No credit service is
            provided. All payments must be completed in full; partial or
            deferred payment is not allowed.
          </p>

          <h3 className="text-center text-xl md:text-2xl font-semibold mb-4">
            5. Payment Proof
          </h3>
          <p className="mb-6">
            All payments must be supported by a manual receipt issued by the
            rental office. Reservations or rentals without proper payment
            records are considered invalid.
          </p>

          <h3 className="text-center text-xl md:text-2xl font-semibold mb-4">
            6. Service Charges and Damages
          </h3>
          <p className="mb-6">
            A service charge is applied to every rental and service provided by
            the system. Customers are fully responsible for any damage caused
            to the rented vehicle during the rental period. Additional charges
            will be applied based on the type and severity of the damage.
          </p>

          <h3 className="text-center text-xl md:text-2xl font-semibold mb-4">
            7. Early Vehicle Return Policy
          </h3>
          <p className="mb-6">
            If a customer returns the rented vehicle before the agreed return
            date, the rental will be recalculated based on the actual number of
            days the vehicle was used. The remaining unused rental period will
            not be fully refundable. The company retains forty percent (40%) of
            the unused rental amount as a service and administrative charge,
            while sixty percent (60%) of the unused amount is eligible for
            refund. This policy applies only when the vehicle is returned in
            acceptable condition and without violations of the rental agreement.
          </p>

          <h3 className="text-center text-xl md:text-2xl font-semibold mb-4">
            8. Late Vehicle Return Policy
          </h3>
          <p className="mb-6">
            If a customer returns the vehicle after the agreed return date, the
            additional days will be charged at the standard daily rental rate.
            In addition to the normal rental charges for the extra days, a late
            return penalty equivalent to fifty percent (50%) of the total cost
            of the additional rental period will be applied. This penalty is
            imposed to compensate for scheduling disruptions and operational
            losses caused by the late return.
          </p>

          <h3 className="text-center text-xl md:text-2xl font-semibold mb-4">
            9. Vehicle Damage Responsibility
          </h3>
          <p className="mb-6">
            The customer assumes full responsibility for the condition of the
            vehicle throughout the rental period. Any damage, loss, or
            mechanical issue resulting from misuse, negligence, or violation of
            the rental agreement will be charged to the customer. The cost of
            repair, replacement, or restoration will be determined based on the
            extent of the damage and assessed by the company. These charges are
            separate from standard rental and service fees and must be settled
            in full by the customer.
          </p>

          <h3 className="text-center text-xl md:text-2xl font-semibold mb-4">
            10. Theft, Unauthorized Use, and Legal Action
          </h3>
          <p className="mb-6">
            Any attempt to steal, unlawfully retain, sell, transfer, or misuse
            the rented vehicle constitutes a serious violation of the rental
            agreement. In such cases, the company reserves the right to initiate
            legal proceedings in accordance with applicable law. The customer
            will be held financially liable for all resulting losses, including
            but not limited to vehicle value, recovery costs, legal expenses,
            and additional compensation for moral, reputational, and operational
            damages suffered by the company.
          </p>

          <h3 className="text-center text-xl md:text-2xl font-semibold mb-4">
            11. Agreement Acknowledgment
          </h3>
          <p className="mb-6">
            By checking the agreement box and proceeding with the reservation,
            you confirm that all provided information is accurate, you
            understand and accept these Terms &amp; Conditions, and you agree to
            comply with all company rules during the rental period.
          </p>

          <p className="text-sm text-gray-500 mt-6 text-center">
            If you have any questions about these terms, please contact our
            support team.
          </p>
        </motion.article>
      </div>
    </div>
  );
};

export default TermAndCondition;
