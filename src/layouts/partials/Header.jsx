import { Link } from "react-router-dom";
import { define } from "~/routes";

function Header() {
    return (
        <nav className="my-2">
            {Object.entries(define).map(([key, value]) => (
                <Link to={value} className="border border-black mx-2" key={key}>
                    {key}
                </Link>
            ))}
        </nav>
    );
}

export default Header;
