import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm.tsx";

const stripePromise = loadStripe('pk_test_51Py2m9ILN8lgkSQJP0khvCSQpO7IIgdC8T58HC5ken2QCYq2E0BPJC0NcNLkqubYJqEdPU5WyjznDP3aX2pVyH1w00IoS3PjTp');
const AddPaymentMethod: React.FC = () => {
    return (
        <>
            <Elements stripe={stripePromise}>
                <PaymentForm/>
            </Elements>
        </>
    );
}

export default AddPaymentMethod;