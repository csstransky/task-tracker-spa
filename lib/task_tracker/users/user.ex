defmodule TaskTracker.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :admin, :boolean, default: false
    field :name, :string
    field :password_hash, :string

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> precast(attrs)
    |> cast(attrs, [:name, :password_hash, :admin])
    |> validate_required([:name, :password_hash, :admin])
    |> unique_constraint(:name)
  end

  # Javscript is super annoying, and I have to change %{"complete" => false}
  # into %{complete: false} here
  def precast(task, attrs) do
    task
    |> Map.put(:name, attrs["name"])
    |> Map.put(:password_hash, attrs["password_hash"])
  end
end
