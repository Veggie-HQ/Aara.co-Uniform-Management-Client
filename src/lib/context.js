import React, { createContext, useContext, useState } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  // Client Context Begins HERE
  const [showCart, setShowCart] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [USER, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [students, setStudents] = useState([]);
  const [qty, setQty] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [gst5Total, setGst5Total] = useState(0.0);
  const [gst12Total, setGst12Total] = useState(0.0);
  const [DATA, setDATA] = useState([]);
  const [totalQuantities, setTotalQuantitites] = useState(0);
  const [STUDENT, selectedStudent] = useState("");

  const insertData = (data) => {
    setDATA((prev) => ({
      ...prev,
      data,
    }));
  };

  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decreaseQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  const studentSelector = (student) => {
    selectedStudent((prev) => ({
      ...prev,
      student,
    }));
  };

  const loginHandler = (user) => {
    setUser(user);
  };

  const onAdd = (product, quantity) => {
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );

    if (product.price < 1000) {
      setGst5Total(
        (prevGST5Total) => prevGST5Total + 0.05 * quantity * product.price
      );
    } else if (product.price >= 1000) {
      setGst12Total(
        (prevGST12Total) => prevGST12Total + 0.12 * quantity * product.price
      );
    }
    setTotalQuantitites(
      (prevTotalQuantities) => prevTotalQuantities + quantity
    );
    const exist = cartItems.find((item) => item.slug === product.slug);
    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug
            ? { ...exist, quantity: exist.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: quantity }]);
    }
  };

  const onAddStudent = (student) => {
    const exist = students.find((item) => item.name === student.name);

    if (exist) {
      return;
    } else {
      setStudents((prev) => {
        return [...prev, { ...student }];
      });
    }
  };

  const onRemove = (product) => {
    setTotalPrice((prevTotalPrice) => prevTotalPrice - product.price);
    if (product.price < 1000) {
      setGst5Total((prevGST5Total) => prevGST5Total - 0.05 * product.price);
    } else {
      setGst12Total((prevGST12Total) => prevGST12Total - 0.12 * product.price);
    }
    setTotalQuantitites((prevTotalQuantities) => prevTotalQuantities - 1);

    const exist = cartItems.find((item) => item.slug === product.slug);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.slug !== product.slug));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug
            ? { ...exist, quantity: exist.quantity - 1 }
            : item
        )
      );
    }
  };

  // Admin Context Begins HERE
  const [ADMIN, setAdmin] = useState(null);
  const [showConfirmedOrders, setShowConfirmedOrders] = useState(false);
  const [showPendingOrders, setShowPendingOrders] = useState(false);
  const [totalConfirmedOrders, setTotalConfirmedOrders] = useState(0);

  const adminLoginHandler = (adminDetails) => {
    setAdmin(adminDetails);
  };

  return (
    <Context.Provider
      value={{
        // CLIENT CONTEXT VARS
        STUDENT,
        studentSelector,
        USER,
        loginHandler,
        students,
        onAddStudent,
        showCart,
        setShowCart,
        showUser,
        setShowUser,
        qty,
        increaseQty,
        decreaseQty,
        cartItems,
        onAdd,
        onRemove,
        totalPrice,
        totalQuantities,
        setQty,
        setCartItems,
        setTotalQuantitites,
        gst5Total,
        gst12Total,
        insertData,
        DATA,
        setGst5Total,
        setGst12Total,
        setTotalPrice,
        // ADMIN CONTEXT VARS
        ADMIN,
        adminLoginHandler,
        showConfirmedOrders,
        setShowConfirmedOrders,
        showPendingOrders,
        setShowPendingOrders,
        totalConfirmedOrders,
        setTotalConfirmedOrders,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
