import { IconButton, InputAdornment, styled, TextField, typographyClasses } from "@mui/material";
import { PropsWithChildren, useState } from "react";
import styles from "@/styles/components/NeueTextField.module.scss";
import { Visibility, VisibilityOff } from "@mui/icons-material";


type NeueTextFieldProps = {
    label: string,
    helperText?: string,
    onChange?: (val: string) => void
    value?: string
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
        onChange={({target}) => props.onChange ? props.onChange!(target.value) : undefined}
        value={props.value}
        variant="outlined"
        inputProps={{
            className: styles.textfield_input
        }}
        fullWidth
        >
            {props.children}
        </CssTextField>
}

export function NeuePasswordField(props: PropsWithChildren<NeueTextFieldProps>) {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    return <CssTextField
        classes={{ root: styles.textfield}}
        label={props.label}
        helperText={props.helperText}
        onChange={({target}) => props.onChange ? props.onChange!(target.value) : undefined}
        value={props.value}
        variant="outlined"
        InputProps={{
            className: styles.textfield_input,
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>
            )
        }}
        fullWidth
       type={showPassword ? "text" : "password"}
        >
            {props.children}
        </CssTextField>
}