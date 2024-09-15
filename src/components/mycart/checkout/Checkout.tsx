/*
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import BillingDetail from "./BillingDetail.tsx";
import OrderPayment from "./OrderPayment.tsx";

const Checkout: React.FC = () => {
    return (
        <>
            <div className="grid grid-cols-2 gap-10">
                <BillingDetail/>
                <OrderPayment/>
            </div>
        </>
    )
}
export default Checkout;
