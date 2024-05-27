import { useState } from "react"
import { useAuth } from "~/context/AuthProvider";
import { getEnvVar } from "~/utils/env";

function Login() {

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: getEnvVar('VITE_ENV') == 'development' && getEnvVar('VITE_USERNAME_DEMO') || "",
        password: getEnvVar('VITE_ENV') == 'development' && getEnvVar('VITE_PASSWORD_DEMO') || ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const auth = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) {
            return
        }

        setIsLoading(true);

        try {
            if (formData.username !== "" && formData.password !== "") {
                auth.loginUser(formData);
                return;
            }
            alert("pleae provide a valid input");
        }
        catch (error) {
        }
        finally {
            setIsLoading(false)
        }

    };
    return (
        <div className="flex h-screen">
            <div className="m-auto border border-black p-5">
                <form className="">
                    <div className="my-2">
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="border border-black">
                        </input>
                    </div>
                    
                    <div className="my-2">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="border border-black">
                        </input>
                    </div>

                    <div className="flex">
                        <button type="submit" className="mx-auto border border-black" onClick={handleSubmit}>
                            Login
                        </button>
                    </div>
                    <br />
                    {isLoading ? "loadding..." : ""}
                </form>
            </div>
        </div>
    )
}

export default Login