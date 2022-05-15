import React, { useRef, useEffect } from "react";
<script src="https://www.paypal.com/sdk/js?client-id=ASiAcwE_h2zhisVeJ7TLEL1H0OS9SfJRg5K2YTZ_tg44N5pXPZfv9lRjoZaHQxJg79n_KmP23pkR7-0W"></script>


export default function PayPal(props) {
  const paypal = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: props.desc,
                amount: {
                  currency_code: "GBP",
                  value: props.payment,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}