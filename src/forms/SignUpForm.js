import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import "../../src/scss/formStyles.scss";
import "../../src/scss/signUp.scss";
import SignUpImg from "../images/gooseNeckVine.jpg";
import { connect } from "react-redux";
import { doRegister } from "../util/actions/authActions";
import { Button } from "semantic-ui-react";

function SignUpForm({ values, errors, touched, isSubmitting }) {
  return (
    <Form className="signUp">
      <img src={SignUpImg} alt="A truck with beautiful fields" />
      <div>
        <h3>Sign Up!</h3>
        <p>User Name</p>
        <Field
          style={(errors.username && touched.username) ? { border: "1px solid red" } : null} 
          type="username" 
          name="username" 
          placeholder="username" />
          {touched.username && errors.username && <p className="error">{errors.username}</p>}
      </div>

      <div>
        <p>Password</p>
        
        <Field
          style={(errors.password && touched.password) ? { border: "1px solid red" } : null} 
          type="password" 
          name="password" 
          placeholder="Password" />
        {touched.password && errors.password && <p className="error">{errors.password}</p>}
      </div>

      <div className="checkbox">
        <p>Are you a land owner?</p>
        <label>
          <Field type="checkbox" name="landowner" checked={values.landowner} />
          Landowner
        </label>
      </div>

      <Button className="positive" color="green" type="submit" disabled={isSubmitting}>
        Submit
      </Button>
      <Link to="/login">Already signed up? Click here to login</Link>
    </Form>
  );
}

const SignUpComponent = withFormik({
  mapPropsToValues({ username, password, landowner }) {
    return {
      username: username || "",
      password: password || "",
      landowner: landowner || false
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .min(5, "Username must be 6 characters or longer")
      .required("Username is required"),
    password: Yup.string()
      .min(5, "Password must be 5 characters or longer")
      .required("Password is required")
  }),

  handleSubmit(values, formikBag) {
    formikBag.props.doRegister(values);
    formikBag.props.history.push("/login");
  }
})(SignUpForm);

export default connect(
  null,
  { doRegister }
)(SignUpComponent);
