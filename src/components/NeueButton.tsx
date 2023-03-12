import { Button } from "@mui/material";
import { PropsWithChildren } from "react";
import styles from "@/styles/NeueButton.module.scss";

type NeueButtonProps = {
    onClick?: () => void
};

export function NeueButton(props: PropsWithChildren<NeueButtonProps>) {
    return <Button
            classes={{ root: styles.main }}
            variant="contained"
            onClick={props.onClick}
        >{props.children}</Button>
}