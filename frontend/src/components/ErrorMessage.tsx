type Props = {
    message: string;
};

const ErrorMessage = ({ message }: Props) => {
    return (
        <div
        style={{
            backgroundColor: "#ffe5e5",
            color: "#b00020",
            padding: "10px",
            borderRadius: "6px",
            marginBottom: "10px",
        }}
        >
        {message}
        </div>
    );
};

export default ErrorMessage;