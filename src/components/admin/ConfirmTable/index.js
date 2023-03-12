import { useStateContext } from "@/lib/context";
import { Button, Flex } from "@chakra-ui/react";
import { jsPDF } from "jspdf";
import { useState } from "react";
import InWords from "./utils/InWords";
import InvoiceDate from "./utils/InvoiceDate";
import { MdCurrencyRupee } from "react-icons/md";

const Index = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [INV, SetINV] = useState(0);
  const [download, allowDownload] = useState(true);

  const { orderToConfirm } = useStateContext();
  // console.log(orderToConfirm);
  const [recvAmt, setRecvAmt] = useState(0);

  const onChange = (e) => {
    setRecvAmt(e.target.value);
  };
  let currKey = "";
  let currIndex;
  let IN;
  let counter = 1;

  async function PushOrderToDB(order_details) {
    setLoading(true);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_REALTIME_1, {
        method: "POST",
        body: JSON.stringify(order_details),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      currKey = data["name"];
      // console.log("pushed1");

      const res1 = await fetch(process.env.NEXT_PUBLIC_REALTIME_1);
      // console.log("fetching");
      const data1 = await res1.json().then((res) => {
        // console.log("fetching 2");
        let x = Object.keys(res);
        for (let i = 0; i < x.length; i++) {
          // console.log(x[i] + " : " + currKey);
          if (x[i] === currKey) {
            // console.log("curr", currKey);
            currIndex = i;

            break;
          }
        }
      });

      // CHANGE INVOICE NUMBER HERE
      IN = 999 + currIndex;

      let modDetails = {
        ...order_details,
        invoice_number: IN,
        balance: order_details.total - recvAmt,
      };

      const res2 = await fetch(process.env.NEXT_PUBLIC_REALTIME_2, {
        method: "POST",
        body: JSON.stringify(modDetails),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data2 = await res2.json();
      // console.log("pushed2");
      SetINV(IN);

      setTimeout(() => {
        allowDownload(false);
      }, 750);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  const invoiceDownloader = () => {
    let element = document.getElementById("contents");
    let b = document.getElementById("remBalance");
    b.style.display = "none";

    let h = document.getElementById("invoiceheader");
    h.classList.remove("useless");

    let doc = new jsPDF();
    doc.html(element, {
      callback: function (doc) {
        doc.save(`INVOICE #${INV}.pdf`);
      },
      margin: [10, 0, 0, 20],
      autoPaging: "text",
      x: 0,
      y: 0,
      width: 175,
      windowWidth: 1000,
    });

    // setTimeout(() => {
    //   window.location.reload();
    // }, 3000);
  };

  return (
    <>
      {Object.keys(orderToConfirm).length > 0 ? (
        <>
          <div>
            {/* Display Order Details */}
            <div id="contents">
              <div className="useless invoiceheader" id="invoiceheader">
                <p className="tax_invoice">TAX INVOICE</p>
                <img src={"/assets/header.png"} alt="invoiceheader" />
              </div>

              <div className="billto">
                <div className="left left_bill">
                  <p class="date bold">Invoice No.: {INV}</p>
                  <p className="bold">BILL TO</p>

                  <p>{orderToConfirm.order.studentDetails.name}</p>
                  <p>
                    Going to Class:{" "}
                    {orderToConfirm.order.studentDetails.goingToClass}
                  </p>

                  <p>Bangalore</p>
                </div>
                <div className="right right_bill">
                  <InvoiceDate />
                </div>
              </div>

              <table className="table order_details" id="contentsTable">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Size</th>
                    <th>Quantity</th>
                    <th>Rate</th>
                    <th>Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {orderToConfirm.order.cartItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.title}</td>
                      <td>{item.size}</td>
                      <td isNumeric>{item.quantity}</td>
                      <td isNumeric>{item.price}</td>
                      <td isNumeric>{item.quantity * item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="info">
                <div className="left">
                  <div className="terms">
                    <p className="bold">Terms and Conditions</p>
                    <p id="words">
                      1. Goods once sold will not be taken back or exchanged{" "}
                      <br />
                      2. All disputes are subject to Bangalore jurisdiction only
                    </p>
                  </div>
                </div>
                <div className="right">
                  <div className="taxes">
                    <div className="left">
                      <p>Taxable Amount</p>
                      <p>CGST @2.5%</p>
                      <p>SGST @2.5%</p>
                      <p>CGST @6%</p>
                      <p>SGST @6%</p>
                      <p>Round Off</p>
                    </div>

                    <div className="right taxes_right">
                      <p class="row">
                        <img
                          src={"/assets/re.png"}
                          className="resymbol"
                          alt="rupee"
                        />
                        {/* <MdCurrencyRupee /> */}
                        {orderToConfirm.order.subtotal}
                      </p>

                      <p class="row">
                        <img
                          src={"/assets/re.png"}
                          className="resymbol"
                          alt="rupee"
                        />
                        {/* <MdCurrencyRupee /> */}

                        {orderToConfirm.order.gst5Total / 2}
                      </p>
                      <p class="row">
                        <img
                          src={"/assets/re.png"}
                          className="resymbol"
                          alt="rupee"
                        />
                        {orderToConfirm.order.gst5Total / 2}
                      </p>
                      <p class="row">
                        <img
                          src={"/assets/re.png"}
                          className="resymbol"
                          alt="rupee"
                        />
                        {orderToConfirm.order.gst12Total / 2}
                      </p>
                      <p class="row">
                        <img
                          src={"/assets/re.png"}
                          className="resymbol"
                          alt="rupee"
                        />
                        {orderToConfirm.order.gst12Total / 2}
                      </p>
                      <p class="row">{orderToConfirm.order.roundOff}</p>
                    </div>
                  </div>

                  <p className="row total bold">
                    TOTAL AMOUNT: <span className="spacer2" />
                    <img
                      src={"/assets/re.png"}
                      className="resymbol"
                      alt="rupee"
                    />{" "}
                    {orderToConfirm.order.total}
                  </p>
                  <div className="balances" id="remBalance">
                    <div className="row form_received">
                      <label className="form_item" htmlFor="received_amt">
                        Received Amount
                      </label>
                      <input
                        className="form_item text2"
                        type="text"
                        name="received_amt"
                        id="received_amt"
                        onChange={onChange}
                      />
                    </div>
                  </div>
                  <div className="taxes">
                    <div className="left">
                      <p>Received Amount</p>
                      <p>Balance</p>
                    </div>
                    <div className="right">
                      <p class="row">
                        <img
                          src={"/assets/re.png"}
                          className="resymbol"
                          alt="rupee"
                        />
                        {recvAmt}
                      </p>
                      <p class="row">
                        <img
                          src={"/assets/re.png"}
                          className="resymbol"
                          alt="rupee"
                        />{" "}
                        {orderToConfirm.order.total - recvAmt}
                      </p>
                    </div>
                  </div>

                  <div className="total_words">
                    <p className="bold">Total Amount (in words)</p>
                    <InWords amount={orderToConfirm.order.total} />
                  </div>

                  <div className="sign">
                    <img
                      src={"/assets/sign.jpeg"}
                      className="sign_img"
                      alt="Authorised Sign"
                    />
                    <p className="bold">Authorised Signatory For</p>
                    <p id="words">Aara.co</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Flex justify="center" align="center" width="100%" margin="90px auto">
            <Button
              bg="orange.300"
              _hover={{ bg: "orange.100" }}
              onClick={() => PushOrderToDB(orderToConfirm.order)}
              isLoading={loading}
              isDisabled={!download}
            >
              Confirm Order
            </Button>
            <Button
              ml={2}
              bg="blue.300"
              _hover={{ bg: "blue.100" }}
              onClick={() => invoiceDownloader()}
              isDisabled={download}
            >
              Download Invoice
            </Button>
          </Flex>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Index;
