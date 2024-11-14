import { Formik, Form, Field, ErrorMessage } from "formik"
import { useId } from "react";
import * as Yup from "yup"

export const RegForm = () => {

    const initialValues = { username: "", email: "", password: "", level: "good" };

    const handleSubmit = (values, actions) => {
        console.log(values);
        actions.resetForm();
    }

        const nameFieldId = useId();
        const emailFieldId = useId();
        const passwordFieldId = useId();
        const levelFieldId = useId();

    const FeedbackSchema = Yup.object().shape({
        username: Yup.string().min(2, 'Too short!').max(50, 'Too long!').required('Required'),
        email: Yup.string().email('Must be a valid email!').required('Required'),
        password: Yup.string().min(3, 'Too shord password').max(50, 'Too long password').required('Required'),
        level: Yup.string().oneOf(["good", "neutral", "bad"]).required('Required')
    });

    return (
      <div>
        <h1>Registration form</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={FeedbackSchema}
        >
          <Form>
            <div>
              <label htmlFor={nameFieldId}>Username</label>
              <Field type="text" name="username" id={nameFieldId} />
              <ErrorMessage name="username" component="span" />
            </div>

            <div>
              <label htmlFor={emailFieldId}>Email</label>
              <Field type="email" name="email" id={emailFieldId} />
              <ErrorMessage name="email" component="span" />
            </div>

            <div>
              <label htmlFor={passwordFieldId}>Password</label>
              <Field type="password" name="password" id={passwordFieldId} />
              <ErrorMessage name="password" component="span" />
            </div>

            <div>
              <Field as="select" name="level" id={levelFieldId}>
                <option value="good">Good</option>
                <option value="neutral">Neutral</option>
                <option value="bad">Bad</option>
              </Field>
              <ErrorMessage name="level" component="span" />
            </div>

            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
    );
}