defmodule ApiGatewayWeb.ProxyController do
  import Plug.Conn
  use ApiGatewayWeb, :controller
  alias HTTPoison

  # Replace with your actual backend URL
  @load_balancer_url "http://localhost:3000"

  def forward(conn, _params) do
    path = conn.request_path
    method = conn.method

    # Filter out the "host" header
    headers =
      conn.req_headers
      |> Enum.filter(fn {key, _} -> String.downcase(key) != "host" end)

    {:ok, body, _} = Plug.Conn.read_body(conn)

    # Forward the request to the backend service
    case HTTPoison.request(method, "#{@load_balancer_url}#{path}", body, headers) do
      {:ok, %HTTPoison.Response{status_code: status, body: response_body, headers: resp_headers}} ->
        # Log response for debugging (uncomment if needed)
        # IO.inspect(%{status: status, body: response_body, headers: resp_headers}, label: "Backend Response")

        # Ensure the response body is valid JSON or fallback to raw body
        final_response_body =
          case Jason.decode(response_body) do
            {:ok, decoded} -> Jason.encode!(decoded)
            {:error, _} -> response_body
          end

        # Set response headers and send response
        conn
        |> put_resp_headers(resp_headers)
        |> put_resp_content_type("application/json")
        |> send_resp(status, final_response_body)

      {:error, %HTTPoison.Error{reason: reason}} ->
        # Log error for debugging
        IO.inspect(reason, label: "HTTP Error")

        # Respond with error message
        conn
        |> put_status(:bad_gateway)
        |> json(%{error: "Failed to connect to backend", details: inspect(reason)})
    end
  end

  defp put_resp_headers(conn, headers) do
    # Add headers while skipping those that may conflict with the Plug response handling
    Enum.reduce(headers, conn, fn {key, value}, acc ->
      if String.downcase(key) in ["content-type", "content-length", "transfer-encoding"] do
        # Skip conflicting headers
        acc
      else
        put_resp_header(acc, key, value)
      end
    end)
  end
end
