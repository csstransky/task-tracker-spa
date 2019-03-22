defmodule TaskTrackerWeb.PageController do
  use TaskTrackerWeb, :controller

  def index(conn, _params) do
    tasks = TaskTracker.Tasks.list_tasks()
    |> Enum.map(fn task ->
      TaskTrackerWeb.TaskView.render("task.json", %{task: task})
    end)
    render conn, "index.html", tasks: tasks
  end
end
