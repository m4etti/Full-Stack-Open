const Notification = ({ message }) => {
    const styleBase = {
        background: '#333333',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginTop: 10
    }
    const styleSuccess = {
        ...styleBase,
        color: 'green',
        borderColor: 'green',
    }
    const styleError = {
        ...styleBase,
        color: 'red',
        borderColor: 'red',

    }
    const styles = {
        success: styleSuccess,
        error: styleError
    }
    return (
        <div style={styles[message.type]}>
            {message.text}
        </div>
    )
}

export default Notification