# SurfaceRichComponents

Collection of headless JS components for [SurfaceUI](https://surface-ui.org/)

Usage Examples with Tailwind CSS: https://github.com/arkadiyk/rich_components_demo

Demo: https://rich-components-demo.gigalixirapp.com/


### Motivation

Main reason I was going for SPA is availability of JavaScript components for Selects, TextEditors, Date and Time pickers, which are hard to implement for server side rendering without hacks.
This project is trying fill this gap.

## Installation

**Not available on Hex yet as the project is WIP

```elixir
def deps do
  [
    {:surface_rich_components, git: "https://github.com/arkadiyk/surface_rich_components.git", branch: "main"}
  ]
end
```

## Components

### Rich Text Editor
  Wrapper around [tiptap editor](https://www.tiptap.dev/)

  **NOTE: You need to install `@tiptap/core` and `@tiptap/starter-kit` JS packages

  To control the editor you need to create a toolbar section somewhere on your page.

  The section's `data-editor-toolbar` attribute value should be the same as the `name` attribute of the editor.

  Buttons inside the toolbar should have `data-editor-control` which value represent editor control.

  **TODO: at this moment only `bold`, `italic`, and `h1` are implemented. More is coming shortly

  Example using with tailwindcss:

  ```
  <div class="border border-gray-300 p-3 pt-2
      w-full mt-1 border-gray-300 rounded-lg shadow-sm bg-white
      focus-within:border-primary-300 focus-within:ring focus-within:ring-primary-200 focus-within:ring-opacity-50
    ">

    <TextEditor name="article" class="h-20 focus:outline-none prose overflow-y-auto"
        btn_active_class="bg-gray-100 text-red-600"
        opts={phx_debounce: "1000"}/>

    {!-- Toolbar --}
    <div data-editor-toolbar="article" class="divide-x divide-gray-200 opacity-100">
      <button type="button" class="hover:bg-gray-100 rounded-md p-2" data-editor-control="bold">
        <span class="w-3 h-3">B</span>
      </button>
      <button type="button" class="hover:bg-gray-100 rounded-md p-2" data-editor-control="italic">
        <span class="w-3 h-3">I</span>
      </button>
    </div>

  </div>

  ```

### SearchSelect

 The component provides JavaScript interactivity for server side rendered Select elements.
 There are 3 required slots which represent
 - `search` - **Search Input.** The slot is shown when user clicks on element or presses Enter. It triggers `filter` event every time the Input is updated. It is hidden when value is selected.
 - `selected_value` - **Selected Value.** When value is selected it shown in the slot. It is hidden while *Search Input* and *Dropdown* are visible.
 - `dropdown` - **Dropdown.** Appears when user click or press Enter on the component. Contains list of selectable elements.

Each rendered slot has `"data-"` elements which are used to attach JavaScript events.

- `data-select-input`  - Tags the `input` element inside the `search` slot.
- `data-selected-value` - Tags an enclosing element for Selected Value.
- `data-clear` - Tags an element click on which removes the selection
- `data-select-value={value}` - Tags elements which contains selectable values in the `dropdown` slot. It will respond on _ArrowUp_, _ArrowDown_, _Enter_, and _Click_ events.

The use-case for this component is to be base for Application Level SearchSelect Component which will contain styling and logic to render `dropdown` and `selected_value`

Here is an example of this kind of component: https://github.com/arkadiyk/rich_components_demo/blob/master/lib/rich_components_demo_web/live/components/select_sector.ex



