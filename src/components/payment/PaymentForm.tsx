// src/PaymentForm.tsx

import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import keycloak from "../../security/keycloak.ts";

const PaymentForm: React.FC = () => {
    const stripe = useStripe();
    const navigate = useNavigate();
    const elements = useElements();
    const [paymentMethodId, setPaymentMethodId] = useState<string | null>(null);
    const [error, setError] = useState<string | null | undefined>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!stripe || !elements) return; // Ensure Stripe.js and Elements have loaded

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
            setError("Card Element not found.");
            return;
        }

        // Create a payment method using Stripe.js
        const { paymentMethod, error: stripeError } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (stripeError) {
            setError(stripeError.message);
            return;
        }

        // Set the payment method ID in state
        if (paymentMethod) {
            setPaymentMethodId(paymentMethod.id);
            setError(null);
            setSuccess(true);

            // Call your backend API with the payment method ID
            await fetch('http://localhost:8080/api/payment/add-payment-method', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${keycloak.token}`,
                },
                body: JSON.stringify({ paymentMethodId: paymentMethod.id, provider: "STRIPE" }),
            }).then(() => {
                navigate("/admin/add-payment-method");
            });
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 border border-gray-300 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
                <h1 className="text-2xl font-bold text-center">Stripe Payment</h1>
                <div className="border p-3 rounded-md">
                    <CardElement className="w-full"/>
                </div>
                <button
                    type="submit"
                    disabled={!stripe}
                    className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                >
                    Add Payment Method
                </button>
                {error && <div className="text-red-500">{error}</div>}
                {success && (
                    <div className="text-green-500">
                        Payment Method ID: {paymentMethodId}
                    </div>
                )}
            </form>
        </div>
    );
};

export default PaymentForm;
