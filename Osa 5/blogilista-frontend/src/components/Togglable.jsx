import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'


const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }


    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible} className='togglableContent'>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>{props.cancelLabel ?? 'Cancel'}</button>
            </div>
        </div>
    )

})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    cancelLabel: PropTypes.string
}
Togglable.displayName = 'Togglable'

export default Togglable