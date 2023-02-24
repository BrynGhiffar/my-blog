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
import { useEffect, useCallback } from "react";
import { IMAGE_CAPTIONER_HOST } from "@/env";

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

async function ImageCaptionerHealthCheck(): bool {
    try {
        const response = await fetch(`${IMAGE_CAPTIONER_HOST}/`);
        return response.status === 200;
    } catch (error) {
        return false;
    }

}


export default function Navbar() {
    const [ isDrawerOpen, setDrawerOpen ] = useState<boolean>(false);
    const [ isImageCaptionerAlive, setImageCaptionerAlive ] = useState<boolean>(false);
    const router = useRouter();
    const name = "NeueSide";

    useEffect(() => {
        const interval = setInterval(async () => {
            const imageCaptionerAlive = await ImageCaptionerHealthCheck();
            setImageCaptionerAlive(_ => imageCaptionerAlive);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const useDrawerItems = useCallback(() => (
        [
            {
                icon: <HomeIcon classes={{ root: styles.icon }} />,
                name: "Home",
                enabled: true,
                onClick: () => {
                    router.push("/");
                }
            },
            {
                icon: <LooksOneIcon classes={{ root: styles.icon }} />,
                name: "Counter",
                enabled: true,
                onClick: () => {
                    router.push("/counter");
                }
            },
            {
                icon: <PersonIcon classes={{ root: styles.icon }} />,
                name: "User Manager",
                enabled: true,
                onClick: () => {
                    router.push("/user-manager");
                }
            },
            {
                icon: <Visibility classes={{ root: styles.icon }} />,
                name: "Image Captioner",
                enabled: isImageCaptionerAlive,
                onClick: () => {
                    router.push("/image-captioner");
                }
            },
        ]
    ), [isImageCaptionerAlive]);

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
                                    useDrawerItems().map(item =>
                                        <ListItem key={item.name} disablePadding>
                                            <ListItemButton onClick={item.onClick} classes={{ root: styles.item }} disabled={!item.enabled}>
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