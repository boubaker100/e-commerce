import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/Axios";
import { USER } from "../../../Api/Api";
import Loading from "../../../Componenets/Loading/Loading";

export default function AddUser() {


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState("");


    //focus on input useref
    const nameRef = React.useRef();
    useEffect(() => {
        nameRef.current.focus();
    }, []);


    async function HandelSubmit(e) {

        e.preventDefault();
        setLoading(true);
        try {
            const res = await Axios.post(`${USER}/add`, { name, email, password, role });
            window.location.href = "/dashboard/users";

        } catch (err) {

            console.log(err)
            setLoading(false);
        }


    }
    return (
        <Form className="bg-white shadow  w-100 p-3   " onSubmit={HandelSubmit}>
            {loading && <Loading />}

            <Form.Label className="text-capitalize mb-3 "><h1>Add User Page</h1></Form.Label>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

                <Form.Label className="text-capitalize ">Title</Form.Label>
                <Form.Control
                    type="text" ref={nameRef}
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your Name"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="text"
                    value={email}

                    required
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your Email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                <Form.Label>password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                <Form.Label>Role</Form.Label>

                <Form.Select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}>

                    <option value={""} selected >Select Role</option>
                    <option value="1995">Admin</option>
                    <option value="2001">User</option>
                    <option value="1996">Writer</option>
                    <option value="1999">Product Manager</option>

                </Form.Select>
            </Form.Group>
            <button disabled={
                name.length > 1 &&
                    email.length > 1 &&
                    password.length > 6 &&
                    role !== "" ?
                    false : true}
                className="btn btn-primary ">Save</button>
        </Form>
    );
}
