defmodule SurfaceRichComponents.Select do
  use Surface.Component

  alias Surface.Components.Form.{FieldContext, HiddenInput}

  @doc "Changeset field name"
  prop name, :atom, required: true

  @doc "Additional input options like `phx_debounce`"
  prop opts, :keyword, default: []

  prop filter, :event, required: true
  prop select, :event, required: true

  slot selected_value, required: true
  slot dropdown, required: true
  slot input, required: true

  prop focus_class, :string
  prop outer_class, :string

  @spec render(any) :: Phoenix.LiveView.Rendered.t()
  def render(assigns) do
    ~F"""
    <div
      id={"rich-select-#{@name}"}
      :hook="SelectHook"
      data-filter-target={@filter.target}
      data-filter-change={@filter.name}
      data-select-target={@select.target}
      data-select-change={@select.name}
      data-focus-class={@focus_class}
    >
      <button type="button" data-toggle-visibility aria-expanded="open" aria-haspopup="listbox" class={@outer_class}>
        <#slot name="selected_value" />
        <#slot name="input" />
      </button>
      <div data-list-container style="display: none;">
        <#slot name="dropdown" />
      </div>
      <div phx-update="ignore">
        <FieldContext name={@name}>
          <HiddenInput opts={ [data_select_name: @name] ++ @opts } />
        </FieldContext>
      </div>
    </div>
    """
  end
end
