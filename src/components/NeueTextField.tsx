import { styled, TextField, typographyClasses } from "@mui/material";
import { PropsWithChildren } from "react";
import styles from "@/styles/components/NeueTextField.module.scss";


type NeueTextFieldProps = {
    label: string,
    helperText?: string,
    onChange?: () => void
};

const TEXTFIELD_COLOR = "#333d29";

const CssTextField = styled(TextField)({
    '& .MuiInput-underline:before': { borderBottomColor: TEXTFIELD_COLOR },
    '& .MuiInput-underline:after': { borderBottomColor: TEXTFIELD_COLOR },
    '& .MuiInput-underline:hover:before': { borderBottomColor: TEXTFIELD_COLOR },
    '& label.Mui-focused': { color: TEXTFIELD_COLOR },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
        borderColor: TEXTFIELD_COLOR,
        },
        '&:hover fieldset': {
        borderColor: TEXTFIELD_COLOR,
        },
        '&.Mui-focused fieldset': {
        borderColor: TEXTFIELD_COLOR,
        },
    },
    // '& .MuiInput-underline:hover': {
    //     borderBottomColor: 'red',
    // },
});

export function NeueTextField(props: PropsWithChildren<NeueTextFieldProps>) {
    return <CssTextField
        classes={{ root: styles.textfield}}
        label={props.label}
        helperText={props.helperText}
        onChange={props.onChange}
        variant="outlined"
        inputProps={{
            className: styles.textfield_input
        }}
        >
            {props.children}
        </CssTextField>
}