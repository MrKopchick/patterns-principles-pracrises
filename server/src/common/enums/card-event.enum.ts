const CardEvent = {
  CREATE: "card:create",
  REORDER: "card:reorder",
  DELETE: "card:delete",
  RENAME: "card:rename",
  CHANGE_DESCRIPTION: "card:changeDescription",
  DUPLICATE: "card:duplicate",
} as const;

export { CardEvent };
