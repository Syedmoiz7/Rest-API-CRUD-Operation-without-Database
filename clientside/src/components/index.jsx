import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from "axios";



function ClientSide() {

    let baseUrl = "";
    if (window.location.href.split(":")[0] === "http") {
        baseUrl = "http://localhost:3000";
    }

    const myFormik = useFormik({
        initialValues: {
            productName: '',
            productprice: '',
            productDescription: ''
        },
        validationSchema:
            yup.object({
                productName: yup
                    .string('Enter your product name')
                    .required('Product name is required')
                    .min(3, "please enter more then 3 characters ")
                    .max(20, "please enter within 20 characters "),

                productPrice: yup
                    .string('Enter your product price')
                    .required('Product price is required')
                    .postitive("Enter positive product price "),

                productDescription: yup
                    .string('Enter your product description')
                    .required('Product description is required')
                    .min(3, "please enter more then 3 characters ")
                    .max(500, "please enter within 500 characters "),

            }),
        onSubmit: (values) => {
            console.log("values: ", values);

            axios.post(`${baseUrl}/product`)
                .then(response => {
                    console.log("response: ", response.data);
                })
                .catch(err => {
                    console.log("error: ", err);
                })
        },
    });

    return (
        <>
            <form onSubmit={myFormik.handleSubmit}>
                <input
                    id="productName"
                    placeholder="Product Name"
                    value={myFormik.values.productName}
                    onChange={myFormik.handleChange}
                />
                {
                    (myFormik.touched.productName && Boolean(myFormik.errors.productName)) ?
                        <span style={{ color: "red" }}>{myFormik.errors.productName}</span>
                        :
                        null
                }

                <br />

                <input
                    id="productPrice"
                    placeholder="Product Price"
                    value={myFormik.values.productPrice}
                    onChange={myFormik.handleChange}
                />
                {
                    (myFormik.touched.productPrice && Boolean(myFormik.errors.productPrice)) ?
                        <span style={{ color: "red" }}>{myFormik.errors.productPrice}</span>
                        :
                        null
                }

                <br />

                <input
                    id="productDescription"
                    placeholder="Product Description"
                    value={myFormik.values.productDescription}
                    onChange={myFormik.handleChange}
                />
                {
                    (myFormik.touched.productDescription && Boolean(myFormik.errors.productDescription)) ?
                        <span style={{ color: "red" }}>{myFormik.errors.productDescription}</span>
                        :
                        null
                }

                <br />
                <button type="submit"> Submit </button>
            </form>

            <br />
            <br />
        </>
    )
}

export default ClientSide;