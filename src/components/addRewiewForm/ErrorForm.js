import { useEffect } from "react";
import { useState } from "react";

const ErrorForm = ({valueInp}) => {
    const [colorMessage, setColorMessage] = useState(false)

    useEffect(() => {
        if (valueInp.length < 3) {
            setColorMessage(true)
        } else {
            setColorMessage(false)
        }
    }, [valueInp])

    return (
        <div className="error__message" style={{color: colorMessage ? '#EF4444' : 'transparent'}}>Введите больше 3 символов</div>
    );
};

export default ErrorForm;