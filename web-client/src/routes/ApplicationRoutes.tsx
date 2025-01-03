import { Route, Routes } from "react-router";

/**
 * 
    <Routes>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />

        <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
        </Route>

        <Route path="concerts">
            <Route index element={<ConcertsHome />} />
            <Route path=":city" element={<City />} />
            <Route path="trending" element={<Trending />} />
        </Route>
    </Routes>
 * 
 */

export const ApplicationRoutes = () => {
    /**
     *
     *  here are the initial routes that we'll need in our system.
     *
     */
    return (
        <>
            <Routes>
                <Route index element={<>home</>} />
            </Routes>
        </>
    );
};