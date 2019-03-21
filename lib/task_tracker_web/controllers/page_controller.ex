defmodule TaskTrackerWeb.PageController do
  use TaskTrackerWeb, :controller

  def index(conn, _params) do
    products = TaskTracker.Products.list_products()
    |> Enum.map(fn prod ->
      TaskTrackerWeb.ProductView.render("product.json", %{product: prod})
    end)
    render conn, "index.html", products: products
  end
end
