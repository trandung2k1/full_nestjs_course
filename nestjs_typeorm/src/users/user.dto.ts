export class UseLoginDto {
  public readonly email: string;
  public readonly password: string;
}
export class UseRegisterDto extends UseLoginDto {
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly age: number;
}
