const SelectHook = {
  listContainer: null,
  listElements: [],
  open: false,
  focusedElementIndex: -1,
  mounted() {
    const { filterTarget, filterChange } = this.el.dataset;

    this.listContainer = this.el.querySelector("[data-list-container]");
    this.selectedValue = this.el.querySelector("[data-selected-value]");
    this.input = this.el.querySelector("[data-select-input]");
    this.hidden = this.el.querySelector(`[data-select-name]`);

    this.focusedClasses = this.el.dataset.focusClass.split(" ");

    const button = this.el.querySelector("[data-toggle-visibility]");
    button.addEventListener("click", () => this.showList());

    this.input.addEventListener("keydown", (e) => this.processKeydown(e));
    this.input.addEventListener("input", (event) => {
      this.pushEventTo(filterTarget, filterChange, event.target.value);
      event.preventDefault();
      event.stopPropagation();
    });

    this.listContainer.addEventListener("click", (e) => this.processListClick(e));
    this.gatherDataItems();

    document.addEventListener("click", (e) => {
      const isClickInside = this.el.contains(e.target);
      if (!isClickInside) {
        this.hideList();
      }
    });

    this.hideList();
  },
  updated() {
    this.gatherDataItems();
    this.syncOpen();
  },
  processKeydown(event) {
    this.showList();
    switch (event.key) {
      case "ArrowUp": //UP
        this.selectPrev();
        event.preventDefault();
        event.stopPropagation();
        break;
      case "ArrowDown": //DOWN
        this.selectNext();
        event.preventDefault();
        event.stopPropagation();
        break;
      case "Enter": //DOWN
        this.selectItem(this.listElements[this.focusedElementIndex]);
        event.preventDefault();
        event.stopPropagation();
        return false;
      case "Escape":
        this.hideList();
        break;
    }
  },
  processListClick(event) {
    const itemElement = event.target.closest("[data-select-value]");
    if (itemElement) {
      this.selectItem(itemElement);
    }
  },
  gatherDataItems() {
    this.listElements = this.el.querySelectorAll("[data-select-value]");
    this.focusedElementIndex = -1;
  },
  selectItem(itemElement) {
    if (!itemElement) return;
    const { selectTarget, selectChange } = this.el.dataset;
    if (typeof itemElement.dataset.selectValue !== "undefined" && itemElement.dataset.selectValue !== null) {
      this.hidden.value = itemElement.dataset.selectValue;
      this.hidden.dispatchEvent(new Event("input", { bubbles: true }));
      this.pushEventTo(selectTarget, selectChange, itemElement.dataset.selectValue);
    }
    this.hideList();
  },
  selectPrev() {
    if (this.listElements.length === 0) {
      return;
    }
    if (this.focusedElementIndex > 0) {
      this.listElements[this.focusedElementIndex].classList.remove(...this.focusedClasses);
      this.focusedElementIndex -= 1;
      this.listElements[this.focusedElementIndex].classList.add(...this.focusedClasses);
      this.listElements[this.focusedElementIndex].scrollIntoView({ block: "center" });
    }
  },
  selectNext() {
    if (this.listElements.length === 0) {
      return;
    }
    if (this.focusedElementIndex < this.listElements.length - 1) {
      if (this.focusedElementIndex >= 0) {
        this.listElements[this.focusedElementIndex].classList.remove(...this.focusedClasses);
      }
      this.focusedElementIndex += 1;
      this.listElements[this.focusedElementIndex].classList.add(...this.focusedClasses);
      this.listElements[this.focusedElementIndex].scrollIntoView({ block: "center" });
    }
  },
  showList() {
    this.open = true;
    this.listContainer.style.display = "block";
    this.input.style.display = "block";
    this.selectedValue.style.display = "none";
    this.input.focus();
  },
  hideList() {
    this.open = false;
    if (this.focusedElementIndex >= 0) {
      this.listElements[this.focusedElementIndex].classList.remove(...this.focusedClasses);
    }
    this.focusedElementIndex = -1;
    this.listContainer.style.display = "none";
    this.input.style.display = "none";
    this.selectedValue.style.display = "block";
  },
  toggleList() {
    if (this.open) {
      this.hideList();
    } else {
      this.showList();
    }
  },
  syncOpen() {
    if (this.open) {
      this.showList();
    } else {
      this.hideList();
    }
  },
};

export { SelectHook };
