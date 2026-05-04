type PaginationProps = {
    page: number;
    pages: number;
    onPrev: () => void;
    onNext: () => void;
};

const Pagination = ({
    page,
    pages,
    onPrev,
    onNext,
}: PaginationProps) => {
    if (pages <= 1) return null;

    return (
        <div
            style={{
                marginTop: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "16px",
            }}
        >
            <button
                onClick={onPrev}
                disabled={page === 1}
                style={{
                    padding: "8px 14px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    background: page === 1 ? "#f5f5f5" : "white",
                    color: page === 1 ? "#aaa" : "#333",
                    cursor: page === 1 ? "not-allowed" : "pointer",
                    transition: "0.2s",
                }}
                onMouseOver={(e) => {
                    if (page !== 1) {
                        e.currentTarget.style.background = "#f0f0f0";
                    }
                }}
                onMouseOut={(e) => {
                    if (page !== 1) {
                        e.currentTarget.style.background = "white";
                    }
                }}
            >
                ← Anterior
            </button>

            <div
                style={{
                    padding: "6px 12px",
                    borderRadius: "999px",
                    background: "#111",
                    color: "white",
                    fontSize: "14px",
                    minWidth: "90px",
                    textAlign: "center",
                }}
            >
                {page} / {pages}
            </div>

            <button
                onClick={onNext}
                disabled={page === pages}
                style={{
                    padding: "8px 14px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    background: page === pages ? "#f5f5f5" : "white",
                    color: page === pages ? "#aaa" : "#333",
                    cursor: page === pages ? "not-allowed" : "pointer",
                    transition: "0.2s",
                }}
                onMouseOver={(e) => {
                    if (page !== pages) {
                        e.currentTarget.style.background = "#f0f0f0";
                    }
                }}
                onMouseOut={(e) => {
                    if (page !== pages) {
                        e.currentTarget.style.background = "white";
                    }
                }}
            >
                Siguiente →
            </button>
        </div>
    );
};

export default Pagination;