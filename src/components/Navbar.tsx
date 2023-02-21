import styles from "@/styles/Navbar.module.scss";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import PersonIcon from '@mui/icons-material/Person';
import { Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, createTheme } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";
import { ThemeProvider } from "@emotion/react";
import { Visibility } from "@mui/icons-material";

const theme = createTheme({
    typography: {
        fontFamily: [
            'Oswald',
            'sans-serif',
        ].join(','),
        fontSize: 17,
        fontWeightRegular: "bold",
    },
});


export default function Navbar() {
    const [ isDrawerOpen, setDrawerOpen ] = useState<boolean>(false);
    const router = useRouter();
    const name = "NeueSide";

    const drawerItems = [
        {
            icon: <HomeIcon classes={{ root: styles.icon }} />,
            name: "Home",
            onClick: () => {
                router.push("/");
            }
        },
        {
            icon: <LooksOneIcon classes={{ root: styles.icon }} />,
            name: "Counter",
            onClick: () => {
                router.push("/counter");
            }
        },
        {
            icon: <PersonIcon classes={{ root: styles.icon }} />,
            name: "User Manager",
            onClick: () => {
                router.push("/user-manager");
            }
        },
        {
            icon: <Visibility classes={{ root: styles.icon }} />,
            name: "Image Captioner",
            onClick: () => {
                router.push("/image-captioner");
            }
        },
    ]

    const toggleDrawerOpen = () => {
        setDrawerOpen(_prev => true);
    };

    const toggleDrawerClose = () => {
        setDrawerOpen(_prev => false);
    };

    return (
        <>
            <main className={styles.main}>
                <div className={styles.left}>
                    <IconButton color="primary" component="label" onClick={toggleDrawerOpen}>
                        <MenuIcon fontSize="medium" classes={{ root: styles.icon }} />
                    </IconButton>
                    <Drawer
                        anchor="left"
                        open={isDrawerOpen}
                        onClose={toggleDrawerClose}
                    >
                        <div
                            className={styles.drawer}
                        >
                            <List
                            >
                                <ListItem key={"x"}>
                                    <ThemeProvider theme={theme}>
                                        <ListItemText primary={"NeueSide"} sx={{fontWeight: "bold"}}/>
                                    </ThemeProvider>
                                </ListItem>
                                <Divider/>
                                {
                                    drawerItems.map(item =>
                                        <ListItem key={item.name} disablePadding>
                                            <ListItemButton onClick={item.onClick} classes={{ root: styles.item }}>
                                                {item.icon}
                                                {/* <ListItemIcon classes={{ root: styles.icon}}>
                                                </ListItemIcon> */}
                                                <ThemeProvider theme={theme}>
                                                    <ListItemText primary={item.name} />
                                                </ThemeProvider>
                                            </ListItemButton>
                                        </ListItem>
                                    )
                                }
                            </List>
                        </div>
                    </Drawer>
                </div>
                <div className={styles.right}>
                    {name}
                </div>
            </main>
        </>
    )
}