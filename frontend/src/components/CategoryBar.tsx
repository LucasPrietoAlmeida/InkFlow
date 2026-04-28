import { useNavigate } from "react-router-dom";

type Category = {
    id: string;
    name: string;
    slug: string;
};

type Props = {
    categories: Category[];
    active: string | null;
};

const CategoryBar = ({ categories, active }: Props) => {
    const navigate = useNavigate();

    const handleSelect = (slug: string | null) => {
        if (!slug) {
            navigate("/articles");
        } else {
            navigate(`/category/${slug}`);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                gap: "10px",
                overflowX: "auto",
                padding: "10px 0",
                marginBottom: "20px",
            }}
        >
            {/* ALL */}
            <button
                onClick={() => handleSelect(null)}
                style={{
                    padding: "6px 12px",
                    borderRadius: "999px",
                    border: "1px solid #ddd",
                    background: !active ? "#000" : "transparent",
                    color: !active ? "#fff" : "#333",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                }}
            >
                All
            </button>

            {categories.map((cat) => {
                const isActive = active === cat.slug;

                return (
                    <button
                        key={cat.id}
                        onClick={() => handleSelect(cat.slug)}
                        style={{
                            padding: "6px 12px",
                            borderRadius: "999px",
                            border: "1px solid #ddd",
                            background: isActive ? "#000" : "transparent",
                            color: isActive ? "#fff" : "#333",
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {cat.name}
                    </button>
                );
            })}
        </div>
    );
};

export default CategoryBar;