import type { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div
        style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "20px",
        }}
        >
        {children}
        </div>
    );
};

export default Layout;