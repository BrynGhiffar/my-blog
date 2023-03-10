
import Navbar from "@/components/Navbar";
import { NeuePasswordField, NeueTextField } from "@/components/NeueTextField";
import Head from "next/head";
import styles from "@/styles/Register.module.scss";
import { NeueButton } from "@/components/NeueButton";
import { useState } from "react";
import { Router, useRouter } from "next/router";
import { USER_MANAGER_RS_HOST } from "@/env";


type userRegisterForm = {
    email: string,
    username: string,
    password: string,
    password_again: string
}

const emptyRegisterForm: userRegisterForm = {
    email: "",
    username: "",
    password: "",
    password_again: ""
}

async function registerApi(form: userRegisterForm) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", form.email);
    urlencoded.append("username", form.username);
    urlencoded.append("password", form.password);
    urlencoded.append("password_again", form.password_again);

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
    };

    await fetch(`${USER_MANAGER_RS_HOST}/user/register`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}


export default function Register() {

    const [registerForm, setRegisterForm] = useState(emptyRegisterForm);

    const onUsernameChange = (val: string) => setRegisterForm(v => ({...v, username: val}));
    const onEmailChange = (val: string) => setRegisterForm(v => ({...v, email: val}));
    const onPasswordChange = (val: string) => setRegisterForm(v => ({...v, password: val}));
    const onPasswordAgainChange = (val: string) => setRegisterForm(v => ({...v, password_again: val}));

    const router = useRouter();

    return <>
        <Head>
            <title>NeueSide - Register</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar/>
        <div>
        <main className={styles.main}>
            <div className={styles.fields}>
                <h1 className={styles.title}>NeueSide</h1> 
                    <NeueTextField
                        label="Username"
                        onChange={onUsernameChange}
                        value={registerForm.username}
                    />
                    <NeueTextField
                        label="Email"
                        onChange={onEmailChange}
                        value={registerForm.email}
                    />
                    <NeuePasswordField
                        label="Password"
                        onChange={onPasswordChange}
                        value={registerForm.password}
                    />
                    <NeuePasswordField
                        label="Password Again"
                        onChange={onPasswordAgainChange}
                        value={registerForm.password_again}
                    />
                <NeueButton
                    onClick={async () => {
                        await registerApi(registerForm);
                        router.push("/");
                    }}
                >Register</NeueButton>
            </div>
        </main>
        </div>
    </>
}