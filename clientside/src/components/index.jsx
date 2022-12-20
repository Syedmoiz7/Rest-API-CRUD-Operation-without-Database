import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from "axios";
import { useEffect } from 'react';
import { useState } from 'react';



function Render() {

    const [products, setProducts] = useState([]);

    const getAllProducts = async () => {
        try {
                const response = await axios.get(`${baseUrl}/products`)
                console.log("response: ", response.data);

                setProducts(response.data.data)
            } catch (error) {
                console.log("error in getting products ", error);
            }
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    let baseUrl = "";
    if (window.location.href.split(":")[0] === "http") {
        baseUrl = "http://localhost:5000";
    }

    const myFormik = useFormik({
        initialValues: {
            productName: '',
            productPrice: '',
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
                    .number('Enter your product price')
                    .positive("Enter positive product price ")
                    .required('Product price is required'),

                productDescription: yup
                    .string('Enter your product description')
                    .required('Product description is required')
                    .min(3, "please enter more then 3 characters ")
                    .max(500, "please enter within 500 characters "),

            }),
        onSubmit: (values) => {
            console.log("values: ", values);

            axios.post(`${baseUrl}/product`, {
                name: values.productName,
                price: values.productPrice,
                description: values.productDescription
            })
                .then(response => {
                    console.log("response: ", response.data);
                })
                .catch(err => {
                    console.log("error: ", err);
                })
        },
    });

    return (
        <div>
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

            <div>
                {products.map((eachProduct, i) => (
                    <div key={i}>
                        <h2>{eachProduct.name}</h2>
                        <p>{eachProduct.id}</p>
                        <h5>{eachProduct.price}</h5>
                        <p>{eachProduct.description}</p>
                    </div>
                ))}
            </div>




        </div>
    )
}

export default Render;