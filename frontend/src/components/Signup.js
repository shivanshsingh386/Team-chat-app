import { Formik } from "formik";
import React from "react";
import "./signup.css"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Signup = () => {

  const navigate = useNavigate();

  const userSubmit = async (formdata, { setSubmitting }) => {
    console.log(formdata);


    // 1. URL
    // 2. request method - get, post, put, delete , etc.
    // 3. Data you want to sent.
    // 4. data format - json, etc.

    setSubmitting(true);
    const res = await fetch("http://localhost:5000/user/add", {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: { "Content-Type": "application/json" },
    });

    console.log(res.status)
    setSubmitting(false);

    if(res.status===200){
      Swal.fire({
        icon : "success",
        title : 'Success',
        text : 'You have registered successfully'
      })
      navigate('/login');
    }else{
      // error alert
    }
  }

  return (
    <div>
      <div className="col-md-3 mx-auto pt-5">
        <div className="card">
        <div className="signup-form">
            <p className="text-center h4">Signup Form</p>
            <hr />
            <Formik initialValues={{ name: "", email: "", password: "", age: "" }} onSubmit={userSubmit}>
              {({ values, handleSubmit, handleChange, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
               <div class="form-group">
			<div className="input-group">
				<div className="input-group-prepend">
					<span className="input-group-text">
						<span className="fa fa-user"></span>
					</span>                    
				</div>
				<input type="text" value={values.name} onChange={handleChange} className="form-control" name="name" placeholder="name" required="required"/>
			</div>
        </div>

        <div className="form-group">
			<div className="input-group">
				<div className="input-group-prepend">
					<span className="input-group-text">
						<i className="fa fa-paper-plane"></i>
					</span>                    
				</div>
				<input type="email" value={values.email} onChange={handleChange}className="form-control" name="email" placeholder="Email Address" required="required"/>
			</div>
        </div>

             

        <div className="form-group">
			<div className="input-group">
				<div className="input-group-prepend">
					<span className="input-group-text">
						<i className="fa fa-lock"></i>
					</span>                    
				</div>
				<input type="text"value={values.password} onChange={handleChange} className="form-control" name="password" placeholder="Password" required="required"/>
			</div>
        </div>
        <div className="form-group">
			<div className="input-group">
				<div className="input-group-prepend">
					<span class="input-group-text">
						<i className="fa fa-lock"></i>
						<i className="fa fa-check"></i>
					</span>                    
				</div>
				<input type="text" value={values.confirmpassword} onChange={handleChange}className="form-control" name="confirm_password" placeholder="Confirm Password" required="required"/>
			</div>
        </div>

                  <button disabled={isSubmitting} type="submit" className="btn btn-primary">
                    {
                      isSubmitting ? 
                      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      :
                      'Submit'
                    }
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup