function CustomLayout({ children }) {
    return (
        <div className="">
            {/* <Header /> */}
            <div className="">
                {/* <Sidebar /> */}
                <div className="">{children}</div>
            </div>
        </div>
    )
}

export default CustomLayout
