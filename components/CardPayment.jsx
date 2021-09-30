import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardPayment = ({ isShow, setIsShow, price }) => {
  //   state for payments
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  //   card element styles
  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  // this initialized the payment request by getting the price and a special secret
  useEffect(async () => {
    await fetch("/api/cardPayment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: price }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  const willNotShow = () => {
    setIsShow(false);
  };

  // will warn user if there are issues while typing credit card info
  const watchCard = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  // confirms the payment to stripe
  const confirmPayment = async () => {
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  return (
    <>
      <div
        className={`${
          isShow && "fixed h-screen w-screen bg-black opacity-90 z-[100]"
        }`}
      >
        <>
          <Transition appear show={isShow} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-[110] overflow-y-auto"
              onClose={willNotShow}
            >
              <div className="min-h-screen px-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0" />
                </Transition.Child>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                  className="inline-block h-screen align-middle"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className="inline-block  w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <CardElement
                      id="card-element"
                      options={cardStyle}
                      onChange={watchCard}
                    />

                    {/* Show any error that happens when processing the payment */}
                    {error && (
                      <div className="card-error" role="alert">
                        {error}
                      </div>
                    )}
                    {/* Show a success message upon completion */}
                    <p
                      className={
                        succeeded
                          ? "block mt-2 text-green-500 font-semibold"
                          : "hidden"
                      }
                    >
                      Payment succeeded, see the result in your
                      <a href={`https://dashboard.stripe.com/test/payments`}>
                        {" "}
                        Stripe dashboard.
                      </a>{" "}
                      Refresh the page to pay again.
                    </p>

                    <div className="mt-4 flex space-x-2 justify-end">
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-airbnb-red border border-transparent rounded-md hover:bg-[orange] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={willNotShow}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-airbnb-red border border-transparent rounded-md hover:bg-[orange] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        disabled={processing || disabled || succeeded}
                        onClick={confirmPayment}
                      >
                        {processing ? (
                          <>
                            <span className="animate-spin">
                              <FontAwesomeIcon icon="spinner" size="1x" />
                            </span>
                            <span>Processing</span>
                          </>
                        ) : (
                          <span>Confirm Payment</span>
                        )}
                      </button>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>
        </>
      </div>
    </>
  );
};

export default CardPayment;
