import type { ReactNode } from "react";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div
        style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "20px",
        }}
        >
            <Navbar></Navbar>
        {children}
        </div>
    );
};

export default Layout;