defmodule SurfaceRichComponents.SearchSelect do
  use Surface.Component

  alias Surface.Components.Form.{FieldContext, HiddenInput}

  @doc "Changeset field name"
  prop name, :atom, required: true

  @doc "Additional input options like `phx_debounce`"
  prop opts, :keyword, default: []

  @doc "Triggered when `Search Input` is updated"
  prop filter, :event, required: true

  @doc "Triggered when the value is selected."
  prop select, :event, required: true

  @doc """
  **Search Input.**
  The `search` slot is shown when user clicks on element or presses Enter.
  It triggers `filter` event every time the Input is updated.
  It is hidden when value is selected.
  """
  slot search, required: true

  @doc """
  **Selected Value.** When value is selected it shown in the slot. It is hidden while *Search Input* and *Dropdown* are visible.
  """
  slot selected_value, required: true

  @doc """
  **Dropdown.** Appears when user click or press Enter on the component. Contains list of selectable elements.
  """
  slot dropdown, required: true

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
      <div data-toggle-visibility aria-expanded="open" aria-haspopup="listbox" class={@outer_class}>
        <#slot name="selected_value" />
        <div phx-update="ignore">
          <#slot name="search" />
        </div>
      </div>
      <div data-list-container style="display: none;">
        <#slot name="dropdown" />
      </div>
      <div phx-update="ignore">
        <FieldContext name={@name}>
          <HiddenInput opts={[data_select_name: @name] ++ @opts} />
        </FieldContext>
      </div>
    </div>
    """
  end
end
