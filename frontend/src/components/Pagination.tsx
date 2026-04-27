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
                marginTop: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
            }}
        >
            <button disabled={page === 1} onClick={onPrev}>
                ← Anterior
            </button>

            <span>
                Página {page} de {pages}
            </span>

            <button disabled={page === pages} onClick={onNext}>
                Siguiente →
            </button>
        </div>
    );
};

export default Pagination;