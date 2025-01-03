import { FC, ReactNode } from "react"
import { BrowserRouter as Router } from "react-router"
import { Fragment } from "react/jsx-runtime"

export const RootProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return (<Fragment>
        <Router>
            {children}
        </Router>
    </Fragment>)
}