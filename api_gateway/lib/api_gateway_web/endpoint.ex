defmodule ApiGatewayWeb.Endpoint do
  use Phoenix.Endpoint, otp_app: :api_gateway

  plug ApiGatewayWeb.Router

  def handle_errors(conn, %{kind: _kind, reason: _reason, stack: _stack}) do
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(500, Jason.encode!(%{error: "Internal server error"}))
  end
end
