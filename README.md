# SurfaceRichComponents

Collection of headless JS components for [SurfaceUI](https://surface-ui.org/)

## Installation

**Not available on Hex yet as the project is WIP

Clone the Repo, point your `mix.ex` to the cloned repo:

```elixir
def deps do
  [
    {:surface_rich_components, path: "<path to the repo>"}
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

### Select

**TODO: not implemented yet

