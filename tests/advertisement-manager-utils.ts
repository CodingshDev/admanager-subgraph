import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  AchievementUnlocked,
  AdvertisementDeactivated,
  EngagementRecorded,
  EngagementRewardMinted,
  LevelUp,
  NewAdvertisement,
  NewChiefOfAdvertising,
  NewCommunityChallenge,
  NewReferral,
  Paused,
  ReferralRewardDistributed,
  ReputationUpdated,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  SpecialEventStarted,
  Unpaused,
  WeeklyBonusMinted,
  WithdrawCompleted
} from "../generated/AdvertisementManager/AdvertisementManager"

export function createAchievementUnlockedEvent(
  user: Address,
  achievementId: BigInt,
  name: string
): AchievementUnlocked {
  let achievementUnlockedEvent = changetype<AchievementUnlocked>(newMockEvent())

  achievementUnlockedEvent.parameters = new Array()

  achievementUnlockedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  achievementUnlockedEvent.parameters.push(
    new ethereum.EventParam(
      "achievementId",
      ethereum.Value.fromUnsignedBigInt(achievementId)
    )
  )
  achievementUnlockedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )

  return achievementUnlockedEvent
}

export function createAdvertisementDeactivatedEvent(
  adIndex: BigInt
): AdvertisementDeactivated {
  let advertisementDeactivatedEvent = changetype<AdvertisementDeactivated>(
    newMockEvent()
  )

  advertisementDeactivatedEvent.parameters = new Array()

  advertisementDeactivatedEvent.parameters.push(
    new ethereum.EventParam(
      "adIndex",
      ethereum.Value.fromUnsignedBigInt(adIndex)
    )
  )

  return advertisementDeactivatedEvent
}

export function createEngagementRecordedEvent(
  adIndex: BigInt,
  user: Address,
  timestamp: BigInt
): EngagementRecorded {
  let engagementRecordedEvent = changetype<EngagementRecorded>(newMockEvent())

  engagementRecordedEvent.parameters = new Array()

  engagementRecordedEvent.parameters.push(
    new ethereum.EventParam(
      "adIndex",
      ethereum.Value.fromUnsignedBigInt(adIndex)
    )
  )
  engagementRecordedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  engagementRecordedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return engagementRecordedEvent
}

export function createEngagementRewardMintedEvent(
  user: Address,
  amount: BigInt
): EngagementRewardMinted {
  let engagementRewardMintedEvent = changetype<EngagementRewardMinted>(
    newMockEvent()
  )

  engagementRewardMintedEvent.parameters = new Array()

  engagementRewardMintedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  engagementRewardMintedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return engagementRewardMintedEvent
}

export function createLevelUpEvent(user: Address, newLevel: BigInt): LevelUp {
  let levelUpEvent = changetype<LevelUp>(newMockEvent())

  levelUpEvent.parameters = new Array()

  levelUpEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  levelUpEvent.parameters.push(
    new ethereum.EventParam(
      "newLevel",
      ethereum.Value.fromUnsignedBigInt(newLevel)
    )
  )

  return levelUpEvent
}

export function createNewAdvertisementEvent(
  link: string,
  imageUrl: string,
  price: BigInt,
  advertiser: Address,
  referrer: Address
): NewAdvertisement {
  let newAdvertisementEvent = changetype<NewAdvertisement>(newMockEvent())

  newAdvertisementEvent.parameters = new Array()

  newAdvertisementEvent.parameters.push(
    new ethereum.EventParam("link", ethereum.Value.fromString(link))
  )
  newAdvertisementEvent.parameters.push(
    new ethereum.EventParam("imageUrl", ethereum.Value.fromString(imageUrl))
  )
  newAdvertisementEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  newAdvertisementEvent.parameters.push(
    new ethereum.EventParam(
      "advertiser",
      ethereum.Value.fromAddress(advertiser)
    )
  )
  newAdvertisementEvent.parameters.push(
    new ethereum.EventParam("referrer", ethereum.Value.fromAddress(referrer))
  )

  return newAdvertisementEvent
}

export function createNewChiefOfAdvertisingEvent(
  newChief: Address,
  tokenBalance: BigInt,
  referralLevel: BigInt
): NewChiefOfAdvertising {
  let newChiefOfAdvertisingEvent = changetype<NewChiefOfAdvertising>(
    newMockEvent()
  )

  newChiefOfAdvertisingEvent.parameters = new Array()

  newChiefOfAdvertisingEvent.parameters.push(
    new ethereum.EventParam("newChief", ethereum.Value.fromAddress(newChief))
  )
  newChiefOfAdvertisingEvent.parameters.push(
    new ethereum.EventParam(
      "tokenBalance",
      ethereum.Value.fromUnsignedBigInt(tokenBalance)
    )
  )
  newChiefOfAdvertisingEvent.parameters.push(
    new ethereum.EventParam(
      "referralLevel",
      ethereum.Value.fromUnsignedBigInt(referralLevel)
    )
  )

  return newChiefOfAdvertisingEvent
}

