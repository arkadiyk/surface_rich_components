defmodule SurfaceRichComponents.MixProject do
  use Mix.Project

  def project do
    [
      app: :surface_rich_components,
      version: "0.2.0",
      elixir: "~> 1.12",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger]
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:ex_doc, ">= 0.0.0", only: :dev, runtime: false},
      {:surface_formatter, "~> 0.5.0", only: :dev},
      {:surface, ">= 0.5.0"}
    ]
  end
end
