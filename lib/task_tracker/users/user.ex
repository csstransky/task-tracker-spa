defmodule TaskTracker.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :admin, :boolean, default: false
    field :name, :string
    field :password_hash, :string
    has_many :cart_items, TaskTracker.CartItems.CartItem

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :password_hash, :admin])
    |> validate_required([:name, :password_hash, :admin])
    |> unique_constraint(:name)
  end
end
