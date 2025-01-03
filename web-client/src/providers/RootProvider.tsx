import { FC, ReactNode } from "react"
import { BrowserRouter as BrowserRouterProvider } from "react-router"
import { Fragment } from "react/jsx-runtime"
import { Provider as ReduxStoreProvider } from "react-redux";
import { store } from "../store";


export const RootProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return (<Fragment>
        <ReduxStoreProvider store={store}>
            <BrowserRouterProvider>
                {children}
            </BrowserRouterProvider>
        </ReduxStoreProvider>
    </Fragment>)
}