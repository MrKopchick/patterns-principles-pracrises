import { Card } from "./models/card";
import { List } from "./models/list";

import { Card } from "./models/card";
import { List } from "./models/list";

export const lists: List[] = (() => {
  const toDo = new List("Backlog");
  toDo.cards = [
    new Card("Implement list renaming functionality", "..."),
    new Card("Implement card creation feature", "...")
  ];
  const inProgress = new List("Development");
  inProgress.cards = [
    new Card("Implement list creation functionality", "...")
  ];
  return [toDo, inProgress];
})();


class Database {
  private static instance: Database | null = null;

  private data: List[];

  private constructor() {
    this.data = [];
  }

  public static get Instance(): Database {
    if (!this.instance) {
      this.instance = new Database();
    }

    return this.instance;
  }

  public setData(data: List[]): void {
    this.data = data;
  }

  public getData(): List[] {
    return this.data;
  }
}

export { Database };
