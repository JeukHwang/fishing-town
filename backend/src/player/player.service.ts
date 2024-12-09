import { Injectable } from "@nestjs/common";

type Position = { x: number; y: number };

@Injectable()
export class PlayerService {
  //   // Fishing
  //   private async getFishingData(): Promise<JSON> {
  //     return {};
  //   }
  //   private async canUseShip(position: Position): Promise<boolean>;
  //   private async useShip(position: Position) {}
  //   // Ship
  //   private async canBuyShip(amount: number): Promise<boolean>;
  //   private async buyShip(amount: number) {}
  //   private async canSellShip(amount: number): Promise<boolean>;
  //   private async sellShip(amount: number) {}
  //   // Town
  //   private async canMoveToTown(townName: string): Promise<boolean>;
  //   private async moveTown(townName: string) {}
  //   // Group
  //   private async useFormGroup(content: JSON): Promise<boolean>;
  //   private async formGroup(content: JSON) {}
  //   private async canDisbandGroup(groupId: string): Promise<boolean>;
  //   private async disbandGroup(groupId: string) {}
  //   private async canJoinGroup(groupId: string): Promise<boolean>;
  //   private async joinGroup(groupId: string) {}
  //   private async canLeaveGroup(groupId: string): Promise<boolean>;
  //   private async leaveGroup(groupId: string) {}
  //   // Rule
  //   private async canCreateRule(content: JSON): Promise<boolean>;
  //   private async createProposal(content: JSON) {}
  //   private async canDeleteRule(proposalId: string): Promise<boolean>;
  //   private async deleteProposal(proposalId: string) {}
  //   private async canVoteProposal(
  //     proposalId: string,
  //     vote: boolean
  //   ): Promise<boolean>;
  //   private async voteProposal(proposalId: string, vote: boolean) {}
  //   // Message
  //   private async sendMessage(receiver: string, content: JSON): Promise<boolean> {
  //   }
}
