defmodule TaskTrackerWeb.AuthController do
  use TaskTrackerWeb, :controller

  alias TaskTracker.Users
  alias TaskTracker.Users.User

  action_fallback TaskTrackerWeb.FallbackController

  def authenticate(conn, %{"name" => name, "password" => password}) do
    with {:ok, %User{} = user} <- Users.authenticate_user(name, password) do
      resp = %{
        data: %{
          token: Phoenix.Token.sign(TaskTrackerWeb.Endpoint, "user_id", user.id),
          user_id: user.id,
          user_name: Users.id_to_name(user.id),
        }
      }

      conn
      |> put_resp_header("content-type", "application/json; charset=UTF-8")
      |> send_resp(:created, Jason.encode!(resp))
    end
  end
end
