const AuthLayout = ({children}:{children:React.ReactNode}) => {
    return (
        <div className="bg-slate-50 flex justify-center items-center h-screen">{children}</div>
    )
}

export default AuthLayout