defmodule ApiGatewayWeb.HomeController do
  use ApiGatewayWeb, :controller

  def index(conn, _params) do
    response = :api_gateway_is_working
    json(conn, response)
  end
end
