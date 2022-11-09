import { Input } from '../input'
import eyeOff from '../../images/eye-off.svg'
import eye from '../../images/eye.svg'
import { useState } from 'react'

const EyeOff = (props) => <img src={eyeOff} alt="eye-off" onClick={props.onClick} />
const Eye = (props) => <img src={eye} alt="eye-off" onClick={props.onClick} />

export const PasswordInput = ({ type, ...props }) => {
    const [isVisible, setVisible] = useState(false)

    return (
        <Input
            {...props}
            type={isVisible ? 'text' : 'password'}
            icon={isVisible ? EyeOff : Eye}
            onIconClick={() => setVisible(!isVisible)}
        />
    )
}
