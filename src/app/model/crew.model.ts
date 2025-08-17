import { Member } from './member.model';

export class Crew {
  public id!: number;
  public memberMax!: number;
  public name!: string;
  public ship!: string;
  public members: Member[] = [];

  constructor() {}

  set membersMax(value: number) {
    this.memberMax = value;
  }

  addMembers(member: Member) {
    if (this.members.length < this.memberMax) {
      this.members.push(member);
    } else {
      throw new Error('Il ne peut pas y avoir plus de membre, il faut augmenter le nombre');
    }
  }
}
