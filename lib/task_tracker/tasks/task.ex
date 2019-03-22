defmodule TaskTracker.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset

  alias Decimal


  schema "tasks" do
    field :complete, :boolean, default: false
    field :desc, :string
    field :time, :decimal
    field :title, :string
    belongs_to :user, TaskTracker.Users.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> precast(attrs)
    |> cast(attrs, [:title, :desc, :time, :complete, :user_id])
    |> validate_required([:title, :time, :complete])
    |> validate_positive_time(:time)
  end

  # Javscript is super annoying, and I have to change %{"complete" => false}
  # into %{complete: false} here
  def precast(task, attrs) do
    task
    |> Map.put(:complete, attrs["complete"])
    |> Map.put(:desc, attrs["desc"])
    |> Map.put(:time, attrs["time"])
    |> Map.put(:title, attrs["title"])
    |> Map.put(:user_id, attrs["user_id"])
  end

  def validate_positive_time(changeset, field) do
    validate_change(changeset, field, fn _, time ->
      if Decimal.cmp(time, 0) == :lt do
          [{field, "must be positive"}]
        else
          []
        end
    end)
  end
end
