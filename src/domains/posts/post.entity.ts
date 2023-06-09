export class PostEntity {
  constructor(private readonly _title: string, private readonly _authorId: number[]) {}

  get title(): string {
    return this._title;
  }

  get authorIds(): number[] {
    return this._authorId;
  }
}
