defmodule TaskTracker.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string, null: false
      add :password_hash, :string, null: false
      add :admin, :boolean, default: false, null: false

      timestamps()
    end

    create index(:users, [:name], unique: true)
  end
end