export function createNewCommunityChallengeEvent(
  description: string,
  goal: BigInt,
  reward: BigInt,
  deadline: BigInt
): NewCommunityChallenge {
  let newCommunityChallengeEvent = changetype<NewCommunityChallenge>(
    newMockEvent()
  )

  newCommunityChallengeEvent.parameters = new Array()

  newCommunityChallengeEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  newCommunityChallengeEvent.parameters.push(
    new ethereum.EventParam("goal", ethereum.Value.fromUnsignedBigInt(goal))
  )
  newCommunityChallengeEvent.parameters.push(
    new ethereum.EventParam("reward", ethereum.Value.fromUnsignedBigInt(reward))
  )
  newCommunityChallengeEvent.parameters.push(
    new ethereum.EventParam(
      "deadline",
      ethereum.Value.fromUnsignedBigInt(deadline)
    )
  )

  return newCommunityChallengeEvent
}

export function createNewReferralEvent(
  referred: Address,
  referrer: Address
): NewReferral {
  let newReferralEvent = changetype<NewReferral>(newMockEvent())

  newReferralEvent.parameters = new Array()

  newReferralEvent.parameters.push(
    new ethereum.EventParam("referred", ethereum.Value.fromAddress(referred))
  )
  newReferralEvent.parameters.push(
    new ethereum.EventParam("referrer", ethereum.Value.fromAddress(referrer))
  )

  return newReferralEvent
}

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return pausedEvent
}

export function createReferralRewardDistributedEvent(
  referrer: Address,
  reward: BigInt,
  level: BigInt
): ReferralRewardDistributed {
  let referralRewardDistributedEvent = changetype<ReferralRewardDistributed>(
    newMockEvent()
  )

  referralRewardDistributedEvent.parameters = new Array()

  referralRewardDistributedEvent.parameters.push(
    new ethereum.EventParam("referrer", ethereum.Value.fromAddress(referrer))
  )
  referralRewardDistributedEvent.parameters.push(
    new ethereum.EventParam("reward", ethereum.Value.fromUnsignedBigInt(reward))
  )
  referralRewardDistributedEvent.parameters.push(
    new ethereum.EventParam("level", ethereum.Value.fromUnsignedBigInt(level))
  )

  return referralRewardDistributedEvent
}

export function createReputationUpdatedEvent(
  user: Address,
  newReputation: BigInt
): ReputationUpdated {
  let reputationUpdatedEvent = changetype<ReputationUpdated>(newMockEvent())

  reputationUpdatedEvent.parameters = new Array()

  reputationUpdatedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  reputationUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newReputation",
      ethereum.Value.fromUnsignedBigInt(newReputation)
    )
  )

  return reputationUpdatedEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}

export function createSpecialEventStartedEvent(
  name: string,
  startTime: BigInt,
  endTime: BigInt,
  rewardMultiplier: BigInt
): SpecialEventStarted {
  let specialEventStartedEvent = changetype<SpecialEventStarted>(newMockEvent())

  specialEventStartedEvent.parameters = new Array()

  specialEventStartedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  specialEventStartedEvent.parameters.push(
    new ethereum.EventParam(
      "startTime",
      ethereum.Value.fromUnsignedBigInt(startTime)
    )
  )
  specialEventStartedEvent.parameters.push(
    new ethereum.EventParam(
      "endTime",
      ethereum.Value.fromUnsignedBigInt(endTime)
    )
  )
  specialEventStartedEvent.parameters.push(
    new ethereum.EventParam(
      "rewardMultiplier",
      ethereum.Value.fromUnsignedBigInt(rewardMultiplier)
    )
  )

  return specialEventStartedEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}

export function createWeeklyBonusMintedEvent(
  user: Address,
  amount: BigInt
): WeeklyBonusMinted {
  let weeklyBonusMintedEvent = changetype<WeeklyBonusMinted>(newMockEvent())

  weeklyBonusMintedEvent.parameters = new Array()

  weeklyBonusMintedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  weeklyBonusMintedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return weeklyBonusMintedEvent
}

export function createWithdrawCompletedEvent(
  owner: Address,
  amount: BigInt
): WithdrawCompleted {
  let withdrawCompletedEvent = changetype<WithdrawCompleted>(newMockEvent())

  withdrawCompletedEvent.parameters = new Array()

  withdrawCompletedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  withdrawCompletedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return withdrawCompletedEvent
}
