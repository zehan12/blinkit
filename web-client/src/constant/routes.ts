const ROUTE = {
    HOME: "/home",
} as const;

export type Route = (typeof ROUTE)[keyof typeof ROUTE];

export default ROUTE;
