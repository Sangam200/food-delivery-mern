import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MyOrder() {
  const [orderData, setOrderData] = useState(null);

  const fetchMyOrder = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/myOrderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail")
        })
      });

      const data = await response.json();
      setOrderData(data.orderData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="row">

          {!orderData ? (
            <div className="text-center mt-5">
              <h3>No Orders Found</h3>
            </div>
          ) : (

            orderData.order_data
              .slice()
              .reverse()
              .map((item, index) => (

                <div className="col-12" key={index}>

                  {item.map((arrayData, i) => {

                    if (arrayData.order_date) {
                      return (
                        <div key={i} className="mt-4">
                          <h4>{arrayData.order_date}</h4>
                          <hr />
                        </div>
                      );
                    }

                    return (
                      <div
                        key={i}
                        className="col-12 col-md-6 col-lg-3 d-inline-block"
                      >
                        <div
                          className="card mt-3"
                          style={{ width: "16rem", maxHeight: "360px" }}
                        >
                          <img
                            src={arrayData.img}
                            className="card-img-top"
                            alt={arrayData.name}
                            style={{
                              height: "120px",
                              objectFit: "cover"
                            }}
                          />

                          <div className="card-body">
                            <h5 className="card-title">
                              {arrayData.name}
                            </h5>

                            <div className="container w-100 p-0">
                              <span className="m-1">
                                Qty: {arrayData.qty}
                              </span>
                              <br />

                              <span className="m-1">
                                Size: {arrayData.size}
                              </span>
                              <br />

                              <div className="fs-5 mt-2">
                                ₹{arrayData.price}/-
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                </div>

              ))

          )}

        </div>
      </div>

      <Footer />
    </>
  );
}