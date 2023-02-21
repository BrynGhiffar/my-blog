import Navbar from "@/components/Navbar";
import Head from "next/head";
import styles from "@/styles/image-captioner.module.scss"
import { useEffect, useRef, useState } from "react";
import { Button, ButtonGroup, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

type nullString = string | null;
const HOST = "http://localhost:3000";
const CAPTIONING_HOST = "http://localhost:3005";

const fetchImageBase64 = async (image_url: string): Promise<string> => {
    const url = `${HOST}/api/image`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const req_body = JSON.stringify({
        "image_url": image_url
    });
    const options: RequestInit = {
        method: 'POST',
        redirect: "follow",
        headers: headers,
        body: req_body,
    };
    const response = await fetch(url, options);
    const base_image_string = await response.text() as string;
    return base_image_string;
};

const fetchImageCaption = async (base_image_string: string): Promise<string> => {
    type ImageCaptionerResponse = {
        caption: string
    };
    const url = `${CAPTIONING_HOST}/base64`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const req_body = JSON.stringify({
        "base64": base_image_string
    });
    const options: RequestInit = {
        method: "POST",
        headers: headers,
        body: req_body,
        redirect: "follow"
    };
    const response = await fetch(url, options);
    const { caption } = JSON.parse(await response.text()) as ImageCaptionerResponse;
    return caption;
}

const toBaseString = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString()!);
    reader.onerror = error => reject(error);
});

export default function ImageCaptioner() {

    const [ imageBaseString, setImageBaseString ] = useState<nullString>(null);
    const [ imageCaption, setImageCaption ] = useState<nullString>(null);
    const [ imageLink, setImageLink ] = useState<string>("");
    const [ showImageLinkInput, setShowInputImageLinkInput ] = useState<boolean>(false);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const menuOptions = [ 'Upload from computer', 'Upload from URL' ];
    const menuOptionInnerComponent = [
        () => (<input
            key="image-input"
            type="file"
            accept="image/*"
            hidden
            onChange={async e => {
                if (e.target.files == null)
                    return
                const file = e.target.files![ 0 ];
                const _imageBaseString = await toBaseString(file);
                setImageBaseString(_ => _imageBaseString);
            }}
        />)
        ,
        () => (<></>)
    ];
    const menuButtonClickHandlers = [
        () => {
            // console.log("Wuzzahhh");
        },
        () => {
            const run = async () => {
                setIsLoading(true);
                const image_url = imageLink;
                const base_image_string = await fetchImageBase64(image_url);
                setImageBaseString(_ => base_image_string);
                setIsLoading(false);
            };
            run();
        }
    ]

    const menuClickHandlers = [
        () => {
            setImageLink("");
            setImageCaption("");
            setShowInputImageLinkInput(false);
        },
        () => {
            setImageCaption("");
            setShowInputImageLinkInput(true);
        }
    ]

    const ShowImage = () => {
        if (imageBaseString !== null) {
            return (
                <>
                    <div className={styles.caption_image_wrapper}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            className={styles.caption_image}
                            alt="Image to be uploaded"
                            src={imageBaseString}
                        />
                    </div>
                </>
            )
        } else {
            return <>
                <span className={styles.caption_no_image}>
                    Please Upload an image
                </span>
            </>
        }
    }

    return (
        <>
            <Head>
                <title>NeueSide - Image Captioner</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <main className={styles.main}>
                <ShowImage />
                <div className={styles.caption_buttons_wrapper}>
                    <SplitButton
                        menuOptions={menuOptions}
                        menuOptionInnerComponent={menuOptionInnerComponent}
                        menuButtonClickHandlers={menuButtonClickHandlers}
                        menuClickHandlers={menuClickHandlers}
                        disabled={isLoading}                        
                    />
                    <Button
                        variant="contained"
                        color="success"
                        onClick={async _ => {
                            if (imageBaseString !== null) {
                                setIsLoading(true);
                                const caption = await fetchImageCaption(imageBaseString);
                                setImageCaption(_ => caption);
                                setIsLoading(false);
                            }
                        }}
                        disabled={isLoading}
                    >
                        Caption
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={async _ => {
                            setImageBaseString(_ => null);
                        }}
                        disabled={isLoading}
                    >Remove Image</Button>
                </div>
                {
                    showImageLinkInput ? (
                        <div className={styles.caption_url_input_wrapper}>
                            <input
                                placeholder="Enter Image URL"
                                value={imageLink}
                                disabled={isLoading}
                                onChange={e => {
                                    const { value } = e.target;
                                    setImageLink(_ => value.trim());
                                }}
                            />
                        </div>
                    ) : null
                }
                <div className={styles.caption_image_caption}>
                    {imageCaption}
                </div>
            </main>
        </>
    )
}

type SplitButtonProps = {
    menuOptions: string[],
    menuOptionInnerComponent: (() => JSX.Element)[],
    menuButtonClickHandlers: (() => void)[],
    menuClickHandlers: (() => void)[],
    disabled: boolean
};

function SplitButton({ menuOptions, menuOptionInnerComponent, menuButtonClickHandlers, menuClickHandlers, disabled }: SplitButtonProps) {
    const [ open, setOpen ] = useState(false);
    const anchorRef = useRef<HTMLDivElement>(null);
    const [ selectedIndex, setSelectedIndex ] = useState(0);

    const handleMenuItemClick = (
        _event: React.MouseEvent<HTMLLIElement, MouseEvent>,
        index: number,
    ) => {
        menuClickHandlers[ index ]();
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    const Child = menuOptionInnerComponent[ selectedIndex ];

    return (
        <>
            <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                <Button
                    classes={{ root: styles.upload_button }}
                    onClick={menuButtonClickHandlers[ selectedIndex ]}
                    component="label"
                    disabled={disabled}
                >
                    <Child />
                    {menuOptions[ selectedIndex ]}
                </Button>
                <Button
                    classes={{ root: styles.upload_button_arrow }}
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                    disabled={disabled}
                >
                    <ArrowDropDownIcon />
                </Button>
            </ButtonGroup>
            <Popper
                sx={{
                    zIndex: 1,
                }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu" autoFocusItem>
                                    {menuOptions.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            //   disabled={index === 2}
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
}