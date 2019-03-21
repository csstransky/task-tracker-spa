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
    |> cast(attrs, [:title, :desc, :time, :complete, :user_id])
    |> validate_required([:title, :time, :complete, :user_id])
    |> validate_positive_time(:time)
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
