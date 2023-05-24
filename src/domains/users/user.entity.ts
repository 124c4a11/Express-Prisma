export class UserEntity {
  constructor(
    private readonly _name: string,
    private readonly _email: string,
    private readonly _followedByIDs?: number[],
  ) {}

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get followedByIDs(): number[] | undefined {
    return this._followedByIDs;
  }
}
