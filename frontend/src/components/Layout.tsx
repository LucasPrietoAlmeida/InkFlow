import type { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div
        style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "32px 20px",
        }}
        >
        {children}
        </div>
    );
};

export default Layout;