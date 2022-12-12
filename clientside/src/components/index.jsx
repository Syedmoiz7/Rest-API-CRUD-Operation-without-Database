import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from "axios";


function ClientSide() {

    const myFormik = useFormik({
        initialValues: {
            productname: '',
            productprice: '',
            productdescription: ''
        },
        validationSchema:
            yup.object({
                productname: yup
                    .string('Enter your product name')
                    .required('Product name is required')
                    .min(3, "please enter more then 3 characters ")
                    .max(20, "please enter within 20 characters "),

                productprice: yup
                    .string('Enter your product price')
                    .required('Product price is required')
                    .postitive("Enter positive product price "),

                productdescription: yup
                    .string('Enter your product description')
                    .required('Product description is required')
                    .min(3, "please enter more then 3 characters ")
                    .max(500, "please enter within 500 characters "),

            }),
        onSubmit: (values) => {
            console.log("values: ", values);

            axios.post(`https://api.openweathermap.org/data/2.5/weather?q=${values.cityName}&units=metric&appid=e0f99c494c2ce394a18cc2fd3f100543`)
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
                    label="Product Name"
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
                <button type="submit"> Submit </button>
            </form>

            <br />
            <br />
        </div>
    )
}

export default ClientSide;