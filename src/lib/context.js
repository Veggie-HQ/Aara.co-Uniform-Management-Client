import React, { createContext, useContext, useState } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
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

  //Increase product countity
  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  //Decrease product quantity
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

  //Add Product To Cart
  const onAdd = (product, quantity) => {
    //Total Price
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

    //Increase total quantity
    setTotalQuantitites(
      (prevTotalQuantities) => prevTotalQuantities + quantity
    );
    //Check if product is in the cart
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
      // setStudents(
      //   students.map((item) =>
      //     item.name === student.name ? { ...exist } : item
      //   )
      // );
      return;
    } else {
      // setStudents([...students, { ...student }]);
      setStudents((prev) => {
        return [...prev, { ...student }];
      });
    }
    // const existingStudent = localStorage.getItem("Student");
    // console.log("in onAddStudent", students);
  };

  //Remove product
  const onRemove = (product) => {
    //Set Total Price
    setTotalPrice((prevTotalPrice) => prevTotalPrice - product.price);
    if (product.price < 1000) {
      setGst5Total(
        (prevGST5Total) => prevGST5Total - 0.05 * quantity * product.price
      );
    } else if (product.price >= 1000) {
      setGst12Total(
        (prevGST12Total) => prevGST12Total - 0.12 * quantity * product.price
      );
    }
    //Remove from total quantities
    setTotalQuantitites((prevTotalQuantities) => prevTotalQuantities - 1);

    //Check if product exists
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

  return (
    <Context.Provider
      value={{
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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
