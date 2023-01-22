import Navbar from "@/components/Navbar";
import Head from "next/head";
import styles from "@/styles/user-manager.module.scss";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "@mui/material";

type User = {
    id: string,
    username: string,
    email: string,
    password: string
};

const EMPTY_USER: User = {
    id: "", 
    username: "",
    email: "",
    password: ""
};

type EditUserDialogProps = {
    showDialog: boolean,
    setShowDialog: Dispatch<SetStateAction<boolean>>,
    editUser: User,
    setEditUser: Dispatch<SetStateAction<User>>,
    saveUser: ((user: User) => void)
};

const publicUserData: User[] = [
    {
        id: "1",
        username: "JackJack",
        email: "jack.jack@mail.com",
        password: "asdfasdhjk"
    },
    {
        id: "2",
        username: "Maximov",
        email: "hack.back@mail.com",
        password: "meister-mac"
    },
    {
        id: "3",
        username: "coldvis",
        email: "reynald.reyrey@whack.com",
        password: "110101"
    },
    {
        id: "4",
        username: "JackJack",
        email: "jack.jack@mail.com",
        password: "asdfasdhjk"
    },
    {
        id: "5",
        username: "JackJack",
        email: "jack.jack@mail.com",
        password: "asdfasdhjk"
    },
    {
        id: "6",
        username: "Maximov",
        email: "hack.back@mail.com",
        password: "meister-mac"
    },
    {
        id: "7",
        username: "coldvis",
        email: "reynald.reyrey@whack.com",
        password: "110101"
    },
    {
        id: "8",
        username: "JackJack",
        email: "jack.jack@mail.com",
        password: "asdfasdhjk"
    },
];

function EditUserDialog({ showDialog, setShowDialog, editUser, setEditUser, saveUser }: EditUserDialogProps) {

    const setUsername = (new_username: string) => {
        setEditUser(old => ({ ...old, username: new_username }));
    };
    
    const setEmail = (new_email: string) => {
        setEditUser(old => ({ ...old, email: new_email }));
    };

    const setPassword = (new_password: string) => {
        setEditUser(old => ({...old, password: new_password}));
    };

    useEffect(() => {
    }, []);

    return (
        <>
            <Dialog
                visible={showDialog}
                onHide={() => setShowDialog(false)}
                className={styles.edit_user_dialog}
            >
                <div className={styles.field}>
                    <label htmlFor="username">Username</label>
                    <InputText id="username"
                        className={styles.input}
                        value={editUser.username}
                        onChange={e => setUsername(e.target.value)}
                    ></InputText>
                </div>
                <div className={styles.field}>
                    <label htmlFor="email">Email</label>
                    <InputText id="email"
                        className={styles.input}
                        value={editUser.email}
                        onChange={e => setEmail(e.target.value)}
                    ></InputText>
                </div>
                <div className={styles.field}>
                    <label htmlFor="email">Password</label>
                    <InputText
                        id="email"
                        className={styles.input}
                        value={editUser.password}
                        onChange={e => setPassword(e.target.value)}
                    ></InputText>
                </div>
                <Button 
                    classes={{ root: styles.dialog_cancel }}
                    color="error"
                    variant="outlined"
                    onClick={_ => {
                        setShowDialog(false);
                    }}
                >Cancel</Button>
                <Button
                    classes={{ root: styles.dialog_save }}
                    color="success"
                    variant="outlined"
                    onClick={_ => { 
                        setShowDialog(false);
                        let id = editUser.id;
                        if (id === "") {
                            const random_id = Math.floor(Math.random() * 100) + 1;
                            id = random_id.toString();
                        }
                        saveUser({...editUser, id});
                    }}
                >Save</Button>
            </Dialog>
        </>
    )
}

export default function UserManager() {
    const [ selections, setSelections ] = useState<User[]>([]);
    const [ showDialog, setShowDialog ] = useState(false);
    const [ editUser, setEditUser ] = useState<User>(EMPTY_USER);
    const [ userData, setUserData ] = useState<User[]>(publicUserData);

    const saveUser = (user: User) => {
        setUserData(prev => prev.filter(puser => puser.id !== user.id).concat(user));
    };

    const deleteSelectedUsers = () => {
        const deleteIds: string[] = selections.map(user => user.id);
        setUserData(prev => prev.filter(puser => !deleteIds.includes(puser.id)));
        setSelections(_ => []);
    };

    const deleteUser = (id: string) => {
        setUserData(prev => prev.filter(puser => puser.id !== id));
    };

    const actionBodyTemplate = (rowData: User) => (<>
        <Button
            classes={{ root: styles.edit_button }}
            variant="outlined"
            onClick={_ => { 
                setEditUser({ ...rowData });
                setShowDialog(true);
            }}
        >Edit</Button>
        <Button
            classes={{ root: styles.delete_button }}
            variant="outlined"
            color="error"
            onClick={_ => deleteUser(rowData.id)}
        >Delete</Button>
    </>
    );

    const handleCreateUserButton = () => {
        setEditUser(EMPTY_USER);
        setShowDialog(true);
    };

    return (
    <>
        <Head>
            <title>NeueSide - Home</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar/>
        <main className={styles.main}>
            <div className={styles.control}>
                <Button
                    classes={{ root: styles.create_button }}
                    variant="contained"
                    onClick={handleCreateUserButton}
                >Create new user</Button>
                <Button
                    classes={{ root: styles.delete_button }}
                    color="error"
                    variant="contained"
                    disabled={selections.length === 0}
                    onClick={deleteSelectedUsers}
                >Delete selected user</Button>
            </div>
            <DataTable 
                value={userData} 
                // scrollable scrollHeight="100vh"
                selection={selections}
                onSelectionChange={e => setSelections(e.value)}
            >
                <Column selectionMode="multiple" style={{ maxWidth: "3rem" }} exportable={false}></Column>
                <Column sortable field="username" header="Username"></Column>
                <Column sortable field="email" header="Email"></Column>
                <Column field="password" header="Password"></Column>
                <Column body={actionBodyTemplate}></Column>
            </DataTable>
            <EditUserDialog
                showDialog={showDialog}
                setShowDialog={setShowDialog}
                editUser={editUser}
                setEditUser={setEditUser}
                saveUser={saveUser}
            />
        </main>
    </>
    );
}