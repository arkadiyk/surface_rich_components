import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";

const TextEditor = {
  editor: null,
  content: null,
  autofocus: true,
  buttonSetup: {
    bold: { run: (editor) => editor.chain().focus().toggleBold().run(), check: (editor) => editor.isActive("bold") },
    italic: { run: (editor) => editor.chain().focus().toggleItalic().run(), check: (editor) => editor.isActive("italic") },
    h1: {
      run: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      check: (editor) => editor.isActive("heading", { level: 1 }),
    },
  },

  classes() {
    return this.el.dataset.class;
  },
  mounted() {
    const editorElement = this.el.querySelector("[data-editor]");
    this.setupButtonEvents(editorElement);
    this.setupEditor(editorElement);
  },
  destroyed() {
    console.log("destroyed!!!", this.editor);
  },
  setupButtonEvents(editorElement) {
    const controlPanel = document.querySelector(`[data-editor-toolbar="${editorElement.dataset.editor}"]`);
    this.controlButtons = controlPanel.querySelectorAll("[data-editor-control]");
    this.btnActiveClass = this.el.dataset.btnActiveClass;
    
    const onEditorControlClick = (event) => {
      const config = this.buttonSetup[event.currentTarget.dataset.editorControl];
      if (config && typeof config.run === "function") {
        config.run(this.editor);
      }
    }
    this.controlButtons.forEach((btn) => {
      btn.addEventListener("click", onEditorControlClick);
    });
  },
  setupEditor(editorElement) {
    const hidden = this.el.querySelector(`[data-name='${editorElement.dataset.editor}']`);

    this.editor = new Editor({
      element: editorElement,
      extensions: [StarterKit],
      onUpdate: ({ editor }) => {
        this.content = editor.getHTML();
        hidden.value = this.content;
        hidden.dispatchEvent(new Event("input", { bubbles: true }));
      },
      content: hidden.value,
      editorProps: {
        attributes: {
          class: this.classes(),
        },
      },
      onTransaction: ({ editor }) => {
        const activeClasses = this.btnActiveClass.split(" ");
        this.controlButtons.forEach((btn) => {
          const config = this.buttonSetup[btn.dataset.editorControl];
          if (config && typeof config.check === "function") {
            if (config.check(editor)) {
              btn.classList.add(...activeClasses);
            } else {
              btn.classList.remove(...activeClasses);
            }
          }
        });
      },
      onFocus: () => {
        hidden.dispatchEvent(new Event("focus", { bubbles: true }));
      },
      onBlur: () => {
        hidden.dispatchEvent(new Event("blur", { bubbles: true }));
      },
    });
  },
};

export { TextEditor };
