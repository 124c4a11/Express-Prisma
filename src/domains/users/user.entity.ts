export class UserEntity {
  constructor(
    private readonly _name: string,
    private readonly _email: string,
    private readonly _successorId?: number,
  ) {}

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get successorId(): number | undefined {
    return this._successorId;
  }
}
