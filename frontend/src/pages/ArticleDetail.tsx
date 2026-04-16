import { useParams } from "react-router-dom";

const ArticleDetail = () => {
    const { slug } = useParams();

    return <h1>Article: {slug}</h1>;
};

export default ArticleDetail;