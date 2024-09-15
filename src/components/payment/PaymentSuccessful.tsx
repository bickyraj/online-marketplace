import {CheckCircleIcon} from "@heroicons/react/20/solid";

const PaymentSuccessful: React.FC = () => {
    return (
        <>
            <div>
                <div className="bg-white p-6 md:mx-auto">
                    <CheckCircleIcon className="h-16 w-16 text-green-600 mx-auto my-6" />
                    <div className="text-center">
                        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Done!</h3>
                        <p className="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
                        <p> Have a great day! </p>
                        <div className="py-10 text-center">
                            <a href="/admin/dashboard"
                               className="rounded px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                                Go to Dashboard
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PaymentSuccessful;