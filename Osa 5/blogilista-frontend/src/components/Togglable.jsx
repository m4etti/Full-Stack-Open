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
        <div id={props.id}>
            <div style={hideWhenVisible} className='togglableContent'>
                <button id={'openButton'} onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button id={'closeButton'} onClick={toggleVisibility}>{props.cancelLabel ?? 'Cancel'}</button>
            </div>
        </div>
    )

})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    cancelLabel: PropTypes.string,
    id: PropTypes.string.isRequired
}
Togglable.displayName = 'Togglable'

export default Togglable