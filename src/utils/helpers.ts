export const sortData = (data: any[], field: string, isDate?: boolean) => {
  return data.sort((item_a: any, item_b: any) => {
    if (isDate) {
      const dateA = new Date(item_a[field]);
      const dateB = new Date(item_b[field]);
      return dateB.getTime() - dateA.getTime();
    }

    if (
      typeof item_a[field] === "boolean" &&
      typeof item_b[field] === "boolean"
    ) {
      return Number(item_a[field]) - Number(item_b[field]);
    }

    if (
      typeof item_a[field] === "string" &&
      typeof item_b[field] === "string"
    ) {
      return item_a[field].localeCompare(item_b[field]);
    }

    return item_a[field] - item_b[field];
  });
};

export const moveCaretToEnd = (element: HTMLDivElement) => {
  element.focus();

  const range = document.createRange();
  const selection = window.getSelection();

  range.selectNodeContents(element);
  range.collapse(false);
  selection?.removeAllRanges();
  selection?.addRange(range);
};
