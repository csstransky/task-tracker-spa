defmodule TaskTrackerWeb.TaskView do
  use TaskTrackerWeb, :view
  alias TaskTrackerWeb.TaskView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      complete: task.complete,
      desc: task.desc,
      time: task.time,
      title: task.title,
      user_id: task.user_id,
      user_name: TaskTracker.Users.get_user(task.user_id).name,}
  end
end
