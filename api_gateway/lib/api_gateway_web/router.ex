defmodule ApiGatewayWeb.Router do
  use ApiGatewayWeb, :router

  pipeline :api do
    plug(:accepts, ["json"])
  end

  scope "/", ApiGatewayWeb do
    pipe_through(:api)
    get("/", HomeController, :index)
  end

  scope "/api", ApiGatewayWeb do
    pipe_through(:api)

    match(:*, "/*path", ProxyController, :forward)
  end

end
