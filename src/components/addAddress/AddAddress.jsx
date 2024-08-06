/*
AddAddress component delas with loading the page which takes in Address selection
or provides the user an optoin to Add new Address into DB . It also uses Stepper to show the
progress of the user towards placing an order
*/
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { successMsg, errorMsg } from "../broadcastMessages/BroadcastMessages";
import {
  addAddressToDb,
  getAddresses,
  getProductForGivenID,
  createOrder,
  userData,
} from "../../common/services/apiService";
import { Button, MenuItem, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import "./AddAddress.css";

const steps = ["Item", "Select address", "Confirm order"];

const AddAddress = () => {
  const { id, qty } = useParams();
  const navigate = useNavigate();

  const [addressList, setAddressList] = useState([]);
  const [activeKey, setActiveKey] = useState(1);
  const [address, setAddress] = useState("");
  const [data, setData] = useState({
    name: "",
    contactNumber: "",
    street: "",
    city: "",
    state: "",
    landmark: "",
    zipcode: "",
  });
  const [details, setDetails] = useState(null);

  const getAddressList = async () => {
    try {
      const addresses = await getAddresses();
      const processedAddresses = addresses.map((address) => ({
        id: address.id,
        name: address.name,
        contactNumber: address.contactNumber,
        city: address.city,
        landmark: address.landmark,
        street: address.street,
        state: address.state,
        zipcode: address.zipcode,
        user: address.email,
      }));
      setAddressList(processedAddresses);
    } catch (error) {
      errorMsg("Could not fetch address details");
    }
  };

  const getProductDetails = async () => {
    try {
      const { product, ok } = await getProductForGivenID(id);
      if (ok) {
        setDetails(product);
      } else {
        errorMsg("Error occurred while loading the product details!");
      }
    } catch (e) {
      errorMsg("Error occurred while loading the product details!");
    }
  };

  const addAddress = async () => {
    const requiredFields = [
      "name",
      "contactNumber",
      "street",
      "city",
      "state",
      "zipcode",
    ];
    const isAllRequiredFieldsFilled = requiredFields.every(
      (field) => data[field].trim().length > 0
    );

    if (!isAllRequiredFieldsFilled) {
      errorMsg("Fill all the details");
      return;
    }
    data.user = userData()?.userId;
    const result = await addAddressToDb(data);
    if (result.success) {
      console.log("So the address ID is ::" + result.data);
      successMsg("Address added successfully");
      setData({
        name: "",
        contactNumber: "",
        city: "",
        state: "",
        street: "",
        landmark: "",
        zipcode: "",
      });
      getAddressList(); // Refresh the address list
      setAddress(result.data);
    } else {
      errorMsg("Failed to add address to DB");
    }
  };

  const placeOrder = async () => {
    const addressValues = Object.values(address).filter(
      (value) => typeof value === "string" && value.trim() !== ""
    );
    const addressString = addressValues.join(", ");
    console.log(addressString);
    console.log();

    let json = {
      quantity: qty,
      user: userData()?.userId,
      product: id,
      address: address,
    };
    try {
      const result = await createOrder(json);
      if (result.success) {
        successMsg("Order placed successfully !");
        setActiveKey((prev) => prev + 1);
        navigate("/products");
      } else {
        errorMsg("Failed to place the order !");
      }
    } catch (e) {
      errorMsg("Error occurred while placing the order , please retry..");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleNext = () => {
    if (activeKey === 1 && address === "") {
      errorMsg("Please select address");
      return;
    }
    setActiveKey((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveKey((prev) => prev - 1);
  };

  useEffect(() => {
    if (!userData()) {
      navigate("/login");
    } else {
      getAddressList();
      getProductDetails();
    }
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <Box
        sx={{ width: "80%", height: "100%", margin: "auto", marginY: "20px" }}
      >
        <Stepper activeStep={activeKey} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label} completed={activeKey > index}>
              <StepLabel
                StepIconProps={{
                  sx: {
                    color: activeKey === index ? "#3f51b5" : "default",
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      {activeKey === 1 && (
        <>
          <div>
            <p style={{ marginBottom: "20px" }}>Select address:</p>
            <TextField
              name="address"
              select
              label="Select Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)} // Store the address ID
              style={{ width: "50%", textAlign: "start" }}
            >
              <MenuItem value="">Select</MenuItem>
              {addressList.map((e, i) => (
                <MenuItem key={i} value={e.id}>
                  {" "}
                  {/* Use address ID as value */}
                  {`${e.name}, ${e.street}, ${e.city}, ${e.state}, ${e.zipcode}`}{" "}
                  {/* Display address details */}
                </MenuItem>
              ))}
            </TextField>
            <p style={{ textAlign: "center" }}>OR</p>
            <form className="registerForm1" style={{ marginTop: "20px" }}>
              <h3 style={{ marginTop: "5px", textAlign: "center" }}>
                Add Address
              </h3>
              <TextField
                name="name"
                label="Name *"
                variant="outlined"
                onChange={handleChange}
              />
              <TextField
                name="contactNumber"
                variant="outlined"
                label="Contact Number *"
                onChange={handleChange}
              />
              <TextField
                name="street"
                variant="outlined"
                label="Street *"
                onChange={handleChange}
              />
              <TextField
                name="city"
                variant="outlined"
                label="City *"
                onChange={handleChange}
              />
              <TextField
                name="state"
                variant="outlined"
                label="State *"
                onChange={handleChange}
              />
              <TextField
                name="landmark"
                variant="outlined"
                label="Landmark"
                onChange={handleChange}
              />
              <TextField
                name="zipcode"
                variant="outlined"
                label="Zipcode *"
                onChange={handleChange}
              />
              <button type="button" onClick={addAddress} className="loginBtn">
                Save Address
              </button>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  style={{
                    marginTop: "10px",
                    marginRight: "20px",
                    color: "black",
                  }}
                  size="medium"
                  variant="text"
                  onClick={() => navigate("/product/" + id)}
                >
                  Back
                </Button>
                <Button
                  style={{ marginTop: "10px", backgroundColor: "#3f51b5" }}
                  size="medium"
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  Next
                </Button>
              </div>
            </form>
          </div>
        </>
      )}
      {activeKey === 2 && (
        <>
          <div className="finalStep">
            {details && (
              <div style={{ width: "60%" }}>
                <h2>{details.name}</h2>
                <p>Quantity: {qty}</p>
                <p>Category: {details.category.toUpperCase()}</p>
                <p>
                  <em>{details.description}</em>
                </p>
                <h2 style={{ color: "red" }}>
                  Total Price: {details.price * qty}
                </h2>
              </div>
            )}
            <div style={{ width: "40%", borderLeft: "2px solid #80808045" }}>
              <h2>Address Details</h2>
              <p>{addressList.find((a) => a.id === address)?.name}</p>
              <p>
                Contact Number:{" "}
                {addressList.find((a) => a.id === address)?.contactNumber}
              </p>
              <p>{addressList.find((a) => a.id === address)?.street}</p>
              <p>{addressList.find((a) => a.id === address)?.state}</p>
              <p>{addressList.find((a) => a.id === address)?.zipcode}</p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "25px",
            }}
          >
            <Button
              style={{ marginTop: "10px", marginRight: "20px", color: "black" }}
              size="medium"
              variant="text"
              onClick={handleBack}
            >
              BACK
            </Button>
            <Button
              style={{ marginTop: "10px", backgroundColor: "#3f51b5" }}
              size="medium"
              variant="contained"
              onClick={placeOrder}
            >
              PLACE ORDER
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddAddress;
